"use client";

import { Button } from "@/components/ui/button";
import { useFormInteraction } from "../lib";
import { cn } from "@/lib/utils";

// Note: This component must be placed within the <FormInteractionProvider>.
// Example use case: when the form submission is located in the head
// Example usage: form-category.tsx
export const RemoteSubmitButton = ({ className }: { className?: string }) => {
  const formRef = useFormInteraction((state) => state.formRef);
  const isLoading = useFormInteraction((state) => state.isLoading);
  return (
    <Button
      disabled={isLoading}
      size="auto"
      variant="remote"
      type="button"
      className={cn("", className)}
      onClick={() => {
        formRef.current?.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      }}
    >
      保存
    </Button>
  );
};
