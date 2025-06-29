import { auth } from "@/app/auth";
import {
  FormPost,
  getArticleDropdown,
  getFAQDropdown,
  getPostCategories,
  getPostTags,
} from "@/components/admin/posts";
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
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Article Post Create",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.posts.base,
  BREADCRUMB_ADMIN.posts.create,
];

export default async function Page() {
  const [
    getPostCategoriesResponse,
    getPostTagsResponse,
    getArticleDropdownResponse,
    getFAQDropdownResponse,
  ] = await Promise.all([
    getPostCategories(),
    getPostTags(),
    getArticleDropdown(),
    getFAQDropdown(),
  ]);
  const { post: postCategories = [] } = getPostCategoriesResponse?.data ?? {};
  const { data: postTags = [] } = getPostTagsResponse ?? {};
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
            isEditMode={false}
            articleDropdown={articleDropdown}
            faqDropdown={faqDropdown}
            postCategories={postCategories}
            postTags={postTags}
            info={null}
          />
        </SectionRichText>
      </FormInteractionProvider>
    </Suspense>
  );
}
