import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FormPanel = ({ children, className }: CommonProps) => {
  return (
    <div
      id="form-panel"
      className={cn(
        "w-full overflow-hidden rounded-[.625rem] bg-white px-10 py-10",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FormPanelTitle = ({ children, className }: CommonProps) => {
  return (
    <h3
      className={cn(
        "text-center text-[1.375rem] font-bold leading-normal text-pink-200 lg:mb-5 lg:text-[1.75rem]",
        className,
      )}
    >
      {children}
    </h3>
  );
};
