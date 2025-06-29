import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { getStaticPageBySlug } from "@/components/static-page";
import { GENERIC_NO_DATA } from "@/lib/message-map";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.privacyPolicy.base];

export default async function Page() {
  const STATIC_SLUG = "Privacy-Policy"; // This value is dependent form the seeded
  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  const { data } = getStaticPageBySlugResponse;

  if (!data) return <p>{GENERIC_NO_DATA}</p>;

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>プライバシーポリシー</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="px-[1rem] sm:px-[1rem] lg:p-0">
        <BackgroundContainer className="bg-white">
          <section
            className="tiptap my-[1.875rem] bg-white px-[.875rem] py-[1.875rem] lg:mt-[1.875rem] lg:px-[6.25rem] lg:py-[3.125rem]"
            dangerouslySetInnerHTML={{
              __html: data.content,
            }}
          ></section>
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
