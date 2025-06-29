import { auth } from "@/app/auth";
import { FormMovie } from "@/components/admin/movie";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { DashboardActionContextProvider } from "@/components/feature/datatable";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import RemoteDeleteButton from "@/components/feature/form/ui/remote-delete-button";
import { getFilterCategoryNameList } from "@/components/feature/top";
import { getMovieDetail } from "@/components/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [filterCategoryNameListResponse, movieDetailsResponse] =
    await Promise.all([getFilterCategoryNameList(), getMovieDetail(id)]);
  const { data: filterCategoryNameList } = filterCategoryNameListResponse || {};
  const movieCategoryNameList = filterCategoryNameList?.video || [];
  const { data: movieDetails } = movieDetailsResponse || {};
  const { name } = movieDetails || {};
  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.movie.list,
    {
      label: name,
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

  const session = await auth();

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>カテゴリー編集</HeaderTitle>
        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/movie`}>戻る</Link>
          </Button>
          <Button size="auto" variant="return" asChild></Button>
          {session?.user?.isAdmin && (
            <>
              <RemoteSubmitButton />
              <DashboardActionContextProvider>
                <RemoteDeleteButton endpoint={`movie`} id={id} />
                <MainDialogDeletePrompt
                  redirectPath="/admin/movie"
                  endpoint="movie"
                />
              </DashboardActionContextProvider>
            </>
          )}
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
            info={movieDetails}
            isEditMode={true}
            movieId={id}
            movieCategoryNameList={movieCategoryNameList}
          />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
