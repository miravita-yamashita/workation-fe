"use client";

import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { formAdminMovieSchema } from "../lib/form-schema";
import { createAdminMovie, updateAdminMovie } from "../lib";
import { genericAPICallHandler } from "@/lib/utils";

export const useFormMovies = ({
  isEditMode,
  movieId,
  setIsLoading,
}: {
  isEditMode?: boolean;
  movieId?: string;
  setIsLoading: (isLoading: boolean) => void;
}) => {
  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formAdminMovieSchema>) => {
    setIsLoading(true);

    const payload = {
      ...values,
      id: movieId || "",
    };

    setIsLoading(false);

    const response = await genericAPICallHandler(() =>
      isEditMode ? updateAdminMovie(payload) : createAdminMovie(payload),
    );

    if (response.success) {
      router.push(`/admin/movie`);
      return;
    }

    toast({
      description: response.message,
    });
  };

  return {
    onSubmit,
  };
};
