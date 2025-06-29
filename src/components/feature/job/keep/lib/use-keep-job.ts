"use client";

import { saveToFavorites } from "@/components/feature/recommended/lib";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { incrementEngagementCount } from "@/components/feature/engagement";

type UseKeepJobProps = {
  jobId: string;
  isAlreadyFavorite: boolean;
};

export const useKeepJob = ({ jobId, isAlreadyFavorite }: UseKeepJobProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(isAlreadyFavorite);

  const handleAddToFavorites = async () => {
    setIsLoading(true);
    try {
      const response = await saveToFavorites(jobId);

      if (!response?.success) {
        toast({
          description: formatResponseError(response.message),
        });

        return;
      }
      setIsFavorite(true);

      // Update to engagement store
      incrementEngagementCount("savedJob");
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
    handleAddToFavorites,
    isFavorite,
  };
};
