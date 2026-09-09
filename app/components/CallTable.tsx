"use client";
import { useState } from "react";

type Filter = "All" | "Answered" | "Transferred" | "Booked" | "Missed" | "Resolved";

const calls = [
  { caller: "+44 7700 900123", time: "Today, 10:42 AM", intent: "Book appointment", outcome: "Booked — 15 Nov, 2pm", duration: "1m 52s", status: "Booked" },
  { caller: "+44 7911 123456", time: "Today, 9:17 AM", intent: "Opening hours", outcome: "Resolved — FAQ answered", duration: "0m 38s", status: "Resolved" },
  { caller: "+44 7800 555012", time: "Today, 8:54 AM", intent: "Speak to billing team", outcome: "Transferred to accounts", duration: "1m 09s", status: "Transferred" },
  { caller: "+44 7700 887734", time: "Yesterday, 5:58 PM", intent: "After-hours enquiry", outcome: "Resolved — message logged", duration: "1m 25s", status: "Resolved" },
  { caller: "+44 7399 203011", time: "Yesterday, 3:22 PM", intent: "Unclear", outcome: "Missed — no response", duration: "0m 12s", status: "Missed" },
  { caller: "+44 7911 400900", time: "Yesterday, 2:05 PM", intent: "New client enquiry", outcome: "Transferred — sales team", duration: "2m 04s", status: "Transferred" },
  { caller: "+44 7700 112233", time: "Yesterday, 11:30 AM", intent: "Reschedule appointment", outcome: "Booked — 18 Nov, 11am", duration: "1m 44s", status: "Booked" },
  { caller: "+44 7500 998877", time: "22 Oct, 4:15 PM", intent: "Pricing enquiry", outcome: "Resolved — FAQ answered", duration: "0m 55s", status: "Resolved" },
];

const statusStyles: Record<string, string> = {
  Booked: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Resolved: "bg-blue-50 text-blue-700 border-blue-200",
  Transferred: "bg-amber-50 text-amber-700 border-amber-200",
  Missed: "bg-red-50 text-red-600 border-red-200",
  Answered: "bg-[#F7F6F3] text-[#6B6B6B] border-[#E8E4DC]",
};

const filters: Filter[] = ["All", "Answered", "Transferred", "Booked", "Missed", "Resolved"];

export default function CallTable() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = activeFilter === "All"
    ? calls
    : calls.filter((c) => c.status === activeFilter);

  return (
    <section id="dashboard" className="py-24 px-6 lg:px-8 bg-[#F7F6F3]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-3">Call management</p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-[#0F0F0F] mb-4">
            Understand every call.
          </h2>
          <p className="text-[16px] text-[#6B6B6B] max-w-lg">
            Skimmy doesn't just answer calls — it records what happened. Every conversation is logged with intent, outcome, and duration so you always know what your voice agent handled.
          </p>
        </div>

        {/* Dashboard frame */}
        <div className="bg-white rounded-xl border border-[#E8E4DC] overflow-hidden shadow-sm">
          {/* Dashboard header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8E4DC]">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#B58E31]" />
              <span className="text-[14px] font-semibold text-[#0F0F0F]">Call Log</span>
              <span className="text-[12px] px-2 py-0.5 rounded-full bg-[#F7F6F3] border border-[#E8E4DC] text-[#9E9E9E] font-mono">
                {filtered.length} calls
              </span>
            </div>
            <div className="flex items-center gap-2 text-[12px] text-[#9E9E9E]">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              Agent active
            </div>
          </div>

          {/* Filters */}
          <div className="flex items-center gap-1 px-4 py-3 border-b border-[#E8E4DC] overflow-x-auto">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3.5 py-1.5 rounded-md text-[13px] font-medium whitespace-nowrap transition-all ${
                  activeFilter === f
                    ? "bg-[#0F0F0F] text-white"
                    : "text-[#6B6B6B] hover:bg-[#F7F6F3]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E4DC]">
                  {["Caller", "Time", "Intent", "Outcome", "Duration", "Status"].map((col) => (
                    <th key={col} className="px-5 py-3 text-left text-[12px] font-medium text-[#9E9E9E] tracking-wide">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((call, i) => (
                  <tr
                    key={i}
                    className="border-b border-[#F7F6F3] hover:bg-[#FAFAF9] transition-colors group"
                  >
                    <td className="px-5 py-3.5 text-[13px] font-mono text-[#2C2C2C]">{call.caller}</td>
                    <td className="px-5 py-3.5 text-[13px] text-[#9E9E9E] whitespace-nowrap">{call.time}</td>
                    <td className="px-5 py-3.5 text-[13px] text-[#2C2C2C]">{call.intent}</td>
                    <td className="px-5 py-3.5 text-[13px] text-[#6B6B6B] max-w-[200px]">{call.outcome}</td>
                    <td className="px-5 py-3.5 text-[13px] font-mono text-[#9E9E9E]">{call.duration}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-[11px] px-2.5 py-1 rounded-full border font-medium ${statusStyles[call.status]}`}>
                        {call.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-[#E8E4DC] flex items-center justify-between">
            <span className="text-[12px] text-[#9E9E9E]">Showing demo data · All times in UTC+0</span>
            <button className="text-[12px] text-[#B58E31] hover:text-[#8B6B1E] font-medium transition-colors">
              Export CSV
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
