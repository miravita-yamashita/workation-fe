"use client";

import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import { Table, TableItem } from "../common";
import { Button } from "@/components/ui/button";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const Info = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-col", className)}>{children}</div>;
};

export const InfoTable = ({ children, className }: CommonProps) => {
  return (
    <Table
      className={cn(
        "grid-cols-2 border border-t-0 border-none lg:grid-cols-[11.25rem_1fr]",
        className,
      )}
    >
      {children}
    </Table>
  );
};

export const InfoTableItem = ({ children, className }: CommonProps) => {
  return (
    <TableItem
      className={cn(
        "odd-border-0 border-b border-t-0 border-dashed px-[.875rem] py-[.625rem] lg:px-5 lg:py-[1rem]",
        className,
      )}
    >
      {children}
    </TableItem>
  );
};

export const ActionCallForAdvice = ({ children, className }: CommonProps) => {
  return (
    <a
      href="tel:+1234567890"
      className={cn(
        "flex items-center justify-center gap-[.625rem] rounded-full border-2 border-pink-200 bg-white",
        className,
      )}
    >
      {children}
    </a>
  );
};

export const ActionGoToForm = ({
  children,
  className = "",
  targetElementId = "",
}: CommonProps & {
  targetElementId?: string;
}) => {
  return (
    <Button
      onClick={() => {
        const formPanel = document.getElementById(targetElementId);
        if (formPanel) {
          formPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }}
      className={cn("flex bg-red-100", className)}
    >
      {children}
    </Button>
  );
};
