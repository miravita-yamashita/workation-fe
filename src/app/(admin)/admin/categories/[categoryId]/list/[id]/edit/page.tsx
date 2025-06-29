import { auth } from "@/app/auth";
import { getSubCategoryDetail } from "@/components/admin/categories/detail";
import { FormCategory } from "@/components/admin/categories/form";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import {
  Header,
  HeaderTitle,
  Section,
  SectionTitle,
} from "@/components/feature/dashboard";
import { FormInteractionProvider } from "@/components/feature/form";
import { RemoteSubmitButton, Timestamp } from "@/components/feature/form/ui";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Category",
};

type PageProps = {
  params: Promise<{ categoryId: string; id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id: subCategoryId, categoryId: parentCategoryId } = await params;

  const [getSubCategoryDetailResponse] = await Promise.all([
    getSubCategoryDetail(subCategoryId),
  ]);

  const { data } = getSubCategoryDetailResponse || {};
  const { updated_at: updatedAt = "", created_at: createdAt = "" } = data || {};

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.categories.base,
    {
      ...BREADCRUMB_ADMIN.categories.listSubCategory,
      link: BREADCRUMB_ADMIN.categories.listSubCategory.link
        .replace(":categoryId", parentCategoryId)
        .replace(":subCategoryId", subCategoryId),
    },
    {
      ...BREADCRUMB_ADMIN.categories.detail,
      link: BREADCRUMB_ADMIN.categories.detail.link
        .replace(":subCategoryId", subCategoryId)
        .replace(":categoryId", parentCategoryId),
    },
    BREADCRUMB_ADMIN.categories.edit,
  ];

  const session = await auth();

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>カテゴリー編集</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/categories/${subCategoryId}/list`}>戻る</Link>
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
      <Section>
        <Section className="rounded-[.5rem] border border-shade-250 p-5">
          <Timestamp className="mb-[2rem]">
            {updatedAt && <span>更新日：{updatedAt}</span>}
            {createdAt && <span>作成日：{createdAt}</span>}
          </Timestamp>
          <ColumnContainer className="mb-5 flex items-center gap-3">
            <SectionTitle className="shrink-0">カテゴリー詳細</SectionTitle>
            <hr className="w-full" />
          </ColumnContainer>

          <FormCategory
            info={data}
            isEditMode={true}
            parentCategoryId={parentCategoryId}
          />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
