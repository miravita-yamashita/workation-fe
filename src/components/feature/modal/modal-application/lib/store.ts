import { create } from "zustand";

export enum ModalMessageVariant {
  Message = "message",
  Confirm = "confirm",
}

export type SelectedJobType = {
  id: string;
  name: string;
};

export type ModalMessageStore = {
  title?: string;
  message?: string;
  selectedJobs: SelectedJobType[];
  isOpen: boolean;
  variant?: ModalMessageVariant; // if "confirm" then show ok and cancel button
  handler?: () => void;
};

const initialStore: ModalMessageStore = {
  title: "応募フォーム",
  message: "",
  selectedJobs: [],
  variant: ModalMessageVariant.Message,
  isOpen: false,
};

export const useModalApplicationStore = create<ModalMessageStore>()(() => ({
  ...initialStore,
}));

type OpenModalProps = Omit<ModalMessageStore, "isOpen">;

export const openModalApplication = ({
  title = "応募フォーム",
  message = "",
  variant = ModalMessageVariant.Message,
  selectedJobs = [],
  handler,
}: OpenModalProps) => {
  useModalApplicationStore.setState({
    title,
    message,
    selectedJobs,
    isOpen: true,
    variant,
    handler,
  });
};

export const closeModalMessage = () => {
  useModalApplicationStore.setState({
    ...initialStore,
  });
};
