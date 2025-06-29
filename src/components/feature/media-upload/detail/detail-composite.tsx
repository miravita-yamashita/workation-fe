"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  Detail,
  DetailActions,
  DetailAttributes,
  DetailContent,
  DetailPreview,
  DetailTitle,
} from "./detail";
import { ColumnContainer } from "@/components/feature/common";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useMediaDetail } from "./lib/use-media-detail";
import { MediaImageType, toggleEditMode } from "../gallery";

export const DetailComposite = ({
  className,
  selectedMedia,
}: CommonProps & {
  selectedMedia: MediaImageType | null;
}) => {
  // Extract some logic
  const { isLoading, deleteMediaItem } = useMediaDetail();

  if (!selectedMedia) {
    return null;
  }

  const { url, filename, file_attr, custom_attr, created_at_formatted } = selectedMedia;

  return (
    <Detail className={cn("", className)}>
      <ColumnContainer className="mb-5 justify-between gap-5">
        <DetailTitle className="shrink-0 items-center">詳細</DetailTitle>
        <DetailActions>
          <Button
            disabled={isLoading}
            variant="ghost"
            size="auto"
            className="bg p-0 font-bold text-blue-350 hover:text-blue-350"
            onClick={() => {
              toggleEditMode(true);
            }}
          >
            画像を編集
          </Button>
          <Button
            disabled={isLoading}
            variant="ghost"
            size="auto"
            className="p-0 font-bold text-red-350 hover:text-red-350"
            onClick={() => {
              deleteMediaItem(String(selectedMedia.id));
            }}
          >
            完全に削除
          </Button>
        </DetailActions>
      </ColumnContainer>
      <DetailContent>
        <ColumnContainer className="gap-2.5">
          <DetailPreview>
            <Image
              src={url}
              alt={custom_attr?.alt || ""}
              style={{ objectFit: "contain" }}
              fill
              sizes="100%"
            />
          </DetailPreview>
          <DetailAttributes>
            <p className="text-sm font-bold">{filename}</p>
            <p>{created_at_formatted || "-"}</p>
            <p>{file_attr?.size_readable || "-"}</p>
            <p>
              {`${file_attr?.dimensions?.width || "-"} X ${file_attr?.dimensions?.height || "-"}`}{" "}
            </p>
          </DetailAttributes>
        </ColumnContainer>
      </DetailContent>
    </Detail>
  );
};
