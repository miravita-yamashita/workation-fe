import { auth } from "@/app/auth";
import { TableDetail } from "@/components/admin/categories";
import { getSubCategoryDetail } from "@/components/admin/categories/detail";
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
import { DashboardActionContextProvider } from "@/components/feature/datatable";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import { FormInteractionProvider } from "@/components/feature/form";
import RemoteDeleteButton from "@/components/feature/form/ui/remote-delete-button";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Category",
};

type PageProps = {
  params: Promise<{ categoryId: string; id: string }>;
};

export default async function CategoryDetailPage({ params }: PageProps) {
  const { categoryId: parentCategoryId, id: subCategoryId } = await params;
  const [getSubCategoryDetailResponse] = await Promise.all([
    getSubCategoryDetail(subCategoryId),
  ]);

  const { data: categoryDetail } = getSubCategoryDetailResponse || {};

  if (!categoryDetail) notFound();

  const session = await auth();

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.categories.base,
    {
      label: BREADCRUMB_ADMIN.categories.listSubCategory.label,
      link: BREADCRUMB_ADMIN.categories.listSubCategory.link.replace(
        ":categoryId",
        parentCategoryId,
      ),
    },
    BREADCRUMB_ADMIN.categories.detail,
  ];

  const categoryDataColumn = [
    { id: "0", label: "Category ID", value: categoryDetail?.id ?? "" },
    { id: "1", label: "ステータス", value: categoryDetail?.status ?? "" },
    { id: "2", label: "カテゴリー名", value: categoryDetail?.name ?? "" },
    {
      id: "3",
      label: "項目",
      value: categoryDetail?.items?.map((item) => item.name)?.join("\n"),
    },
  ];

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>カテゴリー詳細</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/categories/${parentCategoryId}/list`}>
              戻る
            </Link>
          </Button>
          {session?.user.isAdmin && (
            <>
              <Button size="auto" variant="remote" type="button" asChild>
                <Link
                  href={`/admin/categories/${parentCategoryId}/list/${subCategoryId}/edit`}
                >
                  編集する
                </Link>
              </Button>
              <DashboardActionContextProvider>
                <RemoteDeleteButton
                  endpoint={`category/sub/items`}
                  id={subCategoryId}
                  className="text-sm"
                />
                <MainDialogDeletePrompt
                  redirectPath={`/admin/categories/${parentCategoryId}/list?name=${categoryDetail?.name}`}
                  endpoint={`/category/sub/items`}
                />
              </DashboardActionContextProvider>
            </>
          )}
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
          <div className="flex items-center justify-between pb-8">
            <p className="text-sm font-medium text-shade-910">
              更新日：{categoryDetail?.updated_at}
            </p>
            <p className="text-sm font-medium text-shade-910">
              作成日：{categoryDetail?.created_at}
            </p>
          </div>
          <ColumnContainer className="mb-5 flex items-center gap-3">
            <SectionTitle className="shrink-0">カテゴリー詳細</SectionTitle>
            <hr className="w-full" />
          </ColumnContainer>
          <TableDetail column={categoryDataColumn} />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
