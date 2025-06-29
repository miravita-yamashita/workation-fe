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
import Link from "next/link";
import { Metadata } from "next";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { FormCompany } from "@/components/admin/static-page/company/form";
import { getCompanyProfileDetail } from "@/components/admin/static-page/company/detail";
import { auth } from "@/app/auth";

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

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.static.list,
    {
      label: BREADCRUMB_ADMIN.static.company.detail.label.replace(":id", id),
      link: BREADCRUMB_ADMIN.static.company.detail.link.replace(":id", id),
    },
    BREADCRUMB_ADMIN.static.company.edit,
  ];

  const session = await auth();

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>会社概要 Company Profile</HeaderTitle>
        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/static-page`}>戻る</Link>
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
            <SectionTitle className="shrink-0">ごあいさつ</SectionTitle>
            <hr className="w-full" />
          </ColumnContainer>
          <FormCompany info={info} />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
