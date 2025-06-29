import { PropsWithChildren } from "react";
import { ColumnContainer, ColumnItem, ImageBlock, ImageItem } from "../common";
import { cn, getUniqueId } from "@/lib/utils";
import ImageNoPhoto from "@public/image-no-banner.png";
import Link from "next/link";
import { MediaMainType } from "@/components/static-page";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopBannersList = ({
  className = "",
  media,
}: CommonProps & {
  media?: MediaMainType;
}) => {
  const { banner } = media || { banner: [] };
  return (
    <ColumnContainer
      className={cn("mx-4 my-5 flex-col gap-4 lg:mx-0", className)}
    >
      {banner?.map((item) => (
        <ColumnItem key={getUniqueId(item?.id.toString())}>
          <Link className="w-full" href={item?.custom_attr?.link || "#"}>
            <ImageBlock className="h-[6.25rem] w-full">
              <ImageItem
                src={item?.url || ImageNoPhoto.src}
                altText="top banner image"
                className="object-cover"
              />
            </ImageBlock>
          </Link>
        </ColumnItem>
      ))}
    </ColumnContainer>
  );
};
