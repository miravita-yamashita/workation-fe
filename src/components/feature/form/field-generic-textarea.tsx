"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { FieldErrorIndicator } from "./field-error-indicator";
import { Textarea } from "@/components/ui/textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FieldGenericInputProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>; //the react hook form
  formInputName: Path<T>; //the input name
  placeholder?: string;
  labelText: string; //the field label text
  hideErrorMessage?: boolean;
  labelClassName?: string;
  textAreaClassName?: string;
  formItemClassName?: string;
  formLabelClassName?: string;
  isAdmin?: boolean;
};

export const FieldGenericTextArea = <T extends FieldValues>({
  formHook,
  formInputName,
  placeholder,
  labelText,
  hideErrorMessage = false,
  textAreaClassName,
  formItemClassName,
  formLabelClassName,
  isAdmin = false,
}: FieldGenericInputProps<T>) => {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        return (
          <FormItem className={cn("", formItemClassName)}>
            {labelText && (
              <FormLabel
                className={cn(
                  "shrink-0 text-sm text-black lg:text-base",
                  formLabelClassName,
                  {
                    "font-bold": isAdmin,
                  },
                )}
              >
                {labelText}
              </FormLabel>
            )}
            <div className="relative w-full">
              <FormControl>
                <Textarea
                  placeholder={placeholder}
                  className={cn(
                    "pr-8",
                    {
                      "border-red-250": invalid,
                      "border-red-300": invalid && isAdmin,
                    },
                    textAreaClassName,
                  )}
                  {...field}
                />
              </FormControl>
            </div>

            {!hideErrorMessage && invalid && !isAdmin && (
              <FieldErrorIndicator
                formMessage={
                  <FormMessage className="mt-2 text-sm font-bold leading-normal text-red-250" />
                }
              />
            )}
            {!hideErrorMessage && invalid && isAdmin && (
              <FormMessage className="text-sm font-normal leading-normal text-red-300" />
            )}
          </FormItem>
        );
      }}
    />
  );
};
