import {
  BackgroundContainer,
  DiagonalLine,
  MainBlock,
  PageHeader,
  SubHeadingTitle,
} from "@/components/feature/common";
import {
  CompanyApplicationGuidelines,
  CompanyApplicationGuidelinesContent,
  CompanyApplicationGuidelinesTable,
  CompanyGreetings,
  CompanyGreetingsContent,
  CompanyGreetingsContentDescription,
  CompanyGreetingsContentLeft,
} from "@/components/company";

import {
  CompanyPhilosophy,
  CompanyPhilosophyContent,
  CompanyPhilosophyDescription,
} from "@/components/company/company-philosophy-content";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import {
  CompanyTableItem,
  CompanyTableItemBorderedDash,
} from "@/components/company/company-table";
import {
  CompanyProfile,
  CompanyProfileContent,
  CompanyProfileTable,
} from "@/components/company/company-profile-content";
import {
  CompanySectionTitleContent,
  CompanySectionTitleEmphasis,
  CompanySectionTitle,
} from "@/components/company/company";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { getStaticPageBySlug } from "@/components/static-page";
import { GENERIC_NO_DATA } from "@/lib/message-map";

const breadcrumbData = [BREADCRUMB.top, BREADCRUMB.company.base];

export default async function Page() {
  const STATIC_SLUG = "Company-Profile"; // This value is dependent form the seeded
  const [getStaticPageBySlugResponse] = await Promise.all([
    getStaticPageBySlug(STATIC_SLUG),
  ]);

  const { data = null } = getStaticPageBySlugResponse ?? {};

  if (!data) return <p className="p-5">{GENERIC_NO_DATA}</p>;

  const { greetings = [], guide = [], profile = [] } = data;

  const greeting = greetings[0] ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader> 会社概要</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-coral-100">
        <MainBlock
          size="sm"
          className="px-[1rem] pb-[3.125rem] pt-[30px] sm:px-0 lg:px-[6.25rem] lg:py-[6.25rem]"
        >
          <CompanyGreetings>
            <CompanySectionTitleContent>
              <CompanySectionTitleEmphasis>
                ごあいさつ
              </CompanySectionTitleEmphasis>
              <DiagonalLine
                className={cn(
                  "hidden h-[.0625rem] w-[1.25rem] rotate-[-75deg] bg-coral-300 leading-[1.875rem] lg:block",
                )}
              />
              <CompanySectionTitle className="text-coral-300">
                Greeting
              </CompanySectionTitle>
            </CompanySectionTitleContent>

            <CompanyGreetingsContent className="gap-5 px-[.875rem] py-[1.875rem] lg:flex-row lg:gap-10 lg:px-10 lg:py-10">
              <CompanyGreetingsContentLeft className="w-full gap-5">
                <SubHeadingTitle title={greeting.title} />
                <CompanyGreetingsContentDescription className="lg:leading-[1.875rem]">
                  {greeting.plain_content}
                </CompanyGreetingsContentDescription>
              </CompanyGreetingsContentLeft>
              {/* Note: Hidden as per Seima's request */}
              {/* <CompanyGreetingsContentRight className="w-full">
                <ImageBlock className="relative h-[23.625rem] w-full lg:h-[18.75rem] lg:w-[15.625rem]">
                  <ImageItem
                    src={greeting?.media?.[0]?.media || "/"}
                    altText="company image"
                    className="object-cover"
                  />
                </ImageBlock>
              </CompanyGreetingsContentRight> */}
            </CompanyGreetingsContent>
          </CompanyGreetings>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-white">
        <MainBlock
          size="sm"
          className="flex flex-col gap-10 px-[1rem] pb-[3.125rem] pt-10 sm:px-[1rem] lg:gap-[8.75rem] lg:px-[6.25rem] lg:py-[8.75rem]"
        >
          <CompanyPhilosophy>
            <CompanySectionTitleContent>
              <CompanySectionTitleEmphasis>理念</CompanySectionTitleEmphasis>
              <DiagonalLine
                className={cn(
                  "hidden h-[.0625rem] w-[1.25rem] rotate-[-75deg] bg-blue-300 leading-[1.875rem] lg:block",
                )}
              />
              <CompanySectionTitle className="text-blue-300">
                Philosophy
              </CompanySectionTitle>
            </CompanySectionTitleContent>

            <CompanyPhilosophyContent>
              <CompanyPhilosophyDescription>
                {greeting.philosophy}
              </CompanyPhilosophyDescription>
            </CompanyPhilosophyContent>
          </CompanyPhilosophy>
          <CompanyApplicationGuidelines>
            <CompanyApplicationGuidelinesContent className="items-center justify-center">
              <CompanySectionTitleContent>
                <CompanySectionTitleEmphasis>
                  応募ガイドライン
                </CompanySectionTitleEmphasis>
                <DiagonalLine
                  className={cn(
                    "hidden h-[.0625rem] w-[1.25rem] rotate-[-75deg] bg-green-200 leading-[1.875rem] lg:block",
                  )}
                />
                <CompanySectionTitle className="text-green-200">
                  Application Guidelines
                </CompanySectionTitle>
              </CompanySectionTitleContent>

              <CompanyApplicationGuidelinesTable className="grid-cols-1 border border-t-0 lg:grid-cols-[11.25rem_1fr]">
                {guide.map(({ id, title, plain_content }) => {
                  return (
                    <Fragment key={id}>
                      <CompanyTableItem className="flex items-center bg-shade-950 px-[.875rem] py-[.625rem] font-bold lg:px-5 lg:py-[1rem]">
                        {title}
                      </CompanyTableItem>
                      <CompanyTableItem className="w-full whitespace-pre-line px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]">
                        {plain_content}
                      </CompanyTableItem>
                    </Fragment>
                  );
                })}
              </CompanyApplicationGuidelinesTable>
            </CompanyApplicationGuidelinesContent>
          </CompanyApplicationGuidelines>
          <CompanyProfile>
            <CompanyProfileContent className="items-center justify-center">
              <CompanySectionTitleContent>
                <CompanySectionTitleEmphasis>
                  会社概要
                </CompanySectionTitleEmphasis>
                <DiagonalLine
                  className={cn(
                    "hidden h-[.0625rem] w-[1.25rem] rotate-[-75deg] bg-coral-300 leading-[1.875rem] lg:block",
                  )}
                />
                <CompanySectionTitle className="text-coral-300">
                  Company Profile
                </CompanySectionTitle>
              </CompanySectionTitleContent>

              <CompanyProfileTable className="grid-cols-[6.25rem_1fr] border-none lg:grid-cols-[11.25rem_1fr]">
                {profile.map(({ id, title, plain_content }) => {
                  return (
                    <Fragment key={id}>
                      <CompanyTableItemBorderedDash className="flex items-center whitespace-pre-line font-bold text-coral-300">
                        {title}
                      </CompanyTableItemBorderedDash>
                      <CompanyTableItemBorderedDash className="w-full whitespace-pre-line">
                        {plain_content}
                      </CompanyTableItemBorderedDash>
                    </Fragment>
                  );
                })}
              </CompanyProfileTable>
            </CompanyProfileContent>
          </CompanyProfile>
        </MainBlock>
      </BackgroundContainer>
    </>
  );
}
