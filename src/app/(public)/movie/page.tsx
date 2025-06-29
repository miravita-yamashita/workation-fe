import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { DataPagination } from "@/components/feature/common/data-pagination";
import { getMovieList, MovieList } from "@/components/movie";
import { Suspense } from "react";

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.movie.base];

export default async function Page({ searchParams }: PageProps) {
  const [movieListResponse] = await Promise.all([
    getMovieList({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);

  const { data } = movieListResponse ?? {};
  const { data: movieList = [], ...paginationData } = data ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock
          size="sm"
          className="font-bold text-coral-300 lg:p-0 lg:py-[.625rem] lg:text-[1.625rem]"
        >
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>動画一覧</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <MovieList movieList={movieList} />
        <Suspense fallback={<div>Loading...</div>}>
          <DataPagination
            paginationData={paginationData}
            className="mb-[6.25rem]"
          />
        </Suspense>
      </MainBlock>
    </>
  );
}
