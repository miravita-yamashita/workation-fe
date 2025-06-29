import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";
import {
  FAQAccordion,
  FAQAccordionButton,
  FAQAccordionCommonContent,
  FAQAccordionContent,
  FAQAccordionEmphasized,
  FAQAccordionItem,
  FAQAccordionPanel,
  FAQAccordionPanelLegend,
  FAQAccordionPanelTitle,
  FAQAccordionTrigger,
  FAQPopularGroup,
  FAQSearchParamKey,
  getFAQPopularFAQByGroup,
} from "@/components/feature/faq";
import {
  FormPanel,
  FormPanelTitle,
  FormStep,
  FormStepList,
  FormStepListBullet,
  FormStepListItem,
} from "@/components/feature/form";
import { FormNurse } from "@/components/feature/form/form-nurse";
import { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import ImageAccordionTitle from "@public/contact/image-accordion-title.svg";
import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import Link from "next/link";
export const metadata: Metadata = {
  title: "お問い合わせ（看護師の方）",
};

const breadcrumbData = [
  BREADCRUMB.top,
  BREADCRUMB.contact.select,
  BREADCRUMB.contact.nurse,
];

export default async function Page() {
  const [faqPopularByGroupResponse] = await Promise.all([
    getFAQPopularFAQByGroup(),
  ]);
  const nurse = faqPopularByGroupResponse?.data?.[FAQPopularGroup.Nurse] ?? {};

  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>お問い合わせ（看護師の方）</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-coral-100 pb-[3.125rem] pt-[1.875rem] lg:pb-[6.25rem] lg:pt-[3.75rem]">
        <MainBlock
          size="sm"
          className="mb-10 flex flex-col gap-5 lg:mb-20 lg:flex-row lg:gap-10 lg:p-0"
        >
          <FormStep>
            <FormStepList>
              <FormStepListItem className="bg-coral-250">
                <FormStepListBullet>1</FormStepListBullet>
                <span>入力</span>
              </FormStepListItem>
              <FormStepListItem>
                <FormStepListBullet>2</FormStepListBullet>
                <span>確認</span>
              </FormStepListItem>
              <FormStepListItem>
                <FormStepListBullet>3</FormStepListBullet>
                <span>完了</span>
              </FormStepListItem>
            </FormStepList>
          </FormStep>

          <FormPanel>
            <FormPanelTitle>ユーザーの情報</FormPanelTitle>
            <Suspense>
              <FormNurse />
            </Suspense>
          </FormPanel>
        </MainBlock>

        {Object.keys(nurse).length > 0 && (
          <MainBlock
            size="sm"
            className="flex flex-col gap-5 lg:flex-row lg:gap-10 lg:p-0"
          >
            <FAQAccordionPanel>
              <FAQAccordionPanelLegend>FAQ</FAQAccordionPanelLegend>
              <div className="!mt-0 flex justify-center">
                <FAQAccordionPanelTitle>
                  <Image
                    src={ImageAccordionTitle}
                    alt="accordion title"
                    fill
                    sizes="100%"
                  />
                </FAQAccordionPanelTitle>
              </div>
              <FAQAccordion>
                {Object.entries(nurse)
                  .slice(0, 5)
                  .map(([key, { id, question, answer }]) => (
                    <FAQAccordionItem value={id} key={`${id}-${key}`}>
                      <FAQAccordionTrigger>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized>
                            <span>Q</span>
                          </FAQAccordionEmphasized>
                          {question}
                        </FAQAccordionCommonContent>
                      </FAQAccordionTrigger>
                      <FAQAccordionContent>
                        <FAQAccordionCommonContent>
                          <FAQAccordionEmphasized className="text-blue-300">
                            <span>A</span>
                          </FAQAccordionEmphasized>
                          {answer}
                        </FAQAccordionCommonContent>
                      </FAQAccordionContent>
                    </FAQAccordionItem>
                  ))}
              </FAQAccordion>
              <div className="text-center">
                <FAQAccordionButton>
                  <Link
                    href={`/recruit-conform?${FAQSearchParamKey.Category}=${FAQPopularGroup.Nurse}`}
                  >
                    もっと見る
                  </Link>
                </FAQAccordionButton>
              </div>
            </FAQAccordionPanel>
          </MainBlock>
        )}
      </BackgroundContainer>
    </>
  );
}
