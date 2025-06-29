import { ImageBlock, ImageItem } from "@/components/feature/common";
import Link from "next/link";
import { BannerType } from "../lib/types";

type Props = {
  images: BannerType[];
};

export const ArticleAds = ({ images }: Props) => {
  if (images?.length === 0) return null;

  return (
    <div className="pb-5">
      {images?.map(({url, custom_attr, pivot_id }) => (
        <Link
          className="mb-5 block"
          key={pivot_id}
          href={custom_attr?.link || "#"}
          target="_blank"
        >
          <ImageBlock className="relative h-[6.25rem] w-full lg:h-[6.25rem]">
            <ImageItem src={url} altText="image" className="object-cover" />
          </ImageBlock>
        </Link>
      ))}
    </div>
  );
};
