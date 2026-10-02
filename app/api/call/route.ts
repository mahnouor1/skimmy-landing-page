import { NextResponse, type NextRequest } from "next/server";

const AGENT_ID = "agent_b0552c6e9ebabe327c84c60dc9";
const RETELL_URL = "https://api.retellai.com/v2/create-web-call";

// Basic rate limit: 3 calls per IP per 10 minutes.
// In-memory, so on Vercel it is per server instance (best-effort, not global).
const LIMIT = 3;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function clientIp(req: NextRequest) {
  return req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
}

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= LIMIT) {
    hits.set(ip, recent);
    return Math.ceil((WINDOW_MS - (now - recent[0])) / 1000);
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map from growing without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) if (times.every((t) => now - t >= WINDOW_MS)) hits.delete(key);
  }
  return 0;
}

export async function POST(req: NextRequest) {
  // Only our own pages may start calls.
  const origin = req.headers.get("origin");
  if (origin && new URL(origin).host !== req.headers.get("host")) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const apiKey = process.env.RETELL_API_KEY;
  if (!apiKey) {
    console.error("RETELL_API_KEY is not set");
    return NextResponse.json({ error: "not_configured" }, { status: 500 });
  }

  const retryAfter = rateLimited(clientIp(req));
  if (retryAfter) {
    return NextResponse.json(
      { error: "rate_limited" },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

  try {
    const res = await fetch(RETELL_URL, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ agent_id: AGENT_ID }),
      cache: "no-store",
    });
    if (!res.ok) {
      console.error("Retell create-web-call failed", res.status, await res.text());
      return NextResponse.json({ error: "upstream" }, { status: 502 });
    }
    const data = await res.json();
    // access_token is what the browser needs. Transport details are passed through
    // when Retell includes them, so the SDK connects the way the backend expects.
    return NextResponse.json(
      {
        access_token: data.access_token,
        call_id: data.call_id,
        transport: data.transport,
        url: data.url,
        ice_servers: data.ice_servers,
      },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch (err) {
    console.error("Retell create-web-call error", err);
    return NextResponse.json({ error: "upstream" }, { status: 502 });
  }
}
