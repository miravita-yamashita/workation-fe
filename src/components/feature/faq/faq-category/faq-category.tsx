import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FAQCategory = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const FAQCategoryList = ({ children, className }: CommonProps) => {
  return (
    <ul
      className={cn(
        "grid grid-cols-1 gap-2.5 text-base lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export const FAQCategoryItem = ({ children, className }: CommonProps) => {
  return (
    <li
      className={cn(
        "flex w-full items-center rounded-[.625rem] bg-coral-100 px-5 py-2.5 font-bold",
        className,
      )}
    >
      {children}
    </li>
  );
};

export const FAQCategoryBullet = ({ className }: CommonProps) => {
  return (
    <span
      className={cn(
        "font-albertsans text-xl leading-none text-pink-200",
        className,
      )}
    >
      ・
    </span>
  );
};
