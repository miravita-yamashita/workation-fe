import {
  BREADCRUMB,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import {
  BackgroundContainer,
  MainBlock,
  PageHeader,
} from "@/components/feature/common";

import {
  FormStep,
  FormStepList,
  FormStepListBullet,
  FormStepListItem,
} from "@/components/feature/form";

import {
  CheckDetails,
  CheckMiscellaneousDetails,
} from "@/components/recruit/check";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "お問い合わせ（看護師の方）",
};

const breadcrumbData = [
  BREADCRUMB.top,
  BREADCRUMB.recruit.base,
  BREADCRUMB.recruit.thanks,
];

export default function Page() {
  return (
    <>
      <BackgroundContainer className="bg-white">
        <MainBlock size="sm" className="lg:p-0">
          <BreadcrumbComposite data={breadcrumbData} />
          <PageHeader>求人専用応募フォーム</PageHeader>
        </MainBlock>
      </BackgroundContainer>
      <BackgroundContainer className="bg-coral-100 pb-[3.125rem] pt-[1.875rem] lg:pb-[6.25rem] lg:pt-[3.75rem]">
        <MainBlock
          size="sm"
          className="flex flex-col gap-5 lg:flex-row lg:gap-10 lg:p-0"
        >
          <FormStep>
            <FormStepList>
              <FormStepListItem>
                <FormStepListBullet>1</FormStepListBullet>
                <span>入力</span>
              </FormStepListItem>
              <FormStepListItem className="bg-coral-250">
                <FormStepListBullet>2</FormStepListBullet>
                <span>確認</span>
              </FormStepListItem>
              <FormStepListItem>
                <FormStepListBullet>3</FormStepListBullet>
                <span>完了</span>
              </FormStepListItem>

              <FormStepListItem className="bg-coral-100 p-0">
                <CheckMiscellaneousDetails />
              </FormStepListItem>
            </FormStepList>
          </FormStep>

          <CheckDetails />
        </MainBlock>
      </BackgroundContainer>
    </>
  );
}
