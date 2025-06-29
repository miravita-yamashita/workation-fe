"use client";

import { CommonProps } from "@/lib/types";

import IconStar from "@public/icon-star.svg";
import { ImageBlock, ImageItem } from "../../common";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useJobActionSaveContext, useKeepJob } from "./lib";
import { useEffect } from "react";

export const JobSaveAction = ({
  className = "",
  jobId,
  keepFlag,
}: CommonProps & {
  jobId: string;
  keepFlag: boolean;
}) => {
  const { disabledButton, setDisabledButton } = useJobActionSaveContext();
  const { isLoading, handleAddToFavorites, isFavorite } = useKeepJob({
    jobId: jobId,
    isAlreadyFavorite: keepFlag,
  });

  useEffect(() => {
    setDisabledButton(isFavorite);
  }, [isFavorite, setDisabledButton]);

  const handleClick = () => {
    setDisabledButton(isFavorite);
    handleAddToFavorites();
  };

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={isLoading || disabledButton}
        className={cn(
          "flex h-full w-full items-center gap-[.625rem] py-[.9375rem]",
          className,
        )}
      >
        <ImageBlock className="relative h-4 w-4">
          <ImageItem src={IconStar} altText="icon star" />
        </ImageBlock>
        <p className="text-lg font-bold leading-[1.875rem] lg:text-[1.25rem]">
          {isFavorite ? "キープ済" : "キープする"}
        </p>
      </Button>
    </>
  );
};
