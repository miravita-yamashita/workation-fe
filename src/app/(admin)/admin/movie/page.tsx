import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  ImageBlock,
  ImageItem,
  Block,
  Description,
  Title,
  AdminDataPagination,
  ColumnContainer,
  ColumnItem,
  Loading,
} from "@/components/feature/common";
import { Section } from "@/components/feature/dashboard";
import {
  DashboardActionContextProvider,
  SectionContent,
  SectionHeader,
  SectionHeaderContentRight,
  SectionHeaderTitle,
  TableButtonCreate,
  TableTotalInfo,
  TableTotalInfoItem,
} from "@/components/feature/datatable";
import Link from "next/link";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import { getAdminMovieList } from "@/components/admin/movie/lib/actions";
import { AdminPageResultFilter } from "@/components/feature/page-filter";
import { Suspense } from "react";
import { pageFilterDropdownValues as rawPageFilterDropdownValues } from "@/lib/static-datasource";
import { getUniqueId } from "@/lib/utils";
import { MovieItem, Movies } from "@/components/admin/movie";
import { auth } from "@/app/auth";

const breadcrumbData = [
  BREADCRUMB_ADMIN.dashboard,
  BREADCRUMB_ADMIN.movie.list,
];

type PageProps = {
  searchParams: Promise<Record<string, string>>;
};

export default async function Page({ searchParams }: PageProps) {
  const [adminMovieListResponse] = await Promise.all([
    getAdminMovieList({
      searchParams: new URLSearchParams(await searchParams).toString(),
    }),
  ]);
  const { data } = adminMovieListResponse ?? {};
  const { data: adminMovieList = [], ...paginationData } = data ?? {};
  const session = await auth();

  return (
    <DashboardActionContextProvider>
      <SectionHeader className="mx-5 justify-between py-5">
        <SectionHeaderTitle>動画一覧</SectionHeaderTitle>
        <SectionHeaderContentRight>
          {session?.user?.isAdmin && (
            <TableButtonCreate className="">
              <Link
                href="/admin/movie/create"
                className="block px-[2rem] py-[.5938rem] text-sm font-bold text-white"
              >
                新規作成
              </Link>
            </TableButtonCreate>
          )}
        </SectionHeaderContentRight>
      </SectionHeader>
      <Section className="border-t border-shade-250">
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <SectionContent className="m-5 rounded border p-5">
        <Movies>
          {adminMovieList.map((item) => {
            const currentMediaImage = item?.media[0]?.url;
            return (
              <MovieItem
                className="flex items-center gap-5 border-b p-5"
                key={getUniqueId(item?.id)}
              >
                <Block className="flex w-full items-center gap-5">
                  <ImageBlock className="relative h-[5.0625rem] w-[9rem]">
                    <ImageItem
                      src={currentMediaImage || ImageNoPhoto?.src}
                      altText="image of video"
                      className="object-cover"
                    />
                  </ImageBlock>
                  <Description className="flex flex-col gap-2">
                    <Title className="font-bold">{item?.name}</Title>
                    <p>{item?.movie_category?.name}</p>
                    <p className="text-shade-910">更新日：{item?.updated_at}</p>
                    <p className="text-shade-910">作成日：{item?.created_at}</p>
                  </Description>
                </Block>
                <Link
                  href={`/admin/movie/${item?.id}/detail`}
                  className="shrink-0 rounded-none bg-transparent text-sm font-medium text-blue-350 underline hover:bg-transparent"
                >
                  詳細へ
                </Link>
              </MovieItem>
            );
          })}
        </Movies>
        <Suspense fallback={<Loading />}>
          <ColumnContainer className="justify-between">
            <ColumnItem className="flex w-full">
              <AdminPageResultFilter
                paramKey="per_page"
                labelName={" "}
                selectDropdownValues={rawPageFilterDropdownValues.map(
                  (value) => ({
                    id: value,
                    name: value,
                  }),
                )}
                className="justify-normal"
                labelStyles="font-bold"
              />
              <TableTotalInfo className="items-center gap-5">
                <TableTotalInfoItem className="text-sm font-medium">
                  {paginationData.total}件中
                </TableTotalInfoItem>
                <TableTotalInfoItem className="text-sm font-medium">
                  {paginationData?.from}-{paginationData?.to}件
                </TableTotalInfoItem>
              </TableTotalInfo>
            </ColumnItem>
            <ColumnItem className="w-full">
              <AdminDataPagination paginationData={paginationData} />
            </ColumnItem>
          </ColumnContainer>
        </Suspense>
      </SectionContent>
    </DashboardActionContextProvider>
  );
}
