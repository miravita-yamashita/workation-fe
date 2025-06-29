import { cn } from "@/lib/utils";

type CommonProps = {
  className?: string;
  children?: React.ReactNode;
};

export const SearchTag = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const SearchTagHeader = ({ children, className }: CommonProps) => {
  return (
    <p
      className={cn(
        "mb-5 bg-coral-250 px-4 py-1 text-center font-bold text-pink-200",
        className,
      )}
    >
      {children}
    </p>
  );
};

export const SearchTagList = ({ children, className }: CommonProps) => {
  return (
    <ul className={cn("flex flex-wrap gap-1.5", className)}>{children}</ul>
  );
};

export const SearchTagItem = ({ children, className }: CommonProps) => {
  return (
    <li
      className={cn(
        "bg-yellow-500 px-[0.4375rem] py-0.5 text-sm font-medium",
        className,
      )}
    >
      {children}
    </li>
  );
};
