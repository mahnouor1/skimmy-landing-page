import type { LogStatus } from "../../lib/walkthroughs";

const STYLES: Record<LogStatus, string> = {
  Booked: "bg-cream-glow text-[#7A5208]",
  Transferred: "bg-[#E6E9F2] text-[#2E3A5C]",
  Resolved: "bg-[#E3EFE4] text-[#2C5E35]",
  Missed: "bg-[#F6E1DC] text-[#8E2A1A]",
};

export default function StatusBadge({ status }: { status: LogStatus }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] font-bold ${STYLES[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden />
      {status}
    </span>
  );
}
