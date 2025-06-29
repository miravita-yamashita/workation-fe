import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const DetailPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[.625rem] bg-white px-3.5 py-10 lg:px-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <h3
      className={cn(
        "mb-5 text-center text-[1.375rem] font-bold leading-normal text-pink-200 lg:mb-5 lg:text-[1.75rem]",
        className,
      )}
    >
      {children}
    </h3>
  );
};
export const DetailPanelLabelGroup = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("mb-1.5 flex w-full items-center gap-3", className)}>
      {children}
    </div>
  );
};

export const DetailPanelLabel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "shrink-0 text-base font-bold leading-normal text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const DetailPanelLine = ({ className }: CommonProps) => {
  return <hr className={cn("h-[.0625rem] w-full", className)} />;
};

export const DetailPanelValue = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("whitespace-pre-line text-lg font-medium", className)}>
      {children}
    </div>
  );
};

export const DetailPanelInfo = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("mb-5 space-y-[1.25rem]", className)}>{children}</div>
  );
};

export const DetailPanelAction = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between gap-2.5 lg:flex-row",
        className,
      )}
    >
      {children}
    </div>
  );
};
