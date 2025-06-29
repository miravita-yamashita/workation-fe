import { Button } from "@/components/ui/button";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import IconHexagon from "@public/icon-hexagon.svg";

export const QuickLink = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.3125rem] border border-shade-250 p-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const QuickLinkTitle = ({ className, children }: CommonProps) => {
  return <span className={cn("text-sm font-bold", className)}>{children}</span>;
};

export const QuickLinkButton = ({ className, children }: CommonProps) => {
  return (
    <Button
      size="auto"
      variant="admin"
      className={cn(
        "bg-red flex items-center justify-start bg-shade-210 px-5 py-3 font-medium text-black",
        className,
      )}
      asChild
    >
      {children}
    </Button>
  );
};

export const QuickLinkIcon = ({ className }: CommonProps) => {
  return (
    <Image
      src={IconHexagon}
      alt="hexagon quick link icon"
      width={24}
      height={24}
      className={cn("", className)}
    />
  );
};
