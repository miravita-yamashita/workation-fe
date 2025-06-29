"use client";

import { useEffect, useState } from "react";
import { getEngagementCount } from "./actions";
import { toast } from "@/hooks/use-toast";
import { genericAPICallHandler } from "@/lib/utils";
import { setEngagementNumbers, useEngagementStore } from "./store";

export const useEngagement = () => {
  const [engagementCount, setEngagementCount] = useState({
    recentlyViewJob: 0,
    savedJob: 0,
    savedSearch: 0,
  });

  // Handle updates from store
  useEffect(() => {
    const unsubscribe = useEngagementStore.subscribe((state) => {
      const { recentlyViewJob, savedJob, savedSearch } = state.count;
      setEngagementCount({
        recentlyViewJob,
        savedJob,
        savedSearch,
      });
    });

    return () => unsubscribe();
  }, []);

  // Get data on first load
  useEffect(() => {
    const fetchData = async () => {
      const response = await genericAPICallHandler(() => getEngagementCount());

      if (response.success) {
        setEngagementNumbers(response.data);
        return;
      }

      toast({
        description: response.message,
      });
    };

    fetchData();
  }, []);

  return { engagementCount };
};
