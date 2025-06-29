import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const Engagement = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "fixed right-0 top-[5.625rem] hidden flex-col gap-5 lg:flex",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const EngagementItem = ({
  className,
  children,
  link,
}: CommonProps & { link: string }) => {
  return (
    <Button
      className={cn(
        "flex h-auto min-w-0 flex-col gap-2.5 rounded-bl-[.3125rem] rounded-br-none rounded-tl-[.3125rem] rounded-tr-none bg-red-100 px-4 py-5 text-sm font-bold leading-[1rem] text-white hover:bg-red-100",
        className,
      )}
      asChild
    >
      <Link href={link}>{children}</Link>
    </Button>
  );
};

export const EngagementLabel = ({ className, children }: CommonProps) => {
  return (
    <p className={cn("tracking-[0.2em] [writing-mode:vertical-lr]", className)}>
      {children}
    </p>
  );
};

export const EngagementCount = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex h-6 w-6 items-center justify-center rounded-full bg-white font-albertsans text-xs leading-5 text-red-100",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const EngagementSubNote = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "w-full text-right text-[.625rem] font-medium leading-[1.25rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const EngagementInfo = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center gap-[.1875rem] rounded-[.1875rem] bg-red-100 px-2.5 py-[.1875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const EngagementInfoCount = ({ className, children }: CommonProps) => {
  return (
    <p
      className={cn(
        "font-albertsans text-xs font-bold leading-[.875rem] text-white underline",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const EngagementInfoLabel = ({ className, children }: CommonProps) => {
  return (
    <p
      className={cn(
        "font-albertsans text-xs font-bold leading-[.875rem] text-white",
        className,
      )}
    >
      {children}
    </p>
  );
};
