import {
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";
import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";

export const ModalTitle = ({ className, children }: CommonProps) => {
  return (
    <DialogTitle className={cn("text-lg font-bold leading-normal", className)}>
      {children}
    </DialogTitle>
  );
};

export const ModalContent = ({ className, children }: CommonProps) => {
  return (
    <DialogContent
      className={cn("max-h-[55rem] max-w-[77.5rem] px-10 py-5", className)}
    >
      {children}
    </DialogContent>
  );
};

export const ModalFooter = ({ className, children }: CommonProps) => {
  return (
    <DialogFooter className={cn("border-t pt-4", className)}>
      {children}
    </DialogFooter>
  );
};
