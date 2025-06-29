"use client";

import React, { useContext } from "react";
import { createContext, PropsWithChildren, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

// 1. Define store type
export type FormInteractionStore = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  submitButtonRef: React.RefObject<HTMLButtonElement | null>;
  formRef: React.RefObject<HTMLFormElement | null>;
};
// 2. Set Context
const FormInteractionContext = createContext<
  StoreApi<FormInteractionStore> | undefined
>(undefined);
// 3. Create Provider
export const FormInteractionProvider = ({ children }: PropsWithChildren) => {
  // 3.1 Initialize Zustand store
  const [store] = useState(() =>
    createStore<FormInteractionStore>((set) => ({
      isLoading: false,
      setIsLoading: (isLoading) => set(() => ({ isLoading })),
      submitButtonRef: { current: null },
      formRef: { current: null },
    })),
  );
  // 3.2 Provide the store to the children
  return (
    <FormInteractionContext.Provider value={store}>
      {children}
    </FormInteractionContext.Provider>
  );
};

// 4. Create a custom hook to access the store
export const useFormInteraction = <T,>(
  selector: (state: FormInteractionStore) => T,
): T => {
  const context = useContext(FormInteractionContext);

  if (context === undefined) {
    throw new Error(
      "useFormInteraction must be used within a FormInteractionProvider",
    );
  }

  return useStore(context, selector);
};
