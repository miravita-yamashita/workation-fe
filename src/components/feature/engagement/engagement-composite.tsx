"use client";

import { CommonProps } from "@/lib/types";
import {
  Engagement,
  EngagementCount,
  EngagementInfo,
  EngagementInfoCount,
  EngagementInfoLabel,
  EngagementItem,
  EngagementLabel,
  EngagementSubNote,
} from "./engagement";
import { formatEngagementCount, useEngagement } from "./lib";
import IconStar from "@public/icon-star.svg";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const EngagementComposite = ({}: CommonProps) => {
  const { engagementCount } = useEngagement();

  return (
    <Engagement>
      <EngagementItem link="/keep">
        <EngagementLabel>キープした求人</EngagementLabel>
        <div>
          <EngagementCount>
            {formatEngagementCount(engagementCount.savedJob)}
          </EngagementCount>
          <EngagementSubNote>件</EngagementSubNote>
        </div>
      </EngagementItem>
      <EngagementItem link="/recently">
        <EngagementLabel>最近見た求人</EngagementLabel>
        <div>
          <EngagementCount>
            {formatEngagementCount(engagementCount.recentlyViewJob)}
          </EngagementCount>
          <EngagementSubNote>件</EngagementSubNote>
        </div>
      </EngagementItem>
      <EngagementItem link="/conditions">
        <EngagementLabel>保存した検索条件</EngagementLabel>
        <div>
          <EngagementCount>
            {formatEngagementCount(engagementCount.savedSearch)}
          </EngagementCount>
          <EngagementSubNote>件</EngagementSubNote>
        </div>
      </EngagementItem>
    </Engagement>
  );
};

export const EngagementStaticComposite = ({ className }: CommonProps) => {
  const { engagementCount } = useEngagement();

  return (
    <Engagement
      className={cn("static flex w-full flex-row gap-2 pt-2.5", className)}
    >
      <Link href="/keep" className="w-full">
        <EngagementInfo>
          <EngagementInfoCount>
            {formatEngagementCount(engagementCount.savedJob)}
          </EngagementInfoCount>

          <EngagementInfoLabel className="flex flex-row items-center gap-1">
            <Image src={IconStar} width={10} height={10} alt="icon star" />
            キープ
          </EngagementInfoLabel>
        </EngagementInfo>
      </Link>
      <Link href="/recently" className="w-full">
        <EngagementInfo>
          <EngagementInfoCount>
            {formatEngagementCount(engagementCount.savedSearch)}
          </EngagementInfoCount>
          <EngagementInfoLabel>最近見た求人</EngagementInfoLabel>
        </EngagementInfo>
      </Link>
      <Link href="/conditions" className="w-full">
        <EngagementInfo>
          <EngagementInfoCount>
            {formatEngagementCount(engagementCount.recentlyViewJob)}
          </EngagementInfoCount>
          <EngagementInfoLabel>保存した条件</EngagementInfoLabel>
        </EngagementInfo>
      </Link>
    </Engagement>
  );
};
