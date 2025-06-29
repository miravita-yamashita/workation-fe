import { PropsWithChildren } from "react";
import { Block, MainBlock } from "./containers";
import { cn } from "@/lib/utils";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const NoDataFound = ({ className = "" }: CommonProps) => {
  return (
    <MainBlock
      size="sm"
      className={cn("my-10 bg-white p-10 text-base", className)}
    >
      <Block className="text-base">結果が見つかりませんでした。</Block>
    </MainBlock>
  );
};
