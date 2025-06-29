import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { AccordionContent } from "@radix-ui/react-accordion";

export const Filter = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn("overflow-hidden rounded-t-[.625rem] bg-white", className)}
    >
      {children}
    </div>
  );
};

export const FilterHeader = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-between bg-coral-250 px-5 py-2.5 text-base font-bold text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FilterSection = ({
  children,
  className,
  id,
}: CommonProps & {
  id?: string; // We will use this id for scrolling to the section via url
}) => {
  return (
    <div id={id} className={cn("", className)}>
      {children}
    </div>
  );
};

export const FilterSectionGroup = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("mb-1.5 flex w-full items-center gap-3", className)}>
      {children}
    </div>
  );
};

export const FilterSectionTitle = ({ children, className }: CommonProps) => {
  return (
    <span className={cn("shrink-0 text-base font-bold", className)}>
      {children}
    </span>
  );
};

export const FilterAccordion = ({
  children,
  className,
  values,
  setValues,
}: CommonProps & {
  values: string[];
  setValues: (values: string[]) => void;
}) => {
  return (
    <Accordion
      className={cn("space-y-[.375rem]", className)}
      type="multiple"
      value={values}
      onValueChange={setValues}
    >
      {children}
    </Accordion>
  );
};

export const FilterAccordionItem = ({
  children,
  className,
  value,
}: CommonProps & {
  value: string;
}) => {
  return (
    <AccordionItem className={cn("border-b-0", className)} value={value}>
      {children}
    </AccordionItem>
  );
};

export const FilterAccordionTrigger = ({
  children,
  className,
}: CommonProps) => {
  return (
    <AccordionTrigger
      className={cn(
        "rounded-[.3125rem] bg-[#FFF4F5] px-4 py-3 text-base font-medium hover:no-underline",
        className,
      )}
    >
      {children}
    </AccordionTrigger>
  );
};

export const FilterAccordionContent = ({
  children,
  className,
}: CommonProps) => {
  return (
    <AccordionContent className={cn("pt-1.5", className)}>
      {children}
    </AccordionContent>
  );
};

export const FilterGridBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("grid grid-cols-2 gap-1.5", className)}>{children}</div>
  );
};
