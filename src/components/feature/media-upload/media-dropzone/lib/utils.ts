import { FileWithPath } from "react-dropzone";

export const isGreaterThanLimit = (size: number, limit = 20) => size > limit;

export const getFileSizeInMB = (size: number) => size / 1024 / 1024;

export const getFileSizeFromFiles = (data: readonly FileWithPath[]) => {
  return data.reduce((sum, file) => sum + file.size, 0);
};
