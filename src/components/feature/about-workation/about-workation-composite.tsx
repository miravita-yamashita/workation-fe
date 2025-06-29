"use client";

import Link from "next/link";
import { Block, ImageBlock, ImageItem, MainBlock } from "../common";

import { cn } from "@/lib/utils";
import IconAboutTitle from "@public/image-about-title.svg";
import IconAboutFigure from "@public/image-about-figure.svg";
import IconCaretWhite from "@public/icon-caret-white.svg";
import { Badge } from "@/components/ui/badge";
import {
  AboutWorkation,
  AboutWorkationAction,
  AboutWorkationDescription,
  AboutWorkationImageFigure,
  AboutWorkationTitle,
} from "./about-workation";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const AboutWhatIsWorkationComposite = ({
  className = "",
  redirectUrl,
}: CommonProps & {
  redirectUrl: string;
}) => {
  return (
    <MainBlock className={cn("relative max-w-full", className)}>
      <Block className="lg:m-auto lg:max-w-[620px]">
        <AboutWorkation className="relative items-center justify-center lg:justify-center">
          <AboutWorkationTitle>
            <ImageBlock className="left-[-33px] h-[72px] w-[210px] lg:left-[-128px] lg:h-[120px] lg:w-[350px]">
              <ImageItem src={IconAboutTitle} altText="icon about title" />
            </ImageBlock>
          </AboutWorkationTitle>
          <AboutWorkationImageFigure className="absolute left-1/2 top-1/2 translate-x-[5%] translate-y-[-40%] transform lg:left-[52%] lg:top-[-100px] lg:translate-y-0 lg:transform-none">
            <ImageBlock className="h-[115px] w-[160px] lg:h-[218px] lg:w-[281px]">
              <ImageItem src={IconAboutFigure} altText="icon about figure" />
            </ImageBlock>
          </AboutWorkationImageFigure>
        </AboutWorkation>
        <AboutWorkationDescription className="mb-[14px] mt-[45px] text-[14px] leading-[1.75rem] lg:mt-10">
          バケーションナースは、「バケーション」「ナース」を掛け合わせた新しい働き方の提案です。仕事と休暇を融合させ、リフレッシュしながら看護師としてのスキルを活かせる短期派遣スタイルを提供します。特に、人間関係に疲れている方や、プライベートの時間をもっと充実させたい方におすすめです。美しい自然に囲まれた地域や観光地で働くことで、心身をリフレッシュしながら働ける環境を実現。新しい土地での経験が、看護師としての視野を広げ、充実感をもたらします。あなたも、今までにない自由な働き方を体験してみませんか？
        </AboutWorkationDescription>
        <AboutWorkationAction className="lg:mt-[22px]">
          <Link
            href={redirectUrl}
            className="m-auto flex max-w-[fit-content] items-center justify-center gap-[10px] rounded-full bg-red-100 px-[60px] py-[10px] text-white"
          >
            <Block className="text-xs font-bold">もっと見る</Block>

            <ImageBlock className="h-[8px] w-[8px]">
              <ImageItem src={IconCaretWhite} altText="icon caret" />
            </ImageBlock>
          </Link>
        </AboutWorkationAction>
      </Block>
      <Badge className="hover:bg-wite absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-white px-5 py-[6px] font-albertsans text-[10px] font-medium uppercase text-coral-300 shadow-none">
        About
      </Badge>
    </MainBlock>
  );
};
