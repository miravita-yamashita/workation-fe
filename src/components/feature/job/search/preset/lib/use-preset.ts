"use client";

import { useRef, useState } from "react";
import { saveSearchFilter } from "./actions";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { prepareFilterFormValesToPayload } from "./utils";
import {
  JobFilterType,
  PrefectureDataType,
} from "@/components/feature/job/search/filter";
import { incrementEngagementCount } from "@/components/feature/engagement";

export const usePreset = ({
  searchParamsString,
  flattenedFilterCategories,
  jobSearchPrefectures,
}: {
  searchParamsString: string;
  flattenedFilterCategories: JobFilterType[];
  jobSearchPrefectures: PrefectureDataType[];
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const saveCount = useRef(0);

  const savePreset = async () => {
    const payload = prepareFilterFormValesToPayload(
      searchParamsString,
      flattenedFilterCategories,
      jobSearchPrefectures,
    );

    setIsLoading(true);

    try {
      const response = await saveSearchFilter(payload);

      if (!response?.success) {
        toast({
          description: formatResponseError(response.message),
        });
        return;
      }

      saveCount.current += 1;
      // Update to engagement store
      incrementEngagementCount("savedSearch");
    } catch (error) {
      toast({
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    savePreset,
    saveCount,
  };
};
