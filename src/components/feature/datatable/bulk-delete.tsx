import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import {
  DashboardActionType,
  useDashboardActionContext,
} from "./lib/context-provider";
import { cn } from "@/lib/utils";

type MainDataTableBulkDeleteProps<TData> = {
  table: Table<TData>;
  endpoint: string;
  className?: string;
};

export default function MainDatatableBulkDelete<TData>({
  table,
  endpoint,
  className = "",
}: MainDataTableBulkDeleteProps<TData>) {
  const { dispatch } = useDashboardActionContext();

  const onClickDelete = (
    event: React.MouseEvent<HTMLDivElement | HTMLButtonElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (table.getFilteredSelectedRowModel().rows.length === 0) {
      return;
    }

    dispatch({
      type: DashboardActionType.SHOW_DELETE_PROMPT,
      payload: {
        idsToDelete: table
          .getFilteredSelectedRowModel()
          .rows.map((row) => (row.original as { id: string }).id),
        bulkDeleteEndpoint: endpoint,
      },
    });
    return false;
  };

  return (
    <Button
      onClick={onClickDelete}
      className={cn(
        "rounded border bg-red-350 py-[.5938rem] text-white hover:bg-red-350",
        className,
      )}
    >
      <span className="gap-3">一括削除</span>
    </Button>
  );
}
