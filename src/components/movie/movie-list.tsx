import { Badge } from "@/components/ui/badge";

import { cn, getUniqueId } from "@/lib/utils";
import Link from "next/link";
import IconPlay from "@public/icon-play.svg";
import { PropsWithChildren, Suspense } from "react";
import { MovieDataType, MovieFilterParamKey } from "./lib";
import {
  ColumnContainer,
  ColumnItem,
  Loading,
  ImageBlock,
  ImageItem,
  Block,
} from "../feature/common";
import { PageResultFilter } from "../feature/page-filter";
import { getFilterCategoryNameList } from "../feature/top";
import ImageNoPhoto from "@public/image-no-photo.jpg";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const MovieList = async ({
  movieList,
  className = "",
}: CommonProps & { movieList: MovieDataType[] }) => {
  const [filterCategoryNameListResponse] = await Promise.all([
    getFilterCategoryNameList(),
  ]);
  const { data: filterCategoryNameList } = filterCategoryNameListResponse || {};
  const movieCategoryNameList = filterCategoryNameList?.video || [];

  return (
    <ColumnContainer className={cn("flex flex-col", className)}>
      <ColumnItem>
        <Suspense fallback={<Loading />}>
          <PageResultFilter
            labelName="カテゴリー"
            selectDropdownValues={movieCategoryNameList?.map((category) => ({
              id: category.id,
              name: category.name,
            }))}
            className="mt-4 w-full justify-between"
            labelStyles="font-bold"
            paramKey={MovieFilterParamKey.Categories}
          />
        </Suspense>
      </ColumnItem>
      <ColumnItem className="mt-4 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mb-10 lg:mt-5 lg:grid-cols-3">
        <MovieListItems items={movieList} />
      </ColumnItem>
    </ColumnContainer>
  );
};

const MovieListItems = ({ items = [] }: { items?: MovieDataType[] }) => {
  return (
    <>
      {items?.map((movie, index) => {
        const { movie_category, media, link } = movie || {};

        return (
          <ColumnItem
            key={getUniqueId(index.toString())}
            className="w-full rounded-b-lg rounded-t-lg bg-white shadow"
          >
            <Link href={link || ""} target="_blank" className="relative block">
              <ImageBlock className="h-[12.5rem] rounded-t-lg">
                <ImageItem
                  src={media?.[0]?.url || ImageNoPhoto.src}
                  altText={`${movie.name} Thumbnail`}
                  className="rounded-t-lg object-cover"
                />
                <ImageBlock className="left-1/2 top-1/2 h-[6.5625rem] w-[6.5625rem] translate-x-[-50%] translate-y-[-50%] transform rounded-t-lg">
                  <ImageItem
                    src={IconPlay}
                    altText="Play Icon"
                    className="object-cover"
                  />
                </ImageBlock>
              </ImageBlock>
            </Link>

            <ColumnContainer className="flex-col gap-2 p-[.875rem] lg:p-5">
              <Badge className="w-fit rounded border border-shade-550 bg-white px-2 py-1 text-[.625rem] font-medium text-black shadow-none hover:bg-transparent lg:text-[.625rem]">
                {movie_category?.name}
              </Badge>
              <Block className="title line-clamp-1 overflow-hidden font-bold text-coral-300 lg:text-[1.125rem]">
                {movie.name}
              </Block>
              <Block className="description line-clamp-3 font-medium text-shade-600 lg:text-xs">
                {movie.description}
              </Block>
            </ColumnContainer>
          </ColumnItem>
        );
      })}
    </>
  );
};
