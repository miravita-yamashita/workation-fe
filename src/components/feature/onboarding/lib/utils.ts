import { RefObject } from "react";

export const isOverlapping = (
  onboardingRect: RefObject<HTMLDivElement | null>,
  footerRect: RefObject<HTMLDivElement | null>,
): boolean => {
  if (!onboardingRect.current || !footerRect.current) {
    return false;
  }

  return (
    onboardingRect.current.getBoundingClientRect().bottom >
    footerRect.current.getBoundingClientRect().top
  );
};
