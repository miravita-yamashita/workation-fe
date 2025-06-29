"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import IconCheckCircle from "@public/icon-check-circle.svg";
import {
  MediaImageType,
  setSelectedMediaSingle,
  useModalMediaUploadStore,
} from "./lib";
import { Button } from "@/components/ui/button";

export const GalleryTabs = ({
  className,
  children,
  defaultValue,
}: CommonProps & {
  defaultValue?: string;
}) => {
  return (
    <Tabs className={cn("w-full", className)} defaultValue={defaultValue}>
      {children}
    </Tabs>
  );
};

export const GalleryTabsList = ({ className, children }: CommonProps) => {
  return (
    <TabsList
      className={cn(
        "mb-2.5 h-auto w-full justify-start rounded-none border-b border-shade-360 bg-white p-0 px-5",
        className,
      )}
    >
      {children}
    </TabsList>
  );
};

export const GalleryTabsTrigger = ({
  className,
  children,
  value,
}: CommonProps & {
  value: string;
}) => {
  return (
    <TabsTrigger
      className={cn(
        "translate-y-[.125rem] border text-sm font-bold data-[state=active]:rounded-none data-[state=active]:rounded-tl-[.5rem] data-[state=active]:rounded-tr-[.5rem] data-[state=active]:border-b-0 data-[state=active]:border-shade-360 data-[state=active]:text-blue-400 data-[state=active]:shadow-none",
        className,
      )}
      value={value}
    >
      {children}
    </TabsTrigger>
  );
};

export const GalleryTabsContent = ({
  className,
  children,
  value,
}: CommonProps & { value: string }) => {
  return (
    <TabsContent value={value} className={cn("w-full", className)}>
      {children}
    </TabsContent>
  );
};

export const GalleryItems = ({ children, className }: CommonProps) => {
  return (
    <ul
      className={cn(
        "flex min-w-0 max-w-[53.125rem] flex-wrap gap-5",
        className,
      )}
    >
      {children}
    </ul>
  );
};

export const GalleryItem = ({ children }: CommonProps) => {
  return <li className="h-[9.125rem] w-[9.125rem] bg-shade-250">{children}</li>;
};

export const GalleryPreview = ({
  children,
  data,
  isDisabled = false,
}: CommonProps & {
  data: MediaImageType;
  isDisabled?: boolean;
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    const updatedValue = !isChecked;
    event.stopPropagation();
    (event.target as HTMLLabelElement).blur();

    // Update the selected media - one selected media at time
    setSelectedMediaSingle(updatedValue === false ? null : data);
  };

  // Handle the checkbox state - this will force only one checkbox to be checked at a time
  useEffect(() => {
    const unsubscribe = useModalMediaUploadStore.subscribe((state) => {
      setIsChecked(state.selectedMediaSingle?.id === data.id);
    });

    return unsubscribe;
  }, [data.id]);

  return (
    <>
      <Checkbox id={String(data.id)} className="hidden" checked={isChecked} />
      <label
        htmlFor="terms"
        tabIndex={0}
        className={cn(
          "relative block h-full w-full cursor-pointer bg-shade-250 focus:outline focus:outline-1",
          {
            "border-[.1875rem] border-blue-350": isChecked,
            "pointer-events-none cursor-auto opacity-50": isDisabled,
          },
        )}
        onClick={handleClick}
      >
        {children}
        <GalleryCheckedMark
          className={cn("", {
            block: isChecked,
          })}
        />
      </label>
    </>
  );
};

export const GalleryCheckedMark = ({ className }: CommonProps) => {
  return (
    <Image
      src={IconCheckCircle}
      alt="checked"
      width={20}
      height={20}
      className={cn("absolute right-2.5 top-2.5 hidden", className)}
    />
  );
};

export const GalleryButton = ({
  children,
  className,
  onClick,
  isLoading = false,
}: CommonProps & {
  onClick: () => void;
  isLoading?: boolean;
}) => {
  return (
    <Button
      type="button"
      variant="admin"
      className={cn(
        "flex h-10 w-[8.75rem] items-center rounded-[.1875rem] px-[2rem] py-0 text-sm",
        className,
      )}
      onClick={() => {
        onClick?.();
      }}
      disabled={isLoading}
    >
      {children}
    </Button>
  );
};
