import { Badge } from "@/components/ui/badge";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const FieldLabel = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "flex items-center gap-3 pb-1.5 text-xs font-bold leading-5",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const FieldLabelGroup = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const FieldLabelText = ({ children, className }: CommonProps) => {
  return (
    <label className={cn("shrink-0 font-bold text-base", className)}>
      {children}
    </label>
  );
};

export const FieldLabelIndicator = ({ children, className }: CommonProps) => {
  return (
    <div className={cn("flex w-full items-center gap-3", className)}>
      {children}
    </div>
  );
};

export const FieldLabelBadge = ({ children, className }: CommonProps) => {
  return (
    <Badge
      variant="default"
      className={cn(
        "shrink-0 overflow-hidden rounded-[.3125rem] px-1.5 py-[.1875rem] text-xs font-bold leading-normal hover:bg-blue-300",
        className,
      )}
    >
      {children}
    </Badge>
  );
};

export const FieldLabelLine = ({ className }: CommonProps) => {
  return <hr className={cn("h-[.0625rem] w-full", className)} />;
};

// Address repeating implementation - This is NOT a one all be all component
// There could be some situation that this component is not enough.
export const FieldLabelComposite = ({
  labelText,
  className,
}: CommonProps & {
  labelText: string;
}) => {
  return (
    <FieldLabel className={cn("", className)}>
      <FieldLabelText>{labelText}</FieldLabelText>
      <FieldLabelIndicator>
        <FieldLabelBadge>必須</FieldLabelBadge>
        <FieldLabelLine />
      </FieldLabelIndicator>
    </FieldLabel>
  );
};
