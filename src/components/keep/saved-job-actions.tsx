"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import chevronIcon from "@public/icon-chevron-right-md.svg";
import iconMail from "@public/icon-mail.svg";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { KeepJobsType } from "./lib";

interface Props {
  action: (id: KeepJobsType) => void;
  job: KeepJobsType;
  className?: string;
  layout?: "col";
}

export const SavedJobActions = ({
  action,
  job,
  className = "",
  layout,
}: Props) => {
  const router = useRouter();
  const detailPageUrl = `/result/${job.id}`;

  const onJobApply = async () => {
    action(job);
  };

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
      <Button className="w-full flex-1" size="xl" onClick={onJobApply}>
        <Image src={iconMail} alt="save icon" priority={true} />
        応募・お問い合わせ
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
