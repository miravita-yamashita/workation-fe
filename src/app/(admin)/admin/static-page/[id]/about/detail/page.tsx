import {
  getAdminStaticPageDetail,
  RecommendedJobsInfoTable,
  RecommendedJobsInfoTableItemKey,
  RecommendedJobsInfoTableItemValue,
  StaticDetailInfoDates,
} from "@/components/admin/static-page";
import {
  PostsInfoAboutTable,
  PostsInfoAboutTableTableItemKey,
  PostsInfoAboutTableTableItemValue,
} from "@/components/admin/static-page/detail/about";

import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer, ColumnItem } from "@/components/feature/common";
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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [adminStaticPageDetailResponse] = await Promise.all([
    getAdminStaticPageDetail(id),
  ]);
  const { data: adminStaticPageDetail } = adminStaticPageDetailResponse ?? {};
  const { created_at, updated_at, posts, positions, title } =
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
  const trimmedPositions = positions.slice(0, 3);

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>
          ワーケーションナースとは About Workation Nurse
        </HeaderTitle>
        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/static-page`}>戻る</Link>
          </Button>
          <Button size="auto" variant="return" asChild></Button>
          <Button size="auto" variant="remote" asChild>
            <Link href={`/admin/static-page/${id}/about/edit`}>更新</Link>
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
              <p className="text-sm text-shade-910">更新日：{updated_at}</p>
              <p className="text-sm text-shade-910">作成日：{created_at}</p>
            </StaticDetailInfoDates>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>投稿</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <PostsInfoAboutTable>
                <PostsInfoAboutTableTableItemKey className="">
                  タイトル
                </PostsInfoAboutTableTableItemKey>
                <PostsInfoAboutTableTableItemKey className="">
                  作成日
                </PostsInfoAboutTableTableItemKey>
                <PostsInfoAboutTableTableItemKey className="empty" />
                {posts.map((post, index) => (
                  <React.Fragment key={index}>
                    <PostsInfoAboutTableTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      {post.title}
                    </PostsInfoAboutTableTableItemValue>
                    <PostsInfoAboutTableTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      {post.created_at}
                    </PostsInfoAboutTableTableItemValue>
                    <PostsInfoAboutTableTableItemValue className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                      <Link
                        href={`/admin/posts/${post?.id}/edit`}
                        className="rounded-none bg-transparent text-sm font-medium text-blue-350 underline hover:bg-transparent"
                      >
                        詳細へ
                      </Link>
                    </PostsInfoAboutTableTableItemValue>
                  </React.Fragment>
                ))}
              </PostsInfoAboutTable>
            </FieldLabelGroup>

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
          </ColumnItem>
        </ColumnContainer>
      </Section>
    </FormInteractionProvider>
  );
}
