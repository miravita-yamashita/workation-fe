import { auth } from "@/app/auth";
import { FormRichText } from "@/components/admin/static-page/rich-text";
import { getStaticPageDetail } from "@/components/admin/static-page/rich-text/detail/lib/actions";
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
import { GENERIC_NO_DATA } from "@/lib/message-map";
import { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "一般事業主行動計画 General Employer Action Plan",
};

const breadcrumbData = [
  BREADCRUMB_ADMIN.dashboard,
  BREADCRUMB_ADMIN.static.list,
  BREADCRUMB_ADMIN.static.employer,
];

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const [getStaticPageDetailResponse] = await Promise.all([
    getStaticPageDetail(id),
  ]);

  const { data } = getStaticPageDetailResponse;

  if (!data) return <p className="p-5">{GENERIC_NO_DATA}</p>;

  const session = await auth();

  return (
    <Suspense fallback={<Loading />}>
      <FormInteractionProvider>
        <Header>
          <HeaderTitle>
            コンテンツ作成ポリシー Content Creation Policy
          </HeaderTitle>
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
        <SectionRichText>
          <section className="bg-white p-5">
            <FormRichText info={data} />
          </section>
        </SectionRichText>
      </FormInteractionProvider>
    </Suspense>
  );
}
