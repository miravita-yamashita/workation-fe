import {
  MovieInfoDates,
  MovieInfoTable,
  MovieInfoTableItem,
} from "@/components/admin/movie";
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
import { getMovieDetail } from "@/components/movie";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import RemoteDeleteButton from "@/components/feature/form/ui/remote-delete-button";
import MainDialogDeletePrompt from "@/components/feature/datatable/main-dialog-delete-prompt";
import { DashboardActionContextProvider } from "@/components/feature/datatable";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [movieDetailResponse] = await Promise.all([getMovieDetail(id)]);
  const { data: movieDetail } = movieDetailResponse || {};
  const {
    description,
    name,
    movie_category,
    media,
    created_at_details,
    updated_at_details,
  } = movieDetail || {};
  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.movie.list,
    {
      label: name,
      link: "",
    },
  ];

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>動画詳細</HeaderTitle>

        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/movie`}>戻る</Link>
          </Button>
          <Button size="auto" variant="remote" asChild>
            <Link href={`/admin/movie/${id}/edit`}>編集する</Link>
          </Button>
          <DashboardActionContextProvider>
            <RemoteDeleteButton endpoint={`movie`} id={id} />
            <MainDialogDeletePrompt
              redirectPath="/admin/movie"
              endpoint="movie"
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

      <Section>
        <ColumnContainer className="flex gap-5">
          <ColumnItem className="flex w-full flex-1 flex-col gap-5 rounded border p-5">
            <MovieInfoDates className="flex justify-between">
              <p className="text-sm text-shade-910">
                更新日：{updated_at_details}
              </p>
              <p className="text-sm text-shade-910">
                作成日：{created_at_details}
              </p>
            </MovieInfoDates>
            <FieldLabel>
              <FieldLabelText>動画情報</FieldLabelText>
              <FieldLabelLine />
            </FieldLabel>
            <MovieInfoTable>
              <MovieInfoTableItem className="flex items-center font-bold">
                タイトル
              </MovieInfoTableItem>
              <MovieInfoTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                {name}
              </MovieInfoTableItem>
              <MovieInfoTableItem className="flex items-center bg-shade-210 font-bold">
                説明文
              </MovieInfoTableItem>
              <MovieInfoTableItem className="w-full whitespace-pre-line bg-shade-210 px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                {description}
              </MovieInfoTableItem>
            </MovieInfoTable>
          </ColumnItem>
          <ColumnItem className="flex w-[19.375rem] flex-col gap-5 self-start rounded border p-5">
            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>サムネイル</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <ImageBlock className="relative h-[9.6875rem] w-full">
                <ImageItem
                  src={media[0]?.url || ImageNoPhoto?.src}
                  altText="video image"
                  className="object-cover"
                />
              </ImageBlock>
            </FieldLabelGroup>

            <FieldLabelGroup className="flex flex-col gap-4">
              <FieldLabel className="pb-0">
                <FieldLabelText>動画カテゴリー</FieldLabelText>
                <FieldLabelLine />
              </FieldLabel>
              <p>{movie_category?.name}</p>
            </FieldLabelGroup>
          </ColumnItem>
        </ColumnContainer>
      </Section>
    </FormInteractionProvider>
  );
}
