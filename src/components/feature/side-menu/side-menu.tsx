import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import IconHexagon from "@public/icon-hexagon.svg";

export const SideMenu = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 top-0 w-[18.75rem] bg-shade-250",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SideMenuHeader = ({ className, children }: CommonProps) => {
  return <div className={cn("p-5", className)}>{children}</div>;
};

export const SideMenuTitle = ({ className, children }: CommonProps) => {
  return (
    <span className={cn("text-sm font-bold text-shade-650", className)}>
      {children}
    </span>
  );
};

export const SideMenuSubTitle = ({ className, children }: CommonProps) => {
  return (
    <span
      className={cn(
        "font-albertsans text-[.5rem] leading-normal tracking-[.05rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const SideMenuSection = ({ className, children }: CommonProps) => {
  return <div className={cn("px-5", className)}>{children}</div>;
};

export const SideMenuSectionTitle = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("text-shade-910 font-bold", className)}>{children}</div>
  );
};

export const SideMenuList = ({ className, children }: CommonProps) => {
  return <ul className={cn("", className)}>{children}</ul>;
};

export const SideMenuItem = ({ className, children }: CommonProps) => {
  return <li className={cn("font-bold", className)}>{children}</li>;
};

export const SideMenuIcon = ({ className }: CommonProps) => {
  return (
    <Image
      src={IconHexagon}
      alt="hexagon menu icon"
      width={16}
      height={16}
      className={cn("", className)}
    />
  );
};

export const SideMenuLink = ({
  className,
  children,
  path,
  isActive,
}: CommonProps & { path: string; isActive: boolean }) => {
  return (
    <Link
      href={path}
      className={cn("block w-full rounded-[.1875rem] px-5 py-2", className, {
        "bg-shade-250": isActive,
      })}
    >
      {children}
    </Link>
  );
};
export const SideMenuFooter = ({ className, children }: CommonProps) => {
  return <div className={cn("border-t px-5 py-4", className)}>{children}</div>;
};

