"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren, useEffect, useRef } from "react";
import IconXMark from "@public/icon-x-mark.svg";
import LadyArrow from "@public/lady-arrow.svg";
import IconCaret from "@public/icon-caret.svg";
import Image from "next/image";
import { isOverlapping, useOnboardingStore } from "./lib";
import Link from "next/link";
import OnboardingText from "@public/onboarding-text.svg";
import { MovieFilterParamKey } from "@/components/movie";
import { useOnboarding } from "./lib/use-onboarding";
import { EngagementStaticComposite } from "../engagement/engagement-composite";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const OnboardingCloseButton = ({
  children,
  className,
  handleClick,
}: CommonProps & {
  handleClick: () => void;
}) => {
  return (
    <Button
      className={cn(
        "hover:bg-whit z-20 flex h-[1.125rem] w-[1.125rem] min-w-max items-center rounded-full border border-red-100 bg-white p-0 lg:h-[1.75rem] lg:w-[1.75rem] lg:border-[.125rem]",
        className,
      )}
      variant="empty"
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export const OnboardingCircle = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "relative z-10 flex h-[5.375rem] w-[5.375rem] flex-col items-center justify-center rounded-full bg-red-100 leading-[1.125rem] text-white lg:h-[8.125rem] lg:w-[8.125rem] lg:text-[1.75rem] lg:leading-[1.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const OnboardingLady = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "absolute left-[-.625rem] top-1/2 z-20 -translate-y-1/2 transform lg:left-[-1.125rem] lg:mt-[.625rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const OnboardingFAQBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-row rounded-bl-[5.625rem] rounded-br-[.625rem] rounded-tl-[5.625rem] rounded-tr-[.625rem] bg-transparent shadow-[0_0_20px_0_#00000033]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const OnboardingList = ({ children, className }: CommonProps) => {
  return (
    <ul
      className={cn(
        "flex w-[15.625rem] flex-col rounded-br-[.625rem] rounded-tr-[.625rem] bg-white px-2.5 pb-3 pt-4 lg:w-[23.125rem] lg:p-5",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export const OnboardingListItem = ({ children, className }: CommonProps) => {
  return (
    <li
      className={cn(
        "mb-2 flex items-center justify-between border-b border-b-shade-250 pb-1.5 pl-1 pr-1 text-xs font-bold leading-[1.125rem] last:mb-0 lg:mb-6 lg:pl-2.5 lg:pr-2.5 lg:text-sm",
        className,
      )}
    >
      {children}
    </li>
  );
};

export const OnboardingListItemIcon = ({
  className,
  imageSource,
}: CommonProps & {
  imageSource?: string;
}) => {
  return (
    <div className={cn("relative h-[.625rem] w-[.3125rem]", className)}>
      <Image src={imageSource ? imageSource : IconCaret} alt="icon-caret" />
    </div>
  );
};

// The composites below are create so we can create similar components like in the footer
export const OnboardingCloseButtonComposite = ({
  isExpanded,
  handleClose,
}: {
  isExpanded: boolean;
  handleClose: () => void;
}) => {
  return (
    <OnboardingCloseButton
      className={cn("absolute right-0 top-[.625rem]", {
        "right-[-.3125rem] top-[-.3125rem] lg:right-[-.75rem] lg:top-[-.75rem]":
          isExpanded,
        "lg:top-[.625rem]": !isExpanded,
      })}
      handleClick={handleClose}
    >
      <div className="relative h-1.5 w-1.5 lg:h-2.5 lg:w-2.5">
        <Image src={IconXMark} alt="icon-close-mark" fill sizes="100%" />
      </div>
    </OnboardingCloseButton>
  );
};

export const OnboardingLadyComposite = ({
  isExpanded,
}: {
  isExpanded: boolean;
}) => {
  return (
    <OnboardingLady className={cn({ "lg:mt-[.625rem mt-1.5": isExpanded })}>
      <div className="relative h-[4.5625rem] w-[2.0625rem] lg:h-[6.9375rem] lg:w-[3.125rem]">
        <Image src={LadyArrow} alt="lady-arrow" fill sizes="100%" />
      </div>
    </OnboardingLady>
  );
};

export const OnboardingCollapsedComposite = ({
  setIsExpanded,
}: {
  setIsExpanded: (flag: boolean) => void;
}) => {
  return (
    <OnboardingCircle>
      <Button
        variant="empty"
        className="flex h-full flex-col items-center justify-center p-0 lg:text-[1.75rem] lg:leading-[1.75rem]"
        onClick={() => setIsExpanded(true)}
      >
        <div className="relative ml-1 mt-3.5 h-[2.375rem] w-[3.5rem] lg:ml-0 lg:mt-0 lg:h-[3.5rem] lg:w-[5.25rem]">
          <Image src={OnboardingText} alt="onboarding text" fill sizes="100%" />
        </div>
      </Button>
    </OnboardingCircle>
  );
};

export const OnboardingExpandedComposite = ({
  movieId,
}: {
  movieId: string;
}) => {
  return (
    <OnboardingFAQBlock>
      <OnboardingCircle className="h-auto w-[5rem] items-end rounded-br-none rounded-tr-none pr-[.3125rem] lg:h-auto lg:w-[7.625rem] lg:pr-[.5625rem]">
        <div className="relative h-[2.375rem] w-[3.5rem] lg:h-[3.5rem] lg:w-[5.25rem]">
          <Image src={OnboardingText} alt="onboarding text" fill sizes="100%" />
        </div>
      </OnboardingCircle>
      <OnboardingList>
        <OnboardingListItem>
          <Link
            href="/first-time/reason"
            className="flex w-full items-center justify-between"
          >
            ワーケーションナースが選ばれる理由
            <OnboardingListItemIcon />
          </Link>
        </OnboardingListItem>
        <OnboardingListItem>
          <Link
            href="/first-time/recruit"
            className="flex w-full items-center justify-between"
          >
            採用になりやすい理由
            <OnboardingListItemIcon />
          </Link>
        </OnboardingListItem>
        <OnboardingListItem>
          <Link
            href={`/movie?${MovieFilterParamKey.Categories}=${movieId ?? ""}`}
            className="flex w-full items-center justify-between"
          >
            ワーケーションナースの説明動画
          </Link>
          <OnboardingListItemIcon />
        </OnboardingListItem>
      </OnboardingList>
    </OnboardingFAQBlock>
  );
};

export const Onboarding = () => {
  const onboardingRef = useRef<HTMLDivElement>(null);
  const footerRef = useOnboardingStore.getState().footerRef;

  // Extract some logic
  const {
    isExpanded,
    setIsExpanded,
    isHidden,
    setIsHidden,
    isPermanentlyHidden,
    handleClose,
    explanatoryMovieId,
    hasCheckedCookie,
  } = useOnboarding();

  // Handle Onboarding when it is intersecting with the footer
  useEffect(() => {
    if (!onboardingRef.current || !footerRef.current) {
      return;
    }

    const handleScroll = () => {
      // Do nothing until we have checked the cookie
      if (hasCheckedCookie.current === false) return;

      setIsHidden(isOverlapping(onboardingRef, footerRef));
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [footerRef, hasCheckedCookie, setIsHidden]);

  // Handle first load wether to show or not
  useEffect(() => {
    if (isPermanentlyHidden || !isHidden) {
      setIsHidden(isOverlapping(onboardingRef, footerRef));
    }
  }, [isPermanentlyHidden, footerRef, isHidden, setIsHidden]);

  return (
    <div
      ref={onboardingRef}
      className={cn(
        "flex-end fixed bottom-0 z-30 flex w-full min-w-20 flex-col px-4 transition-opacity duration-300 ease-in lg:bottom-[1%] lg:right-4",
        {
          "opacity-0": isHidden,
        },
      )}
    >
      <div
        className={cn("relative hidden self-end", {
          block: !isHidden && !isPermanentlyHidden,
        })}
      >
        <OnboardingCloseButtonComposite
          isExpanded={isExpanded}
          handleClose={handleClose}
        />
        <OnboardingLadyComposite isExpanded={isExpanded} />
        {isExpanded ? (
          <OnboardingExpandedComposite movieId={explanatoryMovieId ?? ""} />
        ) : (
          <OnboardingCollapsedComposite setIsExpanded={setIsExpanded} />
        )}
      </div>

      <div className="pb-2.5 lg:hidden">
        <EngagementStaticComposite />
      </div>
    </div>
  );
};
