import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const RecommendedArticle = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("relative rounded-[.625rem] bg-coral-100", className)}>
      {children}
    </div>
  );
};

export const RecommendedArticleTitle = ({
  className,
  children,
}: CommonProps) => {
  return (
    <div
      className={cn(
        "font-albert-sans absolute left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-[30px] bg-white px-5 py-1.5 text-[10px] font-medium tracking-[20%] text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const RecommendedArticleHeading = ({
  className,
  children,
}: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const RecommendedArticleContent = ({
  className,
  children,
}: CommonProps) => {
  return (
    <div className={cn("px-2.5 py-[30px] lg:p-10", className)}>{children}</div>
  );
};
