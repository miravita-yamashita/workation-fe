import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Section = ({ className, children }: CommonProps) => {
  return <section className={cn("px-5 py-3.5", className)}>{children}</section>;
};

export const SectionTitle = ({ className, children }: CommonProps) => {
  return <p className={cn("text-base font-bold", className)}>{children}</p>;
};

export const SectionRichText = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "m-5 max-w-[45.625rem] rounded-[.5rem] bg-shade-210 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
};