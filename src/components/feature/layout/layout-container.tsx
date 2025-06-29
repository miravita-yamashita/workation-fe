import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type LayoutContainerProps = PropsWithChildren & {
  className?: string;
};

export const LayoutContainer = ({
  children,
  className,
}: LayoutContainerProps) => {
  return <section className={cn(`mx-auto`, className)}>{children}</section>;
};
