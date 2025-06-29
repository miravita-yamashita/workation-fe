"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  closeUnsavedPromptModal,
  toggleContinueNavigate,
  useModalUnsavedPromptStore,
} from "./lib";
import { useEffect, useState } from "react";
import { X } from "lucide-react";

export const UnsavedPrompt = () => {
  const [isOpen, setIsOpen] = useState(false);

  //Handle open and close state
  useEffect(() => {
    const unsubscribe = useModalUnsavedPromptStore.subscribe(
      (state) => state.isOpen,
      (isOpen) => {
        setIsOpen(isOpen);
      },
    );

    return () => unsubscribe();
  }, []);

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="w-full max-w-[55rem] gap-5 !rounded-none p-10">
        <AlertDialogHeader className="relative">
          <Button
            type="button"
            variant="ghost"
            size="auto"
            onClick={() => {
              closeUnsavedPromptModal();
            }}
            className="absolute right-[-1.5625rem] top-[-1.5625rem] m-0 p-0"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <AlertDialogTitle className="!mt-0 text-center text-xl leading-normal">
            に対する変更を保存しますか？
          </AlertDialogTitle>
          <AlertDialogDescription className="hidden text-base leading-[1.3125rem]"></AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col justify-center gap-5 sm:justify-center">
          <Button
            type="button"
            variant="admin"
            className="w-full max-w-[8.75rem] bg-shade-250 text-black"
            onClick={() => {
              closeUnsavedPromptModal();
            }}
          >
            キャンセル
          </Button>
          <Button
            type="button"
            variant="admin"
            className="w-full max-w-[8.75rem] bg-shade-250 text-black"
            onClick={() => {
              toggleContinueNavigate(true);
              closeUnsavedPromptModal();
            }}
          >
            保存しない
          </Button>
          <Button
            type="button"
            variant="admin"
            className="w-full max-w-[8.75rem] bg-blue-350 text-white"
            onClick={() => {
              closeUnsavedPromptModal();

              const formRef = useModalUnsavedPromptStore.getState().formRef;
              formRef.current?.dispatchEvent(
                new Event("submit", { cancelable: true, bubbles: true }),
              );
            }}
          >
            保存
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
