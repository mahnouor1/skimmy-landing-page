"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const CAL_NAMESPACE = "skimmy-demo";

/** Loads Cal.com once so any element with data-cal-* can open the booking modal. */
export default function CalProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return <>{children}</>;
}

export const calButtonProps = {
  "data-cal-namespace": CAL_NAMESPACE,
  "data-cal-link": "mahnoor-umar-plzhcx/skimmy-demo",
  "data-cal-config":
    '{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}',
} as const;
