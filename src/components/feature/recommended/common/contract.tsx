import { ContractCategories } from "@/components/top/lib";
import { cn } from "@/lib/utils";

interface Props {
  salary?: string;
  className?: string;
  size?: "md";
  contractType: ContractCategories;
}

export const Contract = ({
  className = "",
  size,
  contractType,
  salary,
}: Props) => {
  return (
    <div className="flex gap-1">
      {salary && (
        <div
          className={cn(
            "mb-[.375rem] rounded-[.1875rem] bg-blue-300 px-[0.625rem] py-[.125rem] font-bold text-white",
            {
              "text-[.5rem] leading-3": !size,
              "text-[.625rem] leading-[.9375rem]": size === "md",
            },
            className,
          )}
        >
          {salary}
        </div>
      )}
      {contractType && (
        <div
          className={cn(
            "mb-[.375rem] rounded-[.1875rem] bg-blue-300 px-[0.625rem] py-[.125rem] font-bold text-white",
            {
              "text-[.5rem] leading-3": !size,
              "text-[.625rem] leading-[.9375rem]": size === "md",
            },
            className,
          )}
        >
          {contractType.name}
        </div>
      )}
    </div>
  );
};
