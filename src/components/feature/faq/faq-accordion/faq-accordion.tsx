"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFaqAccordion } from "./lib";

export const FAQAccordion = ({ children, className }: CommonProps) => {
  const { openItems, handleClick } = useFaqAccordion();

  return (
    <Accordion
      className={cn("space-y-[.625rem]", className)}
      type="multiple"
      value={openItems}
      onValueChange={async (value: string[]) => await handleClick(value)}
    >
      {children}
    </Accordion>
  );
};

export const FAQAccordionItem = ({
  children,
  className,
  value,
}: CommonProps & {
  value: string;
}) => {
  return (
    <AccordionItem
      className={cn(
        "rounded-[.625rem] border-[.125rem] border-[#F3F3F3] px-3.5 py-2.5 lg:px-[1.875rem]",
        className,
      )}
      value={value}
    >
      {children}
    </AccordionItem>
  );
};

export const FAQAccordionTrigger = ({ children, className }: CommonProps) => {
  return (
    <AccordionTrigger
      className={cn("p-0 text-base font-bold hover:no-underline", className)}
    >
      {children}
    </AccordionTrigger>
  );
};

export const FAQAccordionContent = ({ children, className }: CommonProps) => {
  return (
    <AccordionContent
      className={cn("mt-2.5 border-t border-dashed pt-2.5 text-sm", className)}
    >
      {children}
    </AccordionContent>
  );
};

export const FAQAccordionEmphasized = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "font-albertsans text-2xl font-bold leading-none text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FAQAccordionButton = ({ children, className }: CommonProps) => {
  return (
    <Button
      type="button"
      size="auto"
      asChild
      className={cn(
        "bg-red-100 px-[3.75rem] py-2.5 text-xs leading-normal",
        className,
      )}
    >
      {children}
    </Button>
  );
};

export const FAQAccordionCommonContent = ({
  children,
  className,
}: CommonProps) => {
  return (
    <div className={cn("flex items-start gap-2 lg:gap-4", className)}>
      {children}
    </div>
  );
};
