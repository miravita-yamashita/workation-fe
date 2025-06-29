import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ImageBlock, ImageItem } from "../common";
import IconClose from "@public/icon-close-black.svg";

type DialogDeletePromptProps = {
  isShowDeletePrompt: boolean;
  handleCancel: () => void;
  handleDelete: () => void;
  isActionLoading?: boolean;
  title?: string;
  description?: string;
};

export default function DialogDeletePrompt({
  isShowDeletePrompt,
  handleCancel,
  handleDelete,
  isActionLoading = false,
  title = "本当に削除してもよろしいですか?", // Are you absolutely sure?
  description = "", // This action cannot be undone.
}: DialogDeletePromptProps) {
  return (
    <div className="relative">
      <AlertDialog open={isShowDeletePrompt}>
        <AlertDialogContent className="!rounded-none p-10 lg:min-w-[650px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="mb-2 text-center text-2xl">
              {title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-base" asChild>
              <section>{description}</section>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex gap-5 !space-x-0 lg:justify-center">
            <AlertDialogCancel
              onClick={handleCancel}
              className="w-full max-w-[8.75rem] rounded bg-shade-250 font-bold hover:bg-shade-250"
              disabled={isActionLoading}
            >
              キャンセル
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="inline-flex max-w-[8.75rem] rounded bg-red-350 px-[3.5rem] py-[.5625rem]"
              disabled={isActionLoading}
            >
              削除
            </AlertDialogAction>
          </AlertDialogFooter>
          <div
            className="absolute right-5 top-5 cursor-pointer"
            onClick={handleCancel}
          >
            <ImageBlock className="h-3 w-3">
              <ImageItem src={IconClose} altText="icon close " />
            </ImageBlock>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
