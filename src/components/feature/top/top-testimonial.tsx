import { PropsWithChildren } from "react";
import {
  BackgroundContainer,
  Block,
  ColumnContainer,
  ColumnItem,
  FieldHorizontalRuleBlock,
  ImageBlock,
  ImageItem,
  UserPhoto,
} from "../common";
import { cn, getUniqueId } from "@/lib/utils";
import IconTestimonialTitle from "@public/image-testimonial-title.svg";
import IconMegaphone from "@public/icon-megaphone.svg";
import TestimonialFigureAlt from "@public/image-testimonial-figure-alt.svg";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import IconChevronRight from "@public/icon-chevron-right.svg";
import IconCaret from "@public/icon-caret.svg";
import Image from "next/image";
import {
  TopTestimonialsDataType,
  TopTestimonialsResponseType,
} from "@/components/testimonial";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const TopTestimonialList = ({
  response,
  className = "",
}: CommonProps & {
  response: TopTestimonialsResponseType;
}) => {
  const { data } = response || {};
  const { data: testimonialList } = data || {};

  return (
    <BackgroundContainer className="relative bg-blue-100 lg:mx-0">
      <ColumnContainer
        className={cn(
          "flex-col px-[.625rem] pt-5 lg:px-10 lg:py-10",
          className,
        )}
      >
        <ColumnItem className="h-[7.5rem] lg:h-[8.75rem]">
          <TestimonialsTitle />
        </ColumnItem>
        <ColumnItem className="flex flex-col gap-5">
          <TestimonialsContent items={testimonialList} />
        </ColumnItem>
      </ColumnContainer>
      <Badge className="absolute left-1/2 top-0 max-w-[fit-content] -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-blue-300 px-5 py-[.375rem] font-albertsans text-[.625rem] font-medium uppercase text-white shadow-none hover:bg-blue-300">
        TESTIMONIALS
      </Badge>
    </BackgroundContainer>
  );
};

export const TestimonialsTitle = () => {
  return (
    <ColumnContainer className="relative h-full w-full">
      <ColumnItem className="relative flex w-full items-end lg:gap-2.5">
        <Block className="pl-2 lg:pl-4">
          <ImageBlock className="relative h-[6.875rem] w-[7.5rem] lg:h-[190px] lg:w-[210px]">
            <ImageItem
              src={TestimonialFigureAlt}
              altText="icon testimonial subtitle"
              className="object-cover"
            />
          </ImageBlock>
        </Block>
        <div className="self-center">
          <p className="text-[1.125rem] font-bold leading-[1.5625rem] text-blue-300 lg:text-[2.125rem] lg:leading-[3rem]">
            バケーションナースの
          </p>
          <ImageBlock className="h-[3rem] w-[10.125rem] lg:h-[4.375rem] lg:w-[15rem]">
            <ImageItem
              src={IconTestimonialTitle}
              altText="icon testimonial subtitle"
            />
          </ImageBlock>
        </div>

        <Block className="absolute right-0 top-[50%] -translate-y-1/2 transform lg:top-[35%]">
          <ImageBlock className="relative h-[5.625rem] w-[5.625rem] scale-[1.5] lg:h-[7.5rem] lg:w-[7.5rem]">
            <ImageItem
              src={IconMegaphone}
              altText="icon testimonial subtitle"
            />
          </ImageBlock>
        </Block>
      </ColumnItem>
    </ColumnContainer>
  );
};

export const TestimonialsContent = ({
  items = [],
}: {
  items?: TopTestimonialsDataType[];
}) => {
  return (
    <>
      {items?.map((testimonial) => {
        const testimonialImage = testimonial?.media?.[0]?.url || "";
        return (
          <ColumnContainer
            className="relative z-20 flex-col rounded-xl bg-white p-5"
            key={getUniqueId(testimonial?.id?.toString())}
          >
            <UserInfo className="flex flex-row gap-[.625rem] lg:gap-5">
              <UserPhoto imgSrc={testimonialImage} />
              <ContentHeader className="w-full flex-col">
                {/* NOTE: hide as per instruction from client */}
                <ColumnItem className="hidden text-xs font-medium text-shade-800 lg:text-sm">
                  {testimonial?.title}
                </ColumnItem>
                <ColumnItem className="text-lg font-bold text-coral-300 lg:mb-1 lg:text-[1.375rem]">
                  {testimonial?.title}
                </ColumnItem>
                <FieldHorizontalRuleBlock />
              </ContentHeader>
            </UserInfo>
            <ContentBody className="relative lg:mt-[.875rem]">
              <Block className="max-h-[6.25rem] overflow-hidden">
                <span className="text-sm leading-[1.3125rem] text-black lg:line-clamp-4 lg:text-base lg:leading-relaxed">
                  {testimonial?.body}
                </span>
              </Block>
              <Block className="absolute bottom-0 left-0 h-[2rem] w-full bg-gradient-to-t from-white" />
            </ContentBody>
            <ContentActions className="flex justify-center lg:justify-end">
              <Link
                href={`testimonial/${testimonial?.id}`}
                title="View All"
                className="mt-[.625rem] inline-flex w-fit items-center gap-[.625rem] rounded-full border border-coral-300 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-coral-300"
              >
                <span>もっと見る</span>
                <Block className="relative h-[.375rem] w-[.1875rem]">
                  <Image
                    src={IconCaret}
                    alt="chevron right icon"
                    priority={true}
                  />
                </Block>
              </Link>
            </ContentActions>
          </ColumnContainer>
        );
      })}

      <BlockActions className="z-10 flex justify-center">
        <Link
          href="/testimonial"
          title="Show More"
          className="mb-[1.875rem] inline-flex w-fit items-center gap-[.625rem] rounded-full bg-red-100 px-[3.75rem] py-[.625rem] text-center text-xs font-bold text-white hover:bg-red-200 lg:mb-0"
        >
          <span>もっと見る</span>
          <Block className="relative h-[.375rem] w-[.1875rem]">
            <Image
              src={IconChevronRight}
              alt="chevron right icon"
              priority={true}
            />
          </Block>
        </Link>
      </BlockActions>
    </>
  );
};

const ContentHeader = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-row", className)}>{children}</div>;
};

const ContentBody = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const ContentActions = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const UserInfo = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

const BlockActions = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};
