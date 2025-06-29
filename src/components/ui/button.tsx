import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex rounded-full items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-red-100 text-primary-foreground hover:bg-red-100/50 rounded-[30px] text-xs font-bold md:leading-[18px]",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-transparent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        empty: "w-full bg-transparent hover:bg-transparent",
        form: "py-[.9375rem]  px-5 font-bold text-white rounded-[1.875rem] text-lg leading-none bg-red-100 lg:leading-normal",
        admin:
          "bg-blue-350 text-white rounded-[.1875rem] leading-normal font-bold",
        return:
          "min-w-[7.5rem] rounded-[.1875rem] bg-shade-250 text-black p-2.5 text-sm font-bold",
        remote:
          "min-w-[7.5rem] rounded-[.1875rem] bg-blue-350 text-white p-2.5 text-sm font-bold hover:bg-blue-350",
        toolbar: "!p-1.5 leading-none hover:bg-shade-150 rounded-none",
        "toolbar-popover":
          "max-h-[.9375rem] justify-start !p-0 font-inter text-xs leading-normal hover:bg-transparent",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-10 flex-1 text-lg font-bold md:h-[60px] md:text-xl md:leading-[30px]",
        xs: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
        auto: "h-auto lg:auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
