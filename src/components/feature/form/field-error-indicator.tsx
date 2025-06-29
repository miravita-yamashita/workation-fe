import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import IconWarningCircle from "@public/icon-warning-circle.svg";
import Image from "next/image";

type FieldErrorIndicatorProps = {
  className?: string;
  formMessage: React.ReactNode;
  isAdmin?: boolean;
};
export const FieldErrorIndicator = ({
  className,
  formMessage,
  isAdmin = false,
}: FieldErrorIndicatorProps) => {
  return (
    <div
      className={cn("flex h-[1.9375rem] items-center gap-1.5", {
        "h-auto": isAdmin,
      })}
    >
      {!isAdmin && (
        <div className={cn("relative h-[1.5rem] w-[1.5rem]", className)}>
          <Image
            src={IconWarningCircle}
            alt="icon-warning-circle"
            fill
            sizes="100%"
          />
        </div>
      )}
      {formMessage}
    </div>
  );
};

export const FieldErrorIndicatorMessage = ({
  className,
  children,
}: CommonProps) => {
  return (
    <div className={cn("text-sm font-bold text-red-250", className)}>
      {children}
    </div>
  );
};
