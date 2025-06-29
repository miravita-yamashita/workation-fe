"use client";

import { CommonProps } from "@/lib/types";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { ModalContent, ModalFooter, ModalTitle } from "./modal";
import {
  GalleryButton,
  GalleryItem,
  GalleryItems,
  GalleryPreview,
  GalleryTabs,
  GalleryTabsContent,
  GalleryTabsList,
  GalleryTabsTrigger,
  closeModalMediaUpload,
  closeModalMediaUploadWithReset,
  toggleEditMode,
  useMediaUpload,
} from "./gallery";
import { ColumnContainer, ColumnItem, Loading } from "../common";
import Image from "next/image";
import { X } from "lucide-react";
import { DetailComposite } from "./detail";
import { FormMedia } from "./form";
import { MediaDropzone } from "./media-dropzone";

export const MediaUploadComposite = ({}: CommonProps) => {
  // Extract some logic
  const {
    media,
    mediaFetchLoading,
    isOpen,
    isEditMode,
    formRef,
    selectedMedia,
    isLoading,
    fetchMedia,
  } = useMediaUpload();

  return (
    <>
      <Dialog open={isOpen}>
        <ModalContent className="gap-0 [&>button]:hidden">
          <DialogHeader className="relative mb-5 flex flex-row justify-between">
            <ModalTitle>メディアを挿入</ModalTitle>
            <Button
              type="button"
              variant="ghost"
              size="auto"
              onClick={() => {
                closeModalMediaUploadWithReset();
              }}
              className="m-0 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
            <DialogDescription className="hidden">
              Media Gallery
            </DialogDescription>
          </DialogHeader>

          <GalleryTabs defaultValue="gallery">
            <GalleryTabsList>
              <GalleryTabsTrigger value="gallery">
                メディアライブラリー
              </GalleryTabsTrigger>
            </GalleryTabsList>
            <GalleryTabsContent value="gallery">
              <ColumnContainer className="min-w-0">
                <ColumnItem className="w-full">
                  {mediaFetchLoading && (
                    <div className="flex justify-center">
                      <Loading />
                    </div>
                  )}
                  <GalleryItems className="h-[70vh] max-h-[41.125rem] overflow-y-auto">
                    {media.map((data) => {
                      const { id, url, custom_attr } = data;
                      return (
                        <GalleryItem key={id}>
                          <GalleryPreview
                            data={data}
                            isDisabled={isEditMode || isLoading}
                          >
                            <Image
                              src={url}
                              alt={custom_attr?.alt || "no caption"}
                              fill
                              sizes="100%"
                              style={{ objectFit: "contain" }}
                            />
                          </GalleryPreview>
                        </GalleryItem>
                      );
                    })}
                  </GalleryItems>
                </ColumnItem>
                <ColumnItem className="w-[19.375rem] shrink-0 p-5">
                  <section className="mb-5">
                    {!isEditMode ? (
                      <DetailComposite selectedMedia={selectedMedia} />
                    ) : (
                      <FormMedia
                        formRef={formRef}
                        selectedMedia={selectedMedia}
                      />
                    )}
                  </section>
                  {!isEditMode && (
                    <MediaDropzone
                      name="file"
                      required={false}
                      fetchMedia={fetchMedia}
                    />
                  )}
                </ColumnItem>
              </ColumnContainer>
            </GalleryTabsContent>
          </GalleryTabs>

          <ModalFooter>
            {!isEditMode ? (
              <GalleryButton
                onClick={() => {
                  closeModalMediaUpload();
                }}
              >
                追加
              </GalleryButton>
            ) : (
              <ColumnContainer className="gap-5">
                <GalleryButton
                  className="bg-shade-250 text-black"
                  onClick={() => {
                    toggleEditMode(false);
                  }}
                  isLoading={isLoading}
                >
                  戻る
                </GalleryButton>
                <GalleryButton
                  onClick={() => {
                    formRef.current?.dispatchEvent(
                      new Event("submit", { cancelable: true, bubbles: true }),
                    );
                  }}
                  isLoading={isLoading}
                >
                  保存
                </GalleryButton>
              </ColumnContainer>
            )}
          </ModalFooter>
        </ModalContent>
      </Dialog>
    </>
  );
};
