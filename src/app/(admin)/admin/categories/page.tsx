import {
  Category,
  CategoryLabel,
  CategoryRedirect,
  getAdminCategoryList,
} from "@/components/admin/categories";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Metadata } from "next";
import Link from "next/link";
import { CategorySearchParamKey } from "@/components/admin/categories";

export const metadata: Metadata = {
  title: "Categories",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.dashboard,
  BREADCRUMB_ADMIN.categories.list,
];

export default async function Page() {
  const [getRecentDataResponse] = await Promise.all([getAdminCategoryList()]);

  const { data = [] } = getRecentDataResponse;

  return (
    <>
      <Header>
        <HeaderTitle>カテゴリー一覧</HeaderTitle>
      </Header>
      <Section>
        <BreadcrumbComposite
          data={breadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <Section className="py-0">
        <div className="border-shade-250 rounded-[.5rem] border p-5">
          <div className="grid grid-cols-2 gap-5">
            {data?.map(({ id, name }) => (
              <Category key={id}>
                <ColumnContainer className="flex items-center justify-between">
                  <CategoryLabel>{name}</CategoryLabel>
                  <CategoryRedirect>
                    <Link
                      href={`/admin/categories/${id}/list?${CategorySearchParamKey.Name}=${name}`}
                    >
                      カテゴリー一覧へ
                    </Link>
                  </CategoryRedirect>
                </ColumnContainer>
              </Category>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
