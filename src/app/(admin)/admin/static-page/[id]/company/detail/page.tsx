import { ColumnContainer } from "@/components/feature/common";
import { Header, HeaderTitle, Section, SectionTitle } from "@/components/feature/dashboard";
import { FormInteractionProvider, Timestamp } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Metadata } from "next";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  Detail,
  DetailImageBlock,
  DetailLabel,
  DetailRow,
  DetailValue,
  getCompanyProfileDetail,
} from "@/components/admin/static-page/company/detail";
import Image from "next/image";
import IconNoPhotoSmall from "@public/icon-no-photo-small.svg";

export const metadata: Metadata = {
  title: "会社概要 Company Profile詳細",
};

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [getCompanyProfileDetailResponse] = await Promise.all([
    getCompanyProfileDetail(id),
  ]);
  const { data: info = null } = getCompanyProfileDetailResponse ?? {};

  const updatedAt = info?.updated_at;
  const createdAt = info?.created_at;

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.static.list,
    BREADCRUMB_ADMIN.static.company.detail,
  ];

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>会社概要 Company Profile</HeaderTitle>
        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/static-page`}>戻る</Link>
          </Button>
          <Button size="auto" variant="remote" asChild>
            <Link href={`/admin/static-page/${id}/company/edit`}>更新</Link>
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
        <Section className="rounded-[.5rem] border border-shade-250 p-5">
          <Timestamp className="mb-[2rem]">
            {updatedAt && <span>更新日：{updatedAt}</span>}
            {createdAt && <span>作成日：{createdAt}</span>}
          </Timestamp>
          <ColumnContainer className="mb-5 flex items-center gap-3">
            <SectionTitle className="shrink-0">ごあいさつ</SectionTitle>
            <hr className="w-full" />
          </ColumnContainer>
          <Detail>
            <DetailRow>
              <DetailLabel>見出し</DetailLabel>
              <p>{info?.greetings?.[0]?.title || "-"}</p>
            </DetailRow>
            <DetailRow>
              <DetailLabel>本文</DetailLabel>
              <DetailValue>
                {info?.greetings?.[0]?.plain_content || "-"}
              </DetailValue>
            </DetailRow>
            <DetailRow>
              <DetailLabel>カスタム画像</DetailLabel>
              <DetailImageBlock>
                {info?.greetings?.[0]?.media?.[0]?.media ? (
                  <Image
                    src={info?.greetings?.[0]?.media?.[0]?.media}
                    alt="company profile"
                    className="object-contain"
                    fill
                    sizes="100%"
                  />
                ) : (
                  <Image
                    src={IconNoPhotoSmall}
                    alt="no photo"
                    className="absolute inset-0 m-auto object-contain"
                    width={20}
                    height={20}
                  />
                )}
              </DetailImageBlock>
            </DetailRow>
          </Detail>
          <section className="mb-5">
            <ColumnContainer className="mb-5 flex items-center gap-3">
              <SectionTitle className="shrink-0">理念</SectionTitle>
              <hr className="w-full" />
            </ColumnContainer>
            <Detail>
              <DetailRow>
                <DetailLabel>見出し</DetailLabel>
                <DetailValue>
                  {info?.greetings?.[0]?.philosophy || "-"}
                </DetailValue>
              </DetailRow>
            </Detail>
          </section>
          <section className="mb-5">
            <ColumnContainer className="mb-5 flex items-center gap-3">
              <SectionTitle className="shrink-0">応募ガイドライン</SectionTitle>
              <hr className="w-full" />
            </ColumnContainer>
            <Detail>
              {info?.guide.map(({ id, title, plain_content }) => (
                <DetailRow key={id}>
                  <DetailLabel>{title}</DetailLabel>
                  <DetailValue>{plain_content}</DetailValue>
                </DetailRow>
              ))}
            </Detail>
          </section>
          <section className="mb-5">
            <ColumnContainer className="mb-5 flex items-center gap-3">
              <SectionTitle className="shrink-0">会社概要</SectionTitle>
              <hr className="w-full" />
            </ColumnContainer>
            <Detail>
              {info?.profile.map(({ id, title, plain_content }) => (
                <DetailRow key={id}>
                  <DetailLabel>{title}</DetailLabel>
                  <DetailValue>{plain_content}</DetailValue>
                </DetailRow>
              ))}
            </Detail>
          </section>
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
