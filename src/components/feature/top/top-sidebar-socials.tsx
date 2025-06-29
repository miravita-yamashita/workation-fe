import { socials } from "@/lib/static-datasource";
import { ColumnContainer, ColumnItem } from "../common";
import { SocialsBlock } from "../socials";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const SideBarSocials = ({ className = "" }: CommonProps) => {
  return (
    <ColumnContainer
      className={cn("mx-4 flex-col rounded bg-white lg:mx-0", className)}
    >
      <ColumnItem className="border-b px-5 py-[10px] text-base font-bold">
        公式SNS
      </ColumnItem>
      <ColumnItem className="px-5 py-5">
        <SocialsBlock
          socials={socials}
          iconOnly={true}
          className="gap-[.9375rem] lg:justify-normal"
        />
      </ColumnItem>
    </ColumnContainer>
  );
};
