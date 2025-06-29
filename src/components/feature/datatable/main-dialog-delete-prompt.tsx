"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  DashboardActionType,
  genericDeleteItem,
  genericDeleteItemsList,
  useDashboardActionContext,
} from "./lib";
import DialogDeletePrompt from "./dialog-delete-prompt";
import { useToast } from "@/hooks/use-toast";

type MainDialogDeletePromptProps = {
  redirectPath?: string;
  endpoint?: string;
};

export default function MainDialogDeletePrompt({
  redirectPath = "",
}: MainDialogDeletePromptProps) {
  const {
    isShowDeletePrompt,
    idsToDelete,
    idToDelete,
    bulkDeleteEndpoint,
    dispatch,
  } = useDashboardActionContext();
  const router = useRouter();
  const { toast } = useToast();

  const handleCancel = () => {
    dispatch({ type: DashboardActionType.HIDE_DELETE_PROMPT });
  };
  const [isActionLoading, setIsActionLoading] = useState(false);

  const handleDelete = async () => {
    setIsActionLoading(true);
    let response = null;
    if (idsToDelete.length > 0) {
      // Convert the array of IDs into a comma-separated string
      response = await genericDeleteItemsList(idsToDelete, bulkDeleteEndpoint);
    } else {
      response = await genericDeleteItem(idToDelete, bulkDeleteEndpoint);
    }

    if (response?.success) router.push(redirectPath);

    if (response !== null && response.success) {
      setIsActionLoading(false);
    } else {
      toast({
        description: response?.message || "No Message",
      });
    }
    setIsActionLoading(false);
    router.refresh();
    dispatch({ type: DashboardActionType.HIDE_DELETE_PROMPT });
  };

  return (
    <DialogDeletePrompt
      isShowDeletePrompt={isShowDeletePrompt}
      handleCancel={handleCancel}
      handleDelete={handleDelete}
      isActionLoading={isActionLoading}
    />
  );
}
