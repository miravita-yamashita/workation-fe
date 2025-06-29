"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { FieldErrorIndicator } from "./field-error-indicator";
import { FieldTogglePassword } from "./field-toggle-password";
import { useState } from "react";
import { FieldValues, UseFormReturn, Path } from "react-hook-form";
import { ImageBlock } from "../common";
import IconSearch from "@public/icon-search.svg";
import Image from "next/image";
import { cva } from "class-variance-authority";
import IconAdminSearch from "@public/icon-admin-search.svg";

const inputVariants = cva("", {
  variants: {
    variant: {
      default: "",
      secondary: "rounded-[5px] px-[1rem] py-[.75rem] h-auto",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type FieldGenericInputProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>; //the react hook form
  formInputName: Path<T>; //the input name
  labelText: string; //the field label text
  isPasswordField?: boolean; // For password field, we will use this to show hide the password
  isSearchField?: boolean; // For search field, we will use this to show the search icon
  fieldType?: "text" | "password" | "number";
  hideErrorMessage?: boolean;
  onChange?: (value: string) => void;
  formLabelClassName?: string;
  formItemClassName?: string;
  formInputClassName?: string;
  maxLength?: number;
  placeholder?: string;
  onBlur?: () => void;
  variant?: "default" | "secondary";
  isAdmin?: boolean;
  isReadOnly?: boolean;
  disabled?: boolean;
};

export const FieldGenericInput = <T extends FieldValues>({
  formHook,
  formInputName,
  labelText,
  isPasswordField = false,
  isSearchField = false,
  fieldType = "text",
  hideErrorMessage = false,
  onChange,
  formLabelClassName,
  formItemClassName,
  formInputClassName,
  maxLength,
  placeholder = "",
  onBlur,
  variant = "default",
  isAdmin = false,
  isReadOnly = false,
  disabled,
}: FieldGenericInputProps<T>) => {
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const handlePasswordShow = () => {
    setIsPasswordShow(!isPasswordShow);
  };
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        const handleInputChange = (
          event: React.ChangeEvent<HTMLInputElement>,
        ) => {
          const value = event.target.value;
          if (onChange) {
            onChange(value);
          }
          field.onChange(value);
        };

        return (
          <FormItem
            className={cn("relative", formItemClassName)}
            onBlur={() => {
              // fix to trigger onBlur validation
              field.onBlur();
            }}
          >
            {labelText && (
              <FormLabel
                className={cn(
                  "font-open shrink-0 text-black",
                  formLabelClassName,
                )}
              >
                {labelText}
              </FormLabel>
            )}
            {/* Search icon */}
            {isSearchField && (
              <div className="absolute left-[100%] top-1/2 block translate-x-[-2.5rem] translate-y-[-50%] transform">
                <ImageBlock className="icon-search h-4 w-4">
                  <Image
                    src={variant === "secondary" ? IconAdminSearch : IconSearch}
                    alt="search"
                    fill
                  />
                </ImageBlock>
              </div>
            )}
            <div className="relative w-full">
              <FormControl>
                <Input
                  disabled={disabled}
                  readOnly={isReadOnly}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  {...field}
                  className={cn(
                    "placeholder:text-[#B3B3B3]",

                    {
                      "border-red-250": invalid && variant === "default",
                      "border-red-300": invalid && variant === "secondary",
                      "pr-14": isPasswordField && invalid,
                      "pr-8": isPasswordField && !invalid,
                      "bg-shade-150 text-shade-650": isReadOnly,
                      "focus-visible:ring-blue-350": isAdmin,
                    },
                    formInputClassName,
                    inputVariants({ variant }),
                  )}
                  type={
                    !isPasswordField
                      ? fieldType
                      : isPasswordShow
                        ? "text"
                        : "password"
                  }
                  onChange={handleInputChange}
                  onBlur={onBlur}
                />
              </FormControl>

              {isPasswordField && (
                <FieldTogglePassword
                  handlePasswordShow={handlePasswordShow}
                  isPasswordShow={isPasswordShow}
                />
              )}
            </div>
            {/* error message for normal page */}
            {!hideErrorMessage && invalid && (
              <FieldErrorIndicator
                formMessage={
                  <FormMessage
                    className={cn("text-sm font-bold", {
                      "text-sm font-normal leading-normal text-red-300":
                        variant === "secondary",
                    })}
                  />
                }
                isAdmin={isAdmin}
              />
            )}
          </FormItem>
        );
      }}
    />
  );
};
