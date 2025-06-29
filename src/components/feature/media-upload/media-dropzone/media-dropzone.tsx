"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  getFileSizeFromFiles,
  getFileSizeInMB,
  isGreaterThanLimit,
} from "./lib/utils";
import { Button } from "@/components/ui/button";
import { useMediaDropzone } from "./lib/use-media-dropzone";

export const MediaDropzone = ({
  name,
  required,
  fetchMedia,
}: {
  name: string;
  required: boolean;
  fetchMedia: () => void;
}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const isValid = useRef(true);
  const [acceptedFiles, setAcceptedFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: true,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDrop: (incomingFiles) => {
      if (hiddenInputRef.current) {
        // Note the specific way we need to munge the file into the hidden input
        // https://stackoverflow.com/a/68182158/1068446
        const dataTransfer = new DataTransfer();
        incomingFiles.forEach((v) => {
          dataTransfer.items.add(v);
        });
        hiddenInputRef.current.files = dataTransfer.files;
        setAcceptedFiles(incomingFiles);
      }
    },
  });
  // Extract Some Logic
  const { isLoading, handleSubmit } = useMediaDropzone({
    fetchMedia,
    setAcceptedFiles,
  });

  // get all file size and with some checks
  const acceptedFilesSizeTotal = getFileSizeFromFiles(acceptedFiles);
  const fileRejectionsFlatten = fileRejections.flatMap((info) => info.file);
  const fileRejectionsSizeTotal = getFileSizeFromFiles(fileRejectionsFlatten);
  const totalFileSize = getFileSizeInMB(
    acceptedFilesSizeTotal + fileRejectionsSizeTotal,
  );
  const isPastLimit = isGreaterThanLimit(totalFileSize);
  isValid.current = !isPastLimit && fileRejections.length === 0;

  return (
    <form
      onSubmit={(event) => {
        handleSubmit(event);
      }}
    >
      <Button
        type="submit"
        variant="admin"
        className="mb-2.5 flex h-10 w-[11rem] items-center rounded-[.1875rem] px-[2rem] py-0 text-sm"
        disabled={!isValid.current || acceptedFiles.length === 0 || isLoading}
      >
        ファイルアップロード
      </Button>
      {!isValid.current && (
        <>
          <p className="mb-2.5 text-sm font-medium text-red-350">
            メディアのアップロードに失敗しました。
          </p>
        </>
      )}
      {isPastLimit && (
        <>
          <p className="mb-2.5 text-sm font-medium text-red-350">
            最大アップロードサイズ：20MB
          </p>
        </>
      )}

      <section className="container border border-dashed p-2.5">
        <section {...getRootProps({ className: "dropzone" })} className="mb-5">
          <input
            type="file"
            name={name}
            required={required}
            style={{ opacity: 0 }}
            ref={hiddenInputRef}
            multiple
          />
          <input {...getInputProps()} />
          <p className="cursor-pointer text-center">メディアをアップロード</p>
        </section>
        <aside>
          {acceptedFiles.length > 0 && (
            <MediaDropzoneFileList className="mb-5">
              {acceptedFiles.map((file, key) => {
                return (
                  <MediaDropzoneFileItem key={key}>
                    {file.name}
                  </MediaDropzoneFileItem>
                );
              })}
            </MediaDropzoneFileList>
          )}

          {fileRejections.length > 0 && (
            <MediaDropzoneFileList className="mb-5">
              <p className="text-sm font-medium text-red-350">
                無効なファイル形式です
              </p>
              {fileRejections.map(({ file }, key) => {
                return (
                  <MediaDropzoneFileItem key={key}>
                    {file.name}
                  </MediaDropzoneFileItem>
                );
              })}
            </MediaDropzoneFileList>
          )}
        </aside>
      </section>
    </form>
  );
};

export const MediaDropzoneFileList = ({ children, className }: CommonProps) => {
  return (
    <ol className={cn("list-inside list-decimal", className)}>{children}</ol>
  );
};

export const MediaDropzoneFileItem = ({ children, className }: CommonProps) => {
  return <li className={cn("", className)}>{children}</li>;
};