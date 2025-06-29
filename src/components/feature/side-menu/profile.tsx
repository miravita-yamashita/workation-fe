import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const ProfileAvatar = ({ className, children }: CommonProps) => {
  return <span className={cn("", className)}>{children}</span>;
};

export const ProfileName = ({ className, children }: CommonProps) => {
  return (
    <span className={cn("text-base font-bold", className)}>{children}</span>
  );
};

export const ProfilePosition = ({ className, children }: CommonProps) => {
  return (
    <div className={cn("text-xs font-medium leading-normal", className)}>
      {children}
    </div>
  );
};
