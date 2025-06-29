import { FormMovie } from "@/components/admin/movie";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import { getFilterCategoryNameList } from "@/components/feature/top";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Movie",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.movie.list,
    {
      ...BREADCRUMB_ADMIN.movie.detail,
      link: id
        ? BREADCRUMB_ADMIN.movie.detail.link.replace(":id", id)
        : BREADCRUMB_ADMIN.movie.list.link,
    },
  ];
  const updatedBreadcrumbData = [...breadcrumbData];
  if (id) {
    updatedBreadcrumbData.push({
      label: "編集",
      link: "",
    });
  } else {
    updatedBreadcrumbData.push({
      label: "新規作成",
      link: "",
    });
  }

  const [filterCategoryNameListResponse] = await Promise.all([
    getFilterCategoryNameList(),
  ]);
  const { data: filterCategoryNameList } = filterCategoryNameListResponse || {};
  const movieCategoryNameList = filterCategoryNameList?.video || [];

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>新規作成</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/movie`}>戻る</Link>
          </Button>
          <RemoteSubmitButton />
        </ColumnContainer>
      </Header>
      <Section>
        <BreadcrumbComposite
          data={updatedBreadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <Section>
        <Section className="rounded-[.5rem] p-5">
          <FormMovie
            isEditMode={false}
            movieId={id}
            movieCategoryNameList={movieCategoryNameList}
          />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
