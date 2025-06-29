"use client";

import { Button } from "@/components/ui/button";
import chevronIcon from "@public/icon-chevron-right-md.svg";
import starIcon from "@public/icon-star.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useKeepJob } from "../../job/keep";

type Props = {
  jobId: string;
  isKeep: boolean;
  className?: string;
  layout?: "col";
};

export const RecommendedActions = ({
  jobId,
  isKeep,
  className = "",
  layout,
}: Props) => {
  const router = useRouter();
  const detailPageUrl = `/result/${jobId}`;
  const { isLoading, handleAddToFavorites, isFavorite } = useKeepJob({
    jobId,
    isAlreadyFavorite: isKeep,
  });

  const onSaveToViewed = async () => {
    router.push(detailPageUrl);
  };

  return (
    <div
      className={cn(
        "",
        {
          "gap-5 space-y-[6px] lg:flex lg:space-y-0": !layout,
          "space-y-[.625rem]": layout === "col",
        },
        className,
      )}
    >
      <Button
        className="w-full flex-1"
        size="xl"
        disabled={isLoading || isFavorite}
        onClick={handleAddToFavorites}
      >
        <Image src={starIcon} alt="save icon" priority={true} />
        {isKeep ? "キープ済" : "キープする"}
      </Button>
      <Button
        className="w-full flex-1 !text-[.9375rem] !leading-[1.375rem] md:!text-[1.0625rem] md:!leading-[1.5625rem]"
        size="xl"
        onClick={onSaveToViewed}
      >
        この求人を詳しく見る
        <Image src={chevronIcon} alt="details icon" priority={true} />
      </Button>
    </div>
  );
};
