"use client";

import {
  ModalMessageVariant,
  openModalMessage,
} from "@/components/feature/modal/modal-message";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteFacility } from "./lib";
import { useSession } from "next-auth/react";

type Props = {
  className?: string;
  onSubmit?: () => void;
  toDeleteId?: string | string[] | undefined;
  toEdit?: string;
};

export const HeaderActions = ({
  className,
  onSubmit,
  toDeleteId,
  toEdit,
}: Props) => {
  const [isClicked, setClicked] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const { data: session } = useSession();

  const handleDeleteFacility = async () => {
    if (!toDeleteId) return;
    const afterSubmissionPath = "/admin/facilities";
    try {
      setClicked(true);
      const response = await deleteFacility(toDeleteId);

      if (response?.success) {
        toast({
          title: "成功",
          description: "正常に削除されました",
        });

        router.push(afterSubmissionPath);
        router.refresh();
      }

      if (response?.errors) {
        toast({
          title: "エラー",
          description: "削除中にエラーが発生しました",
          variant: "destructive",
        });
      }

      setClicked(false);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      toast({
        title: "削除中にエラーが発生しました",
        description: errorMessage,
      });
      setClicked(false);
    }
  };

  const handleOpenConfirmDeletion = () => {
    if (!toDeleteId) return;

    const title = "";
    const message = "本当に削除してもよろしいですか?";

    openModalMessage({
      title,
      message,
      variant: ModalMessageVariant.Confirm,
      handler: () => handleDeleteFacility(),
    });
  };

  return (
    <div className={cn("flex items-center gap-5", className)}>
      <Button
        variant="admin"
        size="auto"
        className="h-[2.5rem] w-full min-w-[7.5rem] bg-[#E4E4E4] p-3 text-sm leading-none text-black hover:opacity-75 lg:leading-none"
        asChild
      >
        <Link href="/admin/facilities">戻る</Link>
      </Button>
      {session?.user?.isAdmin && toEdit ? (
        <Button
          asChild
          variant="admin"
          size="auto"
          className="h-[2.5rem] w-full min-w-[7.5rem] bg-[#357DC9] p-3 text-sm leading-none hover:opacity-75 lg:leading-none"
        >
          <Link href={`/admin/facilities/edit/${toEdit}`}> 編集する</Link>
        </Button>
      ) : (
        <Button
          onClick={onSubmit}
          variant="admin"
          size="auto"
          className="h-[2.5rem] w-full min-w-[7.5rem] bg-[#357DC9] p-3 text-sm leading-none hover:opacity-75 lg:leading-none"
        >
          保存
        </Button>
      )}

      {session?.user?.isAdmin && toDeleteId && (
        <Button
          disabled={isClicked}
          onClick={handleOpenConfirmDeletion}
          variant="admin"
          size="auto"
          className="h-[2.5rem] w-full min-w-[7.5rem] bg-[#BE2421] p-3 text-sm leading-none hover:opacity-75 lg:leading-none"
        >
          削除
        </Button>
      )}
    </div>
  );
};
