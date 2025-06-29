"use client";

import { useEffect } from "react";

const useSmoothScroll = (): void => {
  useEffect(() => {
    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target as HTMLAnchorElement; // Cast to HTMLAnchorElement

      // Ensure the clicked target is an anchor link with a hash
      if (target.tagName === "A" && target.hash) {
        const targetElement = document.getElementById(target.hash.slice(1));

        if (targetElement) {
          event.preventDefault(); // Prevent default anchor behavior

          // Scroll to the target element with smooth scrolling
          smoothScroll(targetElement);
        }
      }
    };

    const smoothScroll = (targetElement: HTMLElement): void => {
      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      let startTime: number | null = null;

      const animation = (currentTime: number): void => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const scrollY = easeInOutQuad(
          timeElapsed,
          startPosition,
          distance,
          500,
        );

        window.scrollTo(0, scrollY);

        if (timeElapsed < 500) {
          requestAnimationFrame(animation);
        } else {
          window.scrollTo(0, targetPosition); // Ensure the final position is exactly correct
        }
      };

      requestAnimationFrame(animation);
    };

    // Easing function for smooth scrolling
    const easeInOutQuad = (
      t: number,
      b: number,
      c: number,
      d: number,
    ): number => {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    };

    // Attach event listener to the document
    document.addEventListener("click", handleAnchorClick);

    // Cleanup listener on component unmount
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);
};

export default useSmoothScroll;
