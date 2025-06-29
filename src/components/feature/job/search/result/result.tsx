"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { JobSearchParamKey } from "../filter";

export const Result = ({ className, children }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const ResultCount = ({ className, children }: CommonProps) => {
  return <div className={cn("text-xs", className)}>{children}</div>;
};

export const ResultTextEmphasized = ({ className, children }: CommonProps) => {
  return (
    <span
      className={cn(
        "text-[26px] font-bold leading-[24px] text-pink-200",
        className,
      )}
    >
      {children}
    </span>
  );
};

export const ResultPageSize = ({
  pageSize = "10",
  searchParams,
}: {
  pageSize: string;
  searchParams: string;
}) => {
  const router = useRouter();

  return (
    <Select
      defaultValue={pageSize}
      onValueChange={(value) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set(JobSearchParamKey.PageSize, value);
        router.push(`?${newSearchParams.toString()}`);
      }}
    >
      <SelectTrigger className="w-[11.25rem] font-medium">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="font-medium">
          <SelectItem value="10">10件</SelectItem>
          <SelectItem value="20">20件</SelectItem>
          <SelectItem value="30">30件</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export const ResultActions = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("flex flex-col gap-1.5 lg:flex-row", className)}>
      {children}
    </div>
  );
};

export const ResultButton = ({
  children,
  className,
  handleClick,
  isActive = false,
}: CommonProps & {
  handleClick?: () => void;
  isActive?: boolean;
}) => {
  return (
    <Button
      size="auto"
      variant="form"
      className={cn(
        "flex h-[2.375rem] w-full items-center gap-2.5 rounded-[.3125rem] text-sm leading-none lg:h-[2.5rem]",
        className,
        {
          "opacity-50": isActive,
        },
      )}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export const ResultList = ({ className, children }: CommonProps) => {
  return (
    <ul className={cn("flex flex-col gap-5 lg:gap-[1.875rem]", className)}>
      {children}
    </ul>
  );
};

export const ResultItem = ({ children, className }: CommonProps) => {
  return <li className={cn("", className)}>{children}</li>;
};
