import { About } from "@/components/about";
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

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.about.base];
export default async function Page() {
  const STATIC_SLUG = "About-Workation-Nurse"; // This value is dependent form the seeded
  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader> バケーションナースとは</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <MainBlock size="sm" className="lg:p-0">
        <BackgroundContainer className="bg-ivory-100">
          <About response={getStaticPageBySlugResponse} />
        </BackgroundContainer>
      </MainBlock>
    </>
  );
}
