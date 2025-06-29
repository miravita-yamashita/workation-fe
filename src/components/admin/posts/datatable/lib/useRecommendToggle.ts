"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminPostsColumnType } from "../columns";
import { genericAPICallHandler } from "@/lib/utils";
import { toggleRecommendedArticle } from "./actions";
import { toast } from "@/hooks/use-toast";

export const useRecommendToggle = ({
  rowData,
}: {
  rowData: AdminPostsColumnType;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isChecked, setIsChecked] = useState(rowData.isRecommended);
  const [isLoading, setIsLoading] = useState(false);
  const isDisabled = rowData.isRecommended
    ? false
    : rowData.recommendedArticleCount >= 4;

  const updateURLParams = (
    paramsUpdater: (params: URLSearchParams) => void,
  ) => {
    const currentParams = new URLSearchParams(window.location.search);
    paramsUpdater(currentParams);
    const updatedUrl = `${window.location.pathname}?${currentParams.toString()}`;
    window.history.pushState(null, "", updatedUrl);
  };

  const handleClick = async () => {
    try {
      // Set loading state via URL params only
      updateURLParams((params) => params.set("isLoading", "true"));

      // Call the API to toggle the recommended article
      const response = await genericAPICallHandler(() =>
        toggleRecommendedArticle({
          id: rowData.id,
        }),
      );

      if (response.success) {
        // Update local state immediately
        setIsChecked(!isChecked);

        // Trigger a refresh to get the latest data
        router.refresh();
        return;
      }

      // Handle any errors
      toast({
        description: response.message,
      });
    } finally {
      // Stabilize the loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // Always remove loading state
      updateURLParams((params) => params.delete("isLoading"));
    }
  };

  // Handle loading state
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    setIsLoading(params.has("isLoading"));
  }, [searchParams]);

  // Sync checked state with rowData, prevents checked status on other pages
  useEffect(() => {
    setIsChecked(rowData.isRecommended);
  }, [rowData.id, rowData.isRecommended]);

  return {
    handleClick,
    isChecked,
    setIsChecked,
    isDisabled,
    isLoading,
  };
};
