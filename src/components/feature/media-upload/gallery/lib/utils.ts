import { openModalMediaUpload, useModalMediaUploadStore } from "./store";
import { MediaImageType } from "./types";

export const openMediaUploadModalAsync =
  async (): Promise<MediaImageType | null> => {
    openModalMediaUpload();

    return new Promise((resolve) => {
      const unsubscribe = useModalMediaUploadStore.subscribe((state) => {
        if (!state.isOpen) {
          resolve(state.selectedMediaSingle);
          unsubscribe();
        }
      });
    });
  };
