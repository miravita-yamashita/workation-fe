import { cn } from "@/lib/utils";

export const SectionHeading = ({
  title,
  className,
}: {
  title: string;
  className?: string;
}) => {
  return (
    <div className={cn("relative mb-3", className)}>
      <h2 className="relative z-10 inline-block bg-white pr-4 text-base font-bold">
        {title}
      </h2>
      <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 transform bg-[#dddddd]"></div>
    </div>
  );
};
