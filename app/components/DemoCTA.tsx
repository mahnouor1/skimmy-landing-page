"use client";

import Cal from "@calcom/embed-react";
import { calButtonProps } from "./CalProvider";

export default function DemoCTA() {
  return (
    <section id="demo" className="py-24 px-6 lg:px-8 bg-[#0F0F0F]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <p className="text-[13px] font-medium text-[#B58E31] tracking-wide mb-4">
            Book a demo
          </p>
          <h2 className="font-display text-[clamp(1.75rem,3vw,2.75rem)] leading-tight tracking-tight text-white mb-5">
            See Skimmy on a live call.
          </h2>
          <p className="text-[16px] text-[#9E9E9E] leading-relaxed max-w-md mx-auto mb-8">
            Pick a time that works — we&apos;ll walk through how Skimmy answers calls, books appointments, and fits your workflow.
          </p>
          <button
            type="button"
            {...calButtonProps}
            className="px-6 py-3.5 rounded-md bg-[#B58E31] text-white font-medium text-[15px] hover:bg-[#C9A84C] transition-colors cursor-pointer"
          >
            Book a Demo
          </button>
        </div>

        <div className="rounded-xl overflow-hidden border border-white/10 bg-white min-h-[620px]">
          <Cal
            namespace="skimmy-demo"
            calLink="mahnoor-umar-plzhcx/skimmy-demo"
            style={{ width: "100%", height: "100%", overflow: "scroll" }}
            config={{
              layout: "month_view",
              useSlotsViewOnSmallScreen: "true",
            }}
          />
        </div>
      </div>
    </section>
  );
}
