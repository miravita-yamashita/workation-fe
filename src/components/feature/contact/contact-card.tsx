import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const ContactCard = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2.5 px-3.5 py-5 lg:gap-5 lg:px-10 lg:py-0",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const ContactCardImage = ({
  className,
  image,
}: CommonProps & {
  image: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative h-[8.75rem] w-[8.75rem] overflow-hidden rounded-full bg-slate-100",
        className,
      )}
    >
      {image}
    </div>
  );
};

export const ContactCardTitle = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "flex flex-col text-center text-base font-bold leading-[1.5rem] lg:text-base",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const ContactCardTitleEmphasized = ({
  children,
  className,
}: CommonProps) => {
  return (
    <span
      className={cn(
        "text-2xl lg:text-[1.625rem] lg:leading-[1.5rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const ContactCardDescription = ({
  children,
  className,
}: CommonProps) => {
  return (
    <p className={cn("text-sm leading-[.875rem]", className)}>{children}</p>
  );
};

export const ContactCardRedirect = ({
  className,
  link,
}: CommonProps & {
  link: React.ReactNode;
}) => {
  return (
    <Button
      className={cn(
        "flex h-[3.125rem] w-full items-center px-10 py-3 text-base font-normal leading-[1.75rem] text-white lg:h-[3.75rem] lg:text-xl lg:font-bold lg:leading-[1.625rem]",
        className,
      )}
      asChild
    >
      {link}
    </Button>
  );
};
