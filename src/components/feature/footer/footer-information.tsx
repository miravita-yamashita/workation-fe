import { ImageBlock, TwoColContainer, TwoColContainerBlock } from "../common";
import IconFooterArrowBox from "@public/icon-footer-arrow-box.svg";
import Image from "next/image";

export const FooterInformation = () => {
  return (
    <TwoColContainer className="flex-col items-start gap-5 bg-shade-250 px-4 py-5 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-[100px] lg:py-[22px]">
      <TwoColContainerBlock className="w-auto flex-col items-baseline">
        <p className="text-sm font-bold text-shade-650">バケーションナース</p>
        <p className="w-full text-center font-albertsans text-[8px] font-light uppercase text-shade-650">
          VACATION NURSE
        </p>
      </TwoColContainerBlock>
      <TwoColContainerBlock className="w-auto flex-col items-baseline">
        <div className="flex items-center gap-2 self-start lg:self-end">
          <p className="text-sm font-medium text-black">コーポレートサイト</p>
          <ImageBlock className="relative h-3 w-3">
            <Image
              src={IconFooterArrowBox}
              alt="icon-warning-circle"
              fill
              sizes="100%"
            />
          </ImageBlock>
        </div>
        <p className="block text-[.625rem] font-medium uppercase">
          © 2025 VACATION NURSE. ALL RIGHTS RESERVED.
        </p>
      </TwoColContainerBlock>
    </TwoColContainer>
  );
};
