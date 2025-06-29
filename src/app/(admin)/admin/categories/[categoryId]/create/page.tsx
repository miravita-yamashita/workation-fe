import { auth } from "@/app/auth";
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
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Category",
};

type PageProps = {
  params: Promise<{ categoryId: string }>;
};

export default async function Page({ params }: PageProps) {
  const { categoryId: parentCategoryId } = await params;

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.categories.base,
    {
      ...BREADCRUMB_ADMIN.categories.listSubCategory,
      link: BREADCRUMB_ADMIN.categories.listSubCategory.link.replace(
        ":categoryId",
        parentCategoryId,
      ),
    },
    BREADCRUMB_ADMIN.categories.create,
  ];

  const session = await auth();

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>カテゴリー編集</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/categories/${parentCategoryId}/list`}>
              戻る
            </Link>
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
          <ColumnContainer className="mb-5 flex items-center gap-3">
            <SectionTitle className="shrink-0">カテゴリー詳細</SectionTitle>
            <hr className="w-full" />
          </ColumnContainer>

          <FormCategory
            isEditMode={false}
            parentCategoryId={parentCategoryId}
          />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
