"use client";

import { useEffect, useRef } from "react";
import { incrementEngagementCount } from "../engagement";

export const RecentlyViewedTrigger = ({ jobId }: { jobId: string }) => {
  const hasIncremented = useRef(false);

  // Handle Page visit increment and prevent multiple increments
  useEffect(() => {
    if (!hasIncremented.current) {
      incrementEngagementCount("recentlyViewJob");
      hasIncremented.current = true;
    }
  }, [jobId]);

  return null;
};
