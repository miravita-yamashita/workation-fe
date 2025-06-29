import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const JobCard = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[.3125rem] border-t-[.3125rem] border-pink-200 bg-white px-3.5 py-[1.875rem] shadow-[0_0_16px_0_#D9AAB233] lg:px-[1.875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const JobCardThumbnail = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "relative mb-[1.25rem] h-[19.6875rem] w-[19.6875rem] lg:h-[200px] lg:w-[12.5rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const JobCardActions = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>
  );
};

export const JobCardTags = ({ className, children }: CommonProps) => {
  return <ul className={cn("flex flex-wrap gap-1", className)}>{children}</ul>;
};

export const JobCardTag = ({ className, children }: CommonProps) => {
  return (
    <li
      className={cn(
        "rounded-[.1875rem] border-[.0313rem] border-shade-550 px-1.5 py-1 text-[.625rem] font-medium leading-normal",
        className,
      )}
    >
      {children}
    </li>
  );
};

export const JobCardBadge = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.1875rem] bg-blue-300 px-1.5 py-0.5 text-[.625rem] font-bold leading-normal text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const JobCardTitle = ({ className, children }: CommonProps) => {
  return (
    <span
      className={cn(
        "block w-full overflow-hidden truncate text-base font-bold leading-normal lg:text-xl",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const JobCardMetadata = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-shade-550 pb-1.5 text-sm font-medium leading-normal",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const JobCardAttributes = ({ className, children }: CommonProps) => {
  return <ul className={cn("", className)}>{children}</ul>;
};

export const JobCardAttribute = ({ className, children }: CommonProps) => {
  return (
    <li
      className={cn(
        "grid grid-cols-[5rem_1fr] border-b border-dashed p-2.5 text-sm font-medium leading-normal",
        className,
      )}
    >
      {children}
    </li>
  );
};
