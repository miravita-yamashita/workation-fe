"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";
import Image from "next/image";
import IconSearchWhite from "@public/icon-search-white.svg";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { searchFormSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericInput } from "@components/feature/form";
import { useRouter, useSearchParams } from "next/navigation";
import { FAQSearchParamKey } from "./lib/types";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const SearchForm = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SearchFormHeader = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "mb-3 flex items-center gap-3 text-base font-bold",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const SearchFormSubText = ({ children, className }: CommonProps) => {
  return <p className={cn("text-xs leading-5", className)}>{children}</p>;
};

export const SearchFormButton = ({
  children,
  className,
  icon,
}: CommonProps & {
  icon?: React.ReactNode;
}) => {
  return (
    <Button
      className={cn(
        "flex h-auto w-auto min-w-max items-center gap-2 bg-pink-200 px-[18px] py-3 text-sm leading-none text-white md:leading-[.875rem]",
        className,
      )}
    >
      {children}
      {icon ? (
        icon
      ) : (
        <div className="relative h-4 w-4">
          <Image src={IconSearchWhite} alt="search icon" />
        </div>
      )}
    </Button>
  );
};

export const SearchFormBody = ({ className }: CommonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: searchParams.get(FAQSearchParamKey.Search) || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    if (!values.searchTerm.trim()) return;

    router.push(
      `/recruit-conform?${FAQSearchParamKey.Search}=${values.searchTerm}`,
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("mb-2.5 flex gap-2.5", className)}
      >
        <FieldGenericInput
          formHook={form}
          formInputName="searchTerm"
          labelText=""
          placeholder="例：テキスト"
          formItemClassName="border-shade-550 space-y-0 w-full"
          formInputClassName="placeholder:text-[#B3B3B3] max-h-[2.5rem] py-[.75rem] px-4 h-auto leading-none"
        />

        <SearchFormButton className="leading-normal">検索</SearchFormButton>
      </form>
    </Form>
  );
};
