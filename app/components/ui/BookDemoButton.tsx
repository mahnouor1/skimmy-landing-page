"use client";

import { BOOKING_URL, CAL_LINK, CAL_NAMESPACE } from "../../lib/site";

type CalApi = (action: string, ...args: unknown[]) => void;
let calPromise: Promise<CalApi> | null = null;

/** Loads the Cal.com embed on first intent (hover, focus or click), not on page load. */
function loadCal() {
  calPromise ??= import("@calcom/embed-react").then(async ({ getCalApi }) => {
    const cal = (await getCalApi({ namespace: CAL_NAMESPACE })) as unknown as CalApi;
    cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    return cal;
  });
  return calPromise;
}

type Props = {
  className?: string;
  children?: React.ReactNode;
  onOpen?: () => void;
};

/** Opens the existing Cal.com booking pop-up. Falls back to the booking page as a plain link. */
export default function BookDemoButton({ className = "btn-primary", children = "Book a Demo", onOpen }: Props) {
  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener"
      className={className}
      onPointerEnter={() => void loadCal()}
      onFocus={() => void loadCal()}
      onClick={async (e) => {
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        onOpen?.();
        try {
          const cal = await loadCal();
          cal("modal", {
            calLink: CAL_LINK,
            config: { layout: "month_view", useSlotsViewOnSmallScreen: "true" },
          });
        } catch {
          window.location.href = BOOKING_URL;
        }
      }}
    >
      {children}
    </a>
  );
}
