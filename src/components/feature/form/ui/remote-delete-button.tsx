"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DashboardActionType,
  useDashboardActionContext,
} from "../../datatable";

type RemoteDeleteButtonProps = {
  id: string;
  endpoint: string;
  labelText?: string;
  className?: string;
};

export default function RemoteDeleteButton({
  id,
  endpoint,
  labelText = "削除",
  className = "",
}: RemoteDeleteButtonProps) {
  const { dispatch } = useDashboardActionContext();

  const onClickDelete = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (!id) {
      return;
    }

    dispatch({
      type: DashboardActionType.SHOW_DELETE_PROMPT,
      payload: {
        idToDelete: id,
        bulkDeleteEndpoint: endpoint,
      },
    });
    return false;
  };

  return (
    <Button
      onClick={onClickDelete}
      className={cn(
        "h-full max-h-[2.5rem] w-[7.5rem] rounded border bg-red-350 py-[.5938rem] text-white hover:bg-red-350",
        className,
      )}
    >
      <span className="gap-3">{labelText}</span>
    </Button>
  );
}
