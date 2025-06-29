import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Block, ImageBlock, ImageItem } from "../../common";
import { RecommendedPoints, RecommendedPointsItem } from "./recommended-points";

type CommonProps = PropsWithChildren & {
  className?: string;
  recommendedPoints?: {
    id: number;
    icon: string;
    title: string;
    description: string;
  }[];
};

// Address repeating implementation - This is NOT a one all be all component
// There could be some situation that this component is not enough.
export const RecommendedPointsComposite = ({
  className = "",
  recommendedPoints,
}: CommonProps) => {
  recommendedPoints = recommendedPoints || [];

  return (
    <RecommendedPoints className={cn("gap-[.625rem] lg:flex-row", className)}>
      {recommendedPoints?.map((point, index) => (
        <RecommendedPointsItem key={index} className="lg:p-[.625rem]">
          <Block className="flex items-center gap-2">
            <ImageBlock className="relative h-[3.25rem] w-[3.25rem] flex-shrink-0">
              <ImageItem
                src={point?.icon}
                altText="icon like green"
                className="object-cover"
              />
            </ImageBlock>
            <Block className="flex flex-col">
              <p className="font-albertsans font-bold text-green-200">
                {point.title}
              </p>
              <p className="text-sm lg:text-base">{point.description}</p>
            </Block>
          </Block>
        </RecommendedPointsItem>
      ))}
    </RecommendedPoints>
  );
};
