import { create } from "zustand";
import { MediaImageType } from "./types";
import { subscribeWithSelector } from "zustand/middleware";
import { FileWithPath } from "react-dropzone";

export type ModalMediaUploadStore = {
  isOpen: boolean;
  isEditMode: boolean;
  isLoading: boolean;
  handler?: () => void;
  media: MediaImageType[];
  selectedMediaSingle: MediaImageType | null;
  formRef: React.RefObject<HTMLFormElement | null>;
  acceptedFiles: FileWithPath[];
};

const initialStore: ModalMediaUploadStore = {
  isOpen: false,
  isEditMode: false,
  isLoading: false,
  selectedMediaSingle: null,
  media: [],
  formRef: { current: null },
  acceptedFiles: [],
};

export const useModalMediaUploadStore = create<ModalMediaUploadStore>()(
  subscribeWithSelector(() => ({
    ...initialStore,
  })),
);

export const openModalMediaUpload = async () => {
  useModalMediaUploadStore.setState({ isOpen: true });
};

export const closeModalMediaUpload = async () => {
  useModalMediaUploadStore.setState({
    isOpen: false,
  });
};

export const closeModalMediaUploadWithReset = async () => {
  useModalMediaUploadStore.setState({
    isOpen: false,
    selectedMediaSingle: null,
    isEditMode: false,
  });
};

export const setMediaGallery = (media: MediaImageType[]) => {
  useModalMediaUploadStore.setState({ media });
};

export const setSelectedMediaSingle = (media: MediaImageType | null) => {
  useModalMediaUploadStore.setState({ selectedMediaSingle: media });
};

export const resetSelectedMediaSingle = () => {
  useModalMediaUploadStore.setState({ selectedMediaSingle: null });
};

export const removeDeletedMediaItemFromGallery = (id: string) => {
  useModalMediaUploadStore.setState((state) => {
    const updatedMedia = state.media.filter((media) => String(media.id) !== id);

    return {
      ...state,
      media: updatedMedia,
    };
  });
};

export const toggleIsLoading = (isLoading: boolean) => {
  useModalMediaUploadStore.setState({ isLoading });
};

export const toggleEditMode = (isEditMode: boolean) => {
  useModalMediaUploadStore.setState({ isEditMode });
};


export const updateMediaItem = (data: MediaImageType) => {
  useModalMediaUploadStore.setState((state) => {
    const media = state.media.map((mediaItem) => {
      if (String(mediaItem.id) === String(data?.id)) {
        return data;
      }
      return mediaItem;
    });

    return { media };
  });
};