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

export function FieldMultipleCheckbox<T extends FieldValues>({
  formHook,
  formInputName,
  items,
  hideTick = false,
  onChange,
  className = "",
  disabled = false, // Default disabled is false
}: FieldMultipleCheckboxProps<T>) {
  const handleContainerClick = (e: React.MouseEvent, itemId: string) => {
    if (e.target instanceof HTMLInputElement) return;
    const isChecked = formHook.getValues(formInputName)?.includes(itemId);
    const newValue = isChecked
      ? formHook
          .getValues(formInputName)
          .filter((value: string) => value !== itemId)
      : [...formHook.getValues(formInputName), itemId];

    formHook.setValue(formInputName, newValue);
    if (onChange) onChange();
  };

  return (
    <FormField
      control={formHook.control}
      name={formInputName}
      render={({ field }) => (
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
                "flex cursor-pointer items-center gap-2 space-y-0 rounded border p-[.625rem]",
                field.value?.includes(item.id)
                  ? "border-yellow-100 bg-yellow-100"
                  : "border-shade-550",
                hideTick ? "relative" : "",
              )}
              onClick={(e) => handleContainerClick(e, item.id)} // Make the entire container clickable
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
                    "",
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
                    "line-clamp-1 font-bold leading-none",
                    field.value?.includes(item.id)
                      ? "text-coral-300"
                      : "text-black",
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
                    "line-clamp-1 font-bold leading-none",
                    field.value?.includes(item.id)
                      ? "text-coral-300"
                      : "text-black",
                    disabled ? "text-gray-400" : "", // Add styling for disabled state
                  )}
                >
                  {item.name}
                </FormLabel>
              )}
            </FormItem>
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
