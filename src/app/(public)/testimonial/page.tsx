import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  Loading,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { DataPagination } from "@/components/feature/common/data-pagination";
import { getTopTestimonials, TestimonialsList } from "@/components/testimonial";

import { Suspense } from "react";

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.testimonial.base];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const [topTestimonialListResponse] = await Promise.all([
    getTopTestimonials({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);

  const { data } = topTestimonialListResponse ?? {};
  const { data: testimonialsList = [], ...paginationData } = data ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>参加者の声一覧</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <TestimonialsList items={testimonialsList} />
        <Suspense fallback={<Loading />}>
          <DataPagination
            paginationData={paginationData}
            className="mb-[6.25rem]"
          />
        </Suspense>
      </MainBlock>
    </>
  );
}
