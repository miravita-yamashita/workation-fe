import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FormStep = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "w-full overflow-hidden rounded-[.625rem] lg:max-w-[18.75rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FormStepList = ({ children, className }: CommonProps) => {
  return (
    <ul className={cn("flex flex-col bg-white", className)}>{children}</ul>
  );
};

export const FormStepListItem = ({ children, className }: CommonProps) => {
  return (
    <li
      className={cn(
        "flex gap-5 border-b border-dashed px-[1.875rem] py-[1.25rem] text-lg font-bold leading-normal last:border-b-0",
        className,
      )}
    >
      {children}
    </li>
  );
};

export const FormStepListBullet = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "albertsans text-lg font-medium leading-normal text-pink-200",
        className,
      )}
    >
      {children}
    </p>
  );
};
