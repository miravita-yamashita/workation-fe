import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import { FirstTimeUsers } from "@/components/first-time";
import { getStaticPageBySlug } from "@/components/static-page";

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.firstTime.base];

export default async function Page() {
  const STATIC_SLUG = "For-Beginners"; // This value is dependent form the seeded
  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>はじめての方へ</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="px-[1rem] sm:px-0 lg:p-0">
        <BackgroundContainer className="bg-ivory-100">
          <FirstTimeUsers response={getStaticPageBySlugResponse} />
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
