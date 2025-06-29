"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  AdminSelectTrigger,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { FieldErrorIndicator } from "./field-error-indicator";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { cva } from "class-variance-authority";

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

export type DropDownValuesType = {
  id: string | number;
  value?: string | number;
  label?: string | number;
  name?: string;
};

type FieldGenericSelectProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>; //the react hook form
  formInputName: Path<T>; //the input name
  currentValue?: PathValue<T, Path<T>>;
  labelText: string; //the field label text
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  isColumn?: boolean; // For layout purpose only, if true then label will be displayed on the left side of the input
  isModal?: boolean; // For styling purpose only like file label color
  dropdownValues: DropDownValuesType[]; // For dropdown values
  selectPlaceholder?: string; // For dropdown placeholder
  formItemClassName?: string;
  formLabelClassName?: string;
  selectTriggerClassName?: string;
  variant?: "default" | "secondary";
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  isAdmin?: boolean;
};
export const AdminFieldGenericSelect = <T extends FieldValues>({
  formHook,
  formInputName,
  currentValue,
  labelText,
  dropdownValues = [],
  selectPlaceholder = "",
  formItemClassName,
  formLabelClassName,
  selectTriggerClassName,
  isAdmin = false,
  isDisabled,
  onChange,
  variant = "default",
}: FieldGenericSelectProps<T>) => {
  const { trigger, setValue } = formHook;

  // #region field select setup for buttonless submission (no submit button)
  // Set the initial value when the component mounts or when currentValue changes
  useEffect(() => {
    if (currentValue !== undefined && currentValue !== null) {
      setValue(formInputName, currentValue);
    }
  }, [currentValue, formInputName, setValue]);
  // #endregion

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        // Handle the value change safely
        const handleChange = (value: PathValue<T, Path<T>>) => {
          // Use custom onChange behavior if provided
          if (onChange) {
            onChange(value);
          }

          // Set the value value from selected option
          setValue(formInputName, value);
        };

        return (
          <FormItem className={cn("", formItemClassName)}>
            {labelText && (
              <FormLabel
                className={cn(
                  "shrink-0 text-sm text-black lg:text-base",
                  formLabelClassName,
                )}
              >
                {labelText}
              </FormLabel>
            )}
            <div className="w-full space-y-[.5rem]">
              <Select
                disabled={isDisabled}
                onValueChange={handleChange}
                value={field.value}
              >
                <div className="relative w-full">
                  <FormControl>
                    <AdminSelectTrigger
                      className={cn(
                        "border-[.0625rem] shadow-none focus:border-blue-350 focus:ring-blue-350 focus-visible:ring-1",
                        {
                          "border border-red-300": invalid,
                        },
                        selectTriggerClassName,
                        inputVariants({ variant }),
                      )}
                    >
                      <SelectValue placeholder={selectPlaceholder} />
                    </AdminSelectTrigger>
                  </FormControl>
                  {invalid && (
                    <FieldErrorIndicator
                      formMessage={
                        <FormMessage
                          className={cn("mt-2 text-sm font-bold", {
                            "text-sm font-normal leading-normal text-red-300":
                              variant === "secondary",
                          })}
                        />
                      }
                      isAdmin={isAdmin}
                    />
                  )}
                </div>

                <SelectContent
                  onCloseAutoFocus={async () => {
                    await trigger(formInputName);
                  }}
                >
                  <SelectGroup className="max-h-[10rem] overflow-y-auto">
                    {dropdownValues.map((item, index) => {
                      const { id, label, name } = item;
                      // Ensure a fallback for missing 'id' (use label or index)
                      const uniqueId = id ?? label ?? index;

                      return (
                        <SelectItem key={uniqueId} value={uniqueId.toString()}>
                          {label || name}
                        </SelectItem>
                      );
                    })}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {!isAdmin && <FormMessage />}
            </div>
          </FormItem>
        );
      }}
    />
  );
};
