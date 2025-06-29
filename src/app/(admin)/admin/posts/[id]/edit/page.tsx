import { auth } from "@/app/auth";
import {
  FormPost,
  getArticleDropdown,
  getFAQDropdown,
  getPostCategories,
  getPostTags,
} from "@/components/admin/posts";
import { getPostDetail } from "@/components/admin/posts/detail/lib";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer, Loading } from "@/components/feature/common";
import {
  Header,
  HeaderTitle,
  Section,
  SectionRichText,
} from "@/components/feature/dashboard";
import { DashboardActionContextProvider } from "@/components/feature/datatable";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import RemoteDeleteButton from "@/components/feature/form/ui/remote-delete-button";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Article Post Edit",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.posts.base,
  BREADCRUMB_ADMIN.posts.edit,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [
    getPostCategoriesResponse,
    getPostTagsResponse,
    getPostDetailResponse,
    getArticleDropdownResponse,
    getFAQDropdownResponse,
  ] = await Promise.all([
    getPostCategories(),
    getPostTags(),
    getPostDetail(id),
    getArticleDropdown(),
    getFAQDropdown(),
  ]);
  const { post: postCategories = [] } = getPostCategoriesResponse?.data ?? {};
  const { data: postTags = [] } = getPostTagsResponse ?? {};
  const { article: postDetail = null } = getPostDetailResponse?.data ?? {};
  const { data: articleDropdown = [] } = getArticleDropdownResponse ?? {};
  const { data: faqDropdown = [] } = getFAQDropdownResponse ?? {};
  const session = await auth();

  return (
    <Suspense fallback={<Loading />}>
      <FormInteractionProvider>
        <Header>
          <HeaderTitle>投稿編集 OR 新規作成</HeaderTitle>
          <ColumnContainer className="gap-5">
            <Button size="auto" variant="return" asChild>
              <Link href={`/admin/posts/`}>戻る</Link>
            </Button>
            {session?.user?.isAdmin && <RemoteSubmitButton />}
            <DashboardActionContextProvider>
              <RemoteDeleteButton endpoint={`article`} id={id} />
              <MainDialogDeletePrompt
                redirectPath="/admin/posts"
                endpoint="article"
              />
            </DashboardActionContextProvider>
          </ColumnContainer>
        </Header>
        <Section>
          <BreadcrumbComposite
            data={breadcrumbData}
            className="lg:pb-0"
            isAdmin={true}
          />
        </Section>
        <SectionRichText className="max-w-none">
          <FormPost
            isEditMode={true}
            articleDropdown={articleDropdown}
            faqDropdown={faqDropdown}
            postCategories={postCategories}
            postTags={postTags}
            info={postDetail}
          />
        </SectionRichText>
      </FormInteractionProvider>
    </Suspense>
  );
}
