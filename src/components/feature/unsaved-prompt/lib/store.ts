import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export type ModalUnsavedPromptStore = {
  isOpen: boolean;
  continueNavigate: boolean;
  formRef: React.RefObject<HTMLFormElement | null>;
};

const initialStore: ModalUnsavedPromptStore = {
  isOpen: false,
  continueNavigate: false,
  formRef: { current: null },
};

export const useModalUnsavedPromptStore = create<ModalUnsavedPromptStore>()(
  subscribeWithSelector(() => ({
    ...initialStore,
  })),
);

export const openUnsavedPromptModal = async () => {
  useModalUnsavedPromptStore.setState({ isOpen: true });
};

export const closeUnsavedPromptModal = async () => {
  useModalUnsavedPromptStore.setState({ isOpen: false });
};

export const toggleContinueNavigate = (continueNavigate: boolean) => {
  useModalUnsavedPromptStore.setState({ continueNavigate });
};