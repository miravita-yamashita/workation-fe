import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const RecommendedCard = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "w-full max-w-[20.1875rem] overflow-hidden rounded-[.625rem] lg:max-w-[18.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecommendedCardImage = ({ className, children }: CommonProps) => {
  return <div className={cn("relative", className)}>{children}</div>;
};

export const RecommendedCardTitle = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "line-clamp-1 rounded-[.1875rem] bg-red-100 px-1.5 py-0.5 text-xs font-bold text-white",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecommendedCardDescription = ({
  className,
  children,
}: CommonProps) => {
  // text-shadow-white did not work manually adding the styles
  return (
    <span
      className={cn(
        "line-clamp-1 w-full text-center text-[1.75rem] font-bold text-red-100 [text-shadow:-1px_0_white,0_1px_white,1px_0_white,0_-1px_white]",
        className,
      )}
    >
      {children}
    </span>
  );
};
