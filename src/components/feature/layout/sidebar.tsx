import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type SidebarProps = PropsWithChildren & {
  className?: string;
};

export const Sidebar = ({ children, className }: SidebarProps) => {
  return <aside className={cn("block", className)}>{children}</aside>;
};
