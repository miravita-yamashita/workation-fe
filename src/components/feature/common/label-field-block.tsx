import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

const labelBlockVariants = cva(
  "flex items-center shrink-0 font-yu-gothic font-bold",
  {
    variants: {
      variant: {
        default: "w-full",
        alternate:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        empty: "w-full bg-transparent hover:bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export const LabelBlock = ({
  children,
  className,
  variant = "default",
}: CommonProps & { variant?: "default" | "alternate" | "empty" }) => {
  return (
    <div className={cn(labelBlockVariants({ variant, className }))}>
      {children}
    </div>
  );
};

export const FieldBlock = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex-grow text-sm lg:px-5 lg:py-2.5", className)}>
      {children}
    </div>
  );
};

export const LabelFieldBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("font-open mb-2", className)}>{children}</div>;
};

export const FieldHorizontalRuleBlock = ({ className }: CommonProps) => {
  return <hr className={cn("h-[.0625rem] w-full", className)} />;
};
