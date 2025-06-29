import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, getUniqueId } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

export type FieldMultipleCheckboxProps<T extends FieldValues> = {
  formHook: UseFormReturn<T>; // the react hook form
  formInputName: Path<T>; // the input name
  items: {
    id: string;
    name: string;
  }[];
  hideTick?: boolean;
  onChange?: () => void;
  className?: string;
  disabled?: boolean; // Added disabled prop
};

export function FieldMultipleCheckboxAdmin<T extends FieldValues>({
  formHook,
  formInputName,
  items,
  hideTick = false,
  onChange,
  className = "",
  disabled = false, // Default disabled is false
}: FieldMultipleCheckboxProps<T>) {
  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => (
        <>
          <FormItem
            className={cn(
              "grid grid-cols-2 items-center gap-2 space-y-0",
              className,
            )}
          >
            {items?.map((item) => (
              <FormItem
                key={getUniqueId()}
                className={cn(
                  "flex items-center gap-2 space-y-0 rounded p-[.625rem] pl-0",
                  field.value?.includes(item.id) ? "" : "",
                  hideTick ? "relative" : "",
                )}
              >
                <FormControl>
                  <Checkbox
                    id={String(item.id)}
                    checked={field.value?.includes(item.id)}
                    onCheckedChange={(checked) => {
                      // Trigger onChange callback
                      if (onChange) {
                        onChange();
                      }

                      const newValue = checked
                        ? [...field.value, item.id]
                        : field.value?.filter(
                            (value: string) => value !== item.id,
                          );
                      formHook.setValue(formInputName, newValue); // Update form field value
                    }}
                    className={cn(
                      "data-[state=checked]:bg-black",
                      hideTick
                        ? "absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        : "",
                    )}
                    disabled={disabled} // Disable checkbox if disabled is true
                  />
                </FormControl>

                {!hideTick ? (
                  <span
                    className={cn(
                      "line-clamp-1 leading-none",
                      field.value?.includes(item.id) ? "" : "text-black",
                      disabled ? "text-gray-400" : "", // Add styling for disabled state
                    )}
                  >
                    {item.name}
                  </span>
                ) : (
                  // Otherwise, render the interactive label
                  <FormLabel
                    htmlFor={String(item.id)}
                    className={cn(
                      "line-clamp-1 leading-none",
                      field.value?.includes(item.id) ? "" : "text-black",
                      disabled ? "text-gray-400" : "", // Add styling for disabled state
                    )}
                  >
                    {item.name}
                  </FormLabel>
                )}
              </FormItem>
            ))}
          </FormItem>
          <FormMessage className="mt-2 text-sm font-normal leading-normal text-red-300" />
        </>
      )}
    />
  );
}
