"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FormApplication } from "../../form/form-application";
import { useModalApplicationStore } from "./lib/store";

export const ModalApplication = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const title = useModalApplicationStore.getState().title;
  const message = useModalApplicationStore.getState().message;

  useEffect(() => {
    const unSub = useModalApplicationStore.subscribe((state) => {
      setIsOpen(state.isOpen);
    });

    return unSub;
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]); // Runs every time the page changes

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="flex max-h-[90vh] w-[95%] max-w-[55rem] flex-col gap-0 overflow-hidden rounded-md px-[.875rem] py-[1.25rem] pr-0 md:w-auto md:p-[2.5rem] md:pr-0 [&>button:last-of-type]:hidden">
        <DialogClose
          onClick={() => setIsOpen(false)}
          className="absolute right-[2rem] top-[.8rem] text-[1.9rem] text-pink-200 hover:opacity-75 focus:outline-none md:top-[2.3625rem]"
        >
          ✖
        </DialogClose>
        <DialogHeader>
          <DialogTitle className="text-center text-xl leading-[1.875rem] text-pink-200 md:text-[1.75rem] md:leading-[2.4375rem]">
            {title}
          </DialogTitle>
          <DialogDescription className="pb-5">{message}</DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-[.875rem] md:pr-[2.5rem]">
          <FormApplication closeModal={() => setIsOpen(false)} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
