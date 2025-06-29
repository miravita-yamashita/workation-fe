import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Detail = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("border-b border-shade-360 pb-5", className)}>
      {children}
    </div>
  );
};

export const DetailTitle = ({ className, children }: CommonProps) => {
  return <p className={cn("text-base font-bold", className)}>{children}</p>;
};

export const DetailActions = ({ className, children }: CommonProps) => {
  return <div className={cn("flex gap-5", className)}>{children}</div>;
};

export const DetailContent = ({ className, children }: CommonProps) => {
  return <div className={cn("mt-5", className)}>{children}</div>;
};

export const DetailPreview = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("relative h-[3.75rem] w-[3.75rem] shrink-0", className)}>
      {children}
    </div>
  );
};

export const DetailAttributes = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("text-xs font-medium leading-normal", className)}>
      {children}
    </div>
  );
};
