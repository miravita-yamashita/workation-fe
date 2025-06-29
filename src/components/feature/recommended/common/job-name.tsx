import { cn } from "@/lib/utils";

interface Props {
  name: string;
  className?: string;
  size?: "md";
}

export const JobName = ({ name, className = "", size }: Props) => {
  if (size === "md") {
    return (
      <h2
        className={cn(
          "pb-1 text-base font-bold text-black lg:text-xl lg:leading-[1.875rem]",
          {},
          className,
        )}
      >
        {name}
      </h2>
    );
  }
  return (
    <h3
      className={cn(
        "line-clamp-1 text-sm font-bold leading-[1.3125rem] text-black md:mb-1 md:text-base md:leading-6",
        {},
        className,
      )}
    >
      {name}
    </h3>
  );
};
