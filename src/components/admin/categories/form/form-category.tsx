"use client";

import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import {
  FieldGenericInput,
  FieldLabel,
  useFormInteraction,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS, subCategoryFormSchema, useFormCategory } from "./lib";
import IconAdd from "@public/icon-add.svg";
import Image from "next/image";
import { FieldGenericSelect } from "@/components/feature/form/field-generic-select";
import { GetSubCategoryResponseType } from "../detail";

type FormCategoryProps = {
  className?: string;
  isEditMode?: boolean;
  info?: GetSubCategoryResponseType["data"];
  parentCategoryId?: string;
};

export const FormCategory = ({
  className,
  isEditMode = false,
  info,
  parentCategoryId,
}: FormCategoryProps) => {
  const form = useForm<z.infer<typeof subCategoryFormSchema>>({
    resolver: zodResolver(subCategoryFormSchema),
    mode: "onBlur",
    reValidateMode: "onBlur",
    defaultValues: {
      id: info?.id || "",
      status:
        info?.status === "公開" // BE returns this string status
          ? STATUS_OPTIONS[1].value
          : STATUS_OPTIONS[0].value,
      subCategoryName: info?.name || "",
      subCategoryItems: info?.items || [],
    },
  });

  const { formRef, setIsLoading } = useFormInteraction((state) => state);

  // Extract some logic
  const {
    subCategoryItems,
    removeSubCategoryItem,
    appendSubCategoryItem,
    onSubmit,
  } = useFormCategory({
    form,
    isEditMode,
    info,
    parentCategoryId,
    setIsLoading,
  });

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "mb-2.5 flex max-w-[31.875rem] flex-col gap-5",
          className,
        )}
      >
        <FieldGenericInput
          formHook={form}
          formInputName="id"
          labelText="ID"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full max-w-[22.1875rem]"
          formLabelClassName="font-bold"
          isReadOnly={true}
        />
        <FieldGenericSelect
          formHook={form}
          formInputName="status"
          labelText="ステータス"
          selectPlaceholder="選択"
          variant="secondary"
          dropdownValues={STATUS_OPTIONS}
          formLabelClassName="font-bold"
          selectTriggerClassName="border-shade-250 h-full  [&>svg]:text-black"
        />
        <FieldGenericInput
          formHook={form}
          formInputName="subCategoryName"
          labelText="カテゴリー名"
          placeholder=""
          variant="secondary"
          formItemClassName="w-full"
          formLabelClassName="font-bold"
          isAdmin={true}
        />
        <section>
          <FieldLabel className="text-base font-bold">項目</FieldLabel>
          <section className="mb-2.5 flex flex-col gap-2.5">
            {subCategoryItems.map((subCategoryItem, index) => {
              return (
                <div
                  key={subCategoryItem.id}
                  className="flex items-center justify-between gap-3"
                >
                  <FieldGenericInput
                    key={subCategoryItem.id}
                    formHook={form}
                    formInputName={`subCategoryItems.${index}.name`}
                    labelText=""
                    placeholder=""
                    variant="secondary"
                    formItemClassName="w-full"
                  />
                  <Button
                    variant="ghost"
                    type="button"
                    className="p-0 font-bold text-red-350 hover:bg-transparent"
                    onClick={() => {
                      removeSubCategoryItem(index);
                    }}
                  >
                    削除
                  </Button>
                </div>
              );
            })}
          </section>
          <Button
            variant="admin"
            size="auto"
            type="button"
            className="gap-2.5 bg-blue-350 px-5 py-1 text-sm"
            onClick={() => {
              appendSubCategoryItem({ id: "", name: "" });
            }}
          >
            追加
            <Image src={IconAdd} alt="Add" width={8} height={8} />
          </Button>
        </section>
      </form>
    </Form>
  );
};
