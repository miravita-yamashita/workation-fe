"use client";

import { Button } from "@/components/ui/button";
import { CommonProps } from "@/lib/types";
import { cn, formatResponseError, genericAPICallHandler } from "@/lib/utils";
import Image from "next/image";
import IconCaret from "@public/icon-caret.svg";
import { toast } from "@/hooks/use-toast";
import { deleteSavedSearchFilter } from "./lib";
import { useRouter } from "next/navigation";
import { decrementEngagementCount } from "@/components/feature/engagement";
import { useState } from "react";

export const Preset = ({ className, children }: CommonProps) => {
  return (
    <div
      className={cn(
        "rounded-[.625rem] bg-white px-3.5 py-[1.875rem] text-sm leading-normal lg:p-[1.875rem]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PresetHeader = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-2.5 flex flex-row justify-between border-b border-shade-550 pb-1.5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PresetTitle = ({ children, className }: CommonProps) => {
  return (
    <span
      className={cn(
        "text-lg font-bold leading-normal lg:text-[1.25rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const PresetTitleBorder = ({ children, className }: CommonProps) => {
  return (
    <span
      className={cn(
        "lg:leading mb-2.5 border-l-[.3125rem] border-pink-200 pl-4 text-lg font-bold lg:mb-[1.875rem] lg:pl-5 lg:text-[1.375rem]",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const PresetScrollToBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center gap-2.5 text-sm font-medium text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PresetScrollToIcon = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("text-sm font-medium text-pink-200", className)}>
      {children || (
        <Image src={IconCaret} alt="scroll icon" width={5} height={5} />
      )}
    </div>
  );
};

export const PresetTextEmphasized = ({ children, className }: CommonProps) => {
  return <span className={cn("font-bold", className)}>{children}</span>;
};

export const PresetList = ({ children, className }: CommonProps) => {
  return <ul className={cn("mb-5", className)}>{children}</ul>;
};

export const PresetListItem = ({ children, className }: CommonProps) => {
  return (
    <li
      className={cn(
        "flex justify-between border-b border-dashed border-shade-550 p-2.5",
        className,
      )}
    >
      {children}
    </li>
  );
};

export const PresetCommonContent = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "grid w-full grid-cols-2 lg:grid-cols-[11.25rem_1fr]",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PresetButton = ({ children, className }: CommonProps) => {
  return (
    <Button
      size="auto"
      variant="form"
      className={cn(
        "flex w-full items-center gap-2.5 px-[3.125rem] py-4 text-base leading-none lg:max-w-[26.25rem]",
        className,
      )}
      asChild
    >
      {children}
    </Button>
  );
};

export const PresetButtonGhost = ({
  children,
  className,
  handleClick,
  isLoading,
}: CommonProps & { handleClick?: () => void; isLoading?: boolean }) => {
  return (
    <Button
      size="auto"
      variant="form"
      className={cn(
        "gap-[.3125rem] bg-white p-0 text-xs font-normal leading-normal",
        className,
      )}
      onClick={handleClick}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};

export const PresetActions = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex justify-end gap-5 text-xs leading-normal text-pink-200",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const PresetDelete = ({
  children,
  className,
  id,
}: CommonProps & {
  id: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Button
      type="button"
      variant="ghost"
      className={cn("p-0 font-bold underline hover:bg-transparent", className)}
      disabled={isLoading}
      onClick={async () => {
        setIsLoading(true);

        const response = await genericAPICallHandler(() =>
          deleteSavedSearchFilter(id),
        );

        setIsLoading(false);

        if (!response?.success) {
          toast({
            description: formatResponseError(
              response.message || "Unable to delete search condition.",
            ),
          });
          return;
        }
        decrementEngagementCount("savedSearch");
        router.refresh();
      }}
    >
      {children}
    </Button>
  );
};
