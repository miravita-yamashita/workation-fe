import { MedicalSubject } from "@/components/top/lib";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "md";
  categories: MedicalSubject[];
}

export const RecruitmentCategories = ({
  className = "",
  size,
  categories,
}: Props) => {
  const renderInfo = ({ id, name }: { id: string; name: string }) => {
    if (!id) return null;

    return (
      <div
        key={id}
        className={cn(
          "rounded-[.1875rem] border border-[#D9D9D9] px-[.375rem] py-1 font-medium text-black",
          {
            "text-[.5rem] leading-3": !size,
            "text-[.625rem] leading-[.9375rem]": size === "md",
          },
          className,
        )}
      >
        {name}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap gap-1 md:mb-[.375rem]">
      {categories?.map((item) => renderInfo(item))}
    </div>
  );
};
