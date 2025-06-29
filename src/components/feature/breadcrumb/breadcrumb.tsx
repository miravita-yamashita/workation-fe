import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Breadcrumb = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-end py-1.5 lg:justify-normal lg:pt-0 lg:pb-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BreadcrumbList = ({ className, children }: CommonProps) => {
  return (
    <ul
      className={cn(
        "flex gap-1.5 text-[.5rem] font-medium leading-normal text-pink-200 lg:text-[.75rem]",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export const BreadcrumbItem = ({ className, children }: CommonProps) => {
  return (
    <li className={cn("breadcrumb-item last:text-shade-800", className)}>
      {children}
    </li>
  );
};
