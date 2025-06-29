import {
  getAdminStaticPageDetail,
  RecommendedJobsInfoTable,
  RecommendedJobsInfoTableItemKey,
  RecommendedJobsInfoTableItemValue,
  StaticDetailInfoDates,
} from "@/components/admin/static-page";
import {
  FreelanceNurseInfoTable,
  FreelanceNurseInfoTableItem,
  PostsInfoTopTable,
  PostsInfoTopTableItemKey,
  PostsInfoTopTableItemValue,
} from "@/components/admin/static-page/detail/top/static-top-detail";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  ColumnContainer,
  ColumnItem,
  ImageBlock,
  ImageItem,
} from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import {
  FieldLabel,
  FieldLabelGroup,
  FieldLabelLine,
  FieldLabelText,
  FormInteractionProvider,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import ImageNoPhoto from "@public/image-no-photo.jpg";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [adminStaticPageDetailResponse] = await Promise.all([
    getAdminStaticPageDetail(id),
  ]);
  const { data: adminStaticPageDetail } = adminStaticPageDetailResponse ?? {};
  const { created_at, updated_at, posts, steps, media, positions, title } =
    adminStaticPageDetail ?? {};

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.staticPage.list,
    {
      label: title,
      link: "",
    },
  ];

  // Trimming the data to show the desired number of items
  const trimmedPosts = posts.slice(0, 2);
  const trimmedPositions = positions.slice(0, 3);

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>トップページ Top</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/static-page`}>戻る</Link>
          </Button>
          <Button size="auto" variant="remote" asChild>
            <Link href={`/admin/static-page/${id}/top/edit`}>更新</Link>
          </Button>
        </ColumnContainer>
      </Header>

      <Section>
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>

      <Section>
        <ColumnContainer className="flex gap-5">
          <ColumnItem className="flex w-full flex-1 flex-col gap-5 rounded border p-5">
            <StaticDetailInfoDates className="flex justify-between">
              <p className="text-sm text-shade-910">更新日：{created_at}</p>
              <p className="text-sm text-shade-910">作成日：{updated_at}</p>
            </StaticDetailInfoDates>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>おすすめ求人</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <RecommendedJobsInfoTable>
                <RecommendedJobsInfoTableItemKey>
                  求人番号
                </RecommendedJobsInfoTableItemKey>
                <RecommendedJobsInfoTableItemKey>
                  求人タイトル
                </RecommendedJobsInfoTableItemKey>
                <RecommendedJobsInfoTableItemKey>
                  エリア
                </RecommendedJobsInfoTableItemKey>
                <RecommendedJobsInfoTableItemKey>
                  作成日
                </RecommendedJobsInfoTableItemKey>
                <RecommendedJobsInfoTableItemKey className="empty" />

                {trimmedPositions.map((position, index) => (
                  <React.Fragment key={index}>
                    <RecommendedJobsInfoTableItemValue>
                      {position?.job_number}
                    </RecommendedJobsInfoTableItemValue>
                    <RecommendedJobsInfoTableItemValue>
                      {position?.name}
                    </RecommendedJobsInfoTableItemValue>
                    <RecommendedJobsInfoTableItemValue>
                      {position?.area?.label}
                    </RecommendedJobsInfoTableItemValue>
                    <RecommendedJobsInfoTableItemValue>
                      {position?.updated_at}
                    </RecommendedJobsInfoTableItemValue>
                    <RecommendedJobsInfoTableItemValue>
                      <Link
                        href={`/admin/jobs/${position?.id}`}
                        className="rounded-none bg-transparent text-sm font-medium text-blue-350 underline hover:bg-transparent"
                      >
                        詳細へ
                      </Link>
                    </RecommendedJobsInfoTableItemValue>
                  </React.Fragment>
                ))}
              </RecommendedJobsInfoTable>
            </FieldLabelGroup>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>投稿</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <PostsInfoTopTable>
                <PostsInfoTopTableItemKey className="">
                  タイトル
                </PostsInfoTopTableItemKey>
                <PostsInfoTopTableItemKey className="">
                  作成日
                </PostsInfoTopTableItemKey>
                <PostsInfoTopTableItemKey className="empty" />
                {trimmedPosts.map((post, index) => (
                  <React.Fragment key={index}>
                    <PostsInfoTopTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      {post.title}
                    </PostsInfoTopTableItemValue>
                    <PostsInfoTopTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      {post.created_at}
                    </PostsInfoTopTableItemValue>
                    <PostsInfoTopTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      <Link
                        href={`/admin/posts/${post?.id}/edit`}
                        className="rounded-none bg-transparent text-sm font-medium text-blue-350 underline hover:bg-transparent"
                      >
                        詳細へ
                      </Link>
                    </PostsInfoTopTableItemValue>
                  </React.Fragment>
                ))}
              </PostsInfoTopTable>
            </FieldLabelGroup>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>転職する方法</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <FreelanceNurseInfoTable>
                {steps.map((step, index) => (
                  <React.Fragment key={index}>
                    <FreelanceNurseInfoTableItem className="flex items-center font-bold uppercase">
                      {`Step 0${index + 1}`}
                    </FreelanceNurseInfoTableItem>
                    <FreelanceNurseInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] font-inter lg:px-5 lg:py-[1rem]">
                      {step.header_title}
                    </FreelanceNurseInfoTableItem>
                    <FreelanceNurseInfoTableItem className="flex items-center bg-shade-210 font-bold">
                      {step.title}
                    </FreelanceNurseInfoTableItem>
                    <FreelanceNurseInfoTableItem className="w-full whitespace-pre-line bg-shade-210 px-[.875rem] py-[.625rem] font-inter lg:px-5 lg:py-[1rem]">
                      {step.content}
                    </FreelanceNurseInfoTableItem>
                  </React.Fragment>
                ))}
              </FreelanceNurseInfoTable>
            </FieldLabelGroup>
          </ColumnItem>
          <ColumnItem className="flex w-[19.375rem] flex-col gap-5 self-start rounded border p-5">
            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>サムネイル</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <ImageBlock className="relative h-[6.25rem] w-[16.875rem]">
                <ImageItem
                  src={media?.banner[0]?.url || ImageNoPhoto.src}
                  altText="banner image"
                  className="object-cover"
                />
              </ImageBlock>
            </FieldLabelGroup>
          </ColumnItem>
        </ColumnContainer>
      </Section>
    </FormInteractionProvider>
  );
}
