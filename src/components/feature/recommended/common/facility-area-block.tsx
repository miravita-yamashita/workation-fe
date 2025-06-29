import { cn } from "@/lib/utils";
import markerIcon from "@public/icon-marker.svg";
import Image from "next/image";

interface Props {
  className?: string;
  size?: "md";
  facility: string;
  area: string;
}

export const FacilityAreaBlock = ({
  className = "",
  size,
  facility,
  area,
}: Props) => {
  return (
    <div
      className={cn(
        "mb-[.375rem] flex items-center justify-between gap-4 border-b border-[#D9D9D9] pb-[.375rem] font-medium text-black",
        {
          "text-[.625rem] leading-[1.125rem] md:text-xs": !size,
          "text-xs leading-[1.125rem] md:text-sm md:leading-[1.3125rem]":
            size === "md",
        },
        className,
      )}
    >
      <span>{facility}</span>
      <div className="flex items-center gap-[.375rem]">
        <div className="relative h-[.9375rem] w-[.75rem] md:h-[1.125rem] md:w-[.875rem]">
          <Image src={markerIcon} alt="marker icon" priority={true} />
        </div>
        <span>{area}</span>
      </div>
    </div>
  );
};
