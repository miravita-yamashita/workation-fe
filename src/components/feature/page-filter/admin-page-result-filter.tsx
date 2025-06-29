"use client";

import {
  AdminSelectTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import { cn } from "@/lib/utils";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState } from "react";

type PageResultFilterProps = {
  className?: string;
  labelName?: string;
  selectDropdownValues?: { id: string; name: string }[]; // Updated to include both id and name
  paramKey?: string;
  labelStyles?: string;
};

export const AdminPageResultFilter = ({
  className,
  labelName,
  selectDropdownValues = [],
  paramKey = "category", // Default to 'category'
  labelStyles = "",
}: PageResultFilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Initialize selectedValue to be the category id from URL search params, or the first available id
  const [selectedValue, setSelectedValue] = useState<string>(
    searchParams.get(paramKey) || selectDropdownValues[0]?.id || "",
  );

  const handleSelectChange = (categoryId: string) => {
    // Set the selected value to the category ID
    setSelectedValue(categoryId);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", "1"); // Reset page to 1 on category change

    // Use queryStringBuilder to build the query string with the new category ID
    const builtQueryString = queryStringBuilder({
      queryString: newSearchParams.toString(),
      targetKey: paramKey,
      targetValue: categoryId,
    });

    // Update the URL with the new query string
    const newUrl = `${pathname}?${builtQueryString}`;
    router.push(newUrl);
  };

  return (
    <div className={cn("font-open flex items-center", className)}>
      <p className={cn("block whitespace-nowrap pr-4 text-sm", labelStyles)}>
        {labelName ? labelName : "カテゴリー"}
      </p>
      <div className="results-header-dropdown w-fit">
        <Select value={selectedValue} onValueChange={handleSelectChange}>
          <AdminSelectTrigger className="gap-[.375rem] border-none bg-white shadow-none">
            <SelectValue
              className="text-sm font-medium"
              placeholder={
                selectDropdownValues.find((item) => item.id === selectedValue)
                  ?.name || ""
              }
            />
          </AdminSelectTrigger>
          <SelectContent>
            {selectDropdownValues?.map((item) => (
              <SelectItem key={item.id} value={item.id} className="font-medium">
                {item.name}件
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
