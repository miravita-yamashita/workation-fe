import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { FieldErrorIndicator } from "./field-error-indicator";

type FieldGenericCheckboxProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>;
  formInputName: Path<T>; // The input name
  labelText: string; // The field label text
  isFieldRequired?: boolean; // For additional UI that depends on the field being required like the asterisk
  handleChange?: (value: boolean) => void; // For additional logic to execute
  hideErrorMessage?: boolean;
  hideTick?: boolean; // For hiding the tick icon
  formItemClassName?: string;
  formCheckboxContainerClassName?: string;
  checkboxClassName?: string;
  isHighlighted?: boolean;
};

export function FieldGenericCheckbox<T extends FieldValues>({
  formHook,
  formInputName,
  labelText,
  handleChange,
  hideErrorMessage = false,
  hideTick = false,
  formItemClassName,
  formCheckboxContainerClassName,
  checkboxClassName,
  isHighlighted = true,
}: FieldGenericCheckboxProps<T>) {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field, fieldState }) => {
        const { invalid } = fieldState;

        return (
          <FormItem className={cn("", formItemClassName)}>
            <FormControl>
              {/* Make the entire container clickable */}
              <label
                htmlFor={String(formInputName)} // Link the label to the checkbox
                className={cn(
                  "flex cursor-pointer items-center gap-2 space-y-0 rounded border p-[.625rem]", // Add cursor-pointer to make it clickable
                  formCheckboxContainerClassName,
                  {
                    "border-yellow-100 bg-yellow-100":
                      field.value && isHighlighted,
                    "border-none": !field.value && !isHighlighted,
                  },
                )}
              >
                {/* Checkbox */}
                <Checkbox
                  id={String(formInputName)}
                  checked={field.value}
                  onCheckedChange={() => {
                    if (handleChange !== undefined) {
                      handleChange(!field.value);
                    }
                    field.onChange(!field.value);
                    field.onBlur(); // fix to trigger onBlur validation
                  }}
                  className={cn("", checkboxClassName, {
                    hidden: hideTick,
                    "border border-dark-550 bg-white": !isHighlighted,
                  })}
                />

                {/* Label text */}
                {!hideTick ? (
                  <span
                    className={cn(
                      "cursor-pointer font-normal leading-none text-black",
                      {
                        "font-bold text-coral-300":
                          field.value && isHighlighted,
                      },
                    )}
                  >
                    {labelText}
                  </span>
                ) : (
                  <FormLabel
                    htmlFor={String(field.name)}
                    className={cn("cursor-pointer leading-none text-black", {
                      "font-bold text-coral-300": field.value,
                    })}
                  >
                    {labelText}
                  </FormLabel>
                )}
              </label>
            </FormControl>

            {/* Error Message */}
            {!hideErrorMessage && invalid && (
              <FieldErrorIndicator
                formMessage={<FormMessage className="text-sm font-bold" />}
              />
            )}
          </FormItem>
        );
      }}
    />
  );
}
