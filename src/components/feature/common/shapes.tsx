import { cn } from "@/lib/utils";
import { ColumnContainer, ColumnItem } from "./column-component";
import { Block } from "./containers";
import { PropsWithChildren } from "react";

type CommonProps = PropsWithChildren & {
  className?: string;
};

export const BackgroundCircle = ({
  className = "",
  title,
  content,
  titleClassName,
  contentClassName,
}: CommonProps & {
  title?: string;
  content?: string;
  titleClassName?: string;
  contentClassName?: string;
}) => {
  return (
    <Block
      className={cn(
        "bg-circle flex h-[3.5rem] w-[3.5rem] rounded-full bg-yellow-400 lg:h-[5.3125rem] lg:w-[5.3125rem] lg:px-[1.4375rem] lg:py-[.875rem]",
        className,
      )}
    >
      <ColumnContainer className="flex w-full flex-col items-center justify-center">
        <ColumnItem
          className={cn(
            "text-xs font-semibold uppercase leading-[.875rem] text-white lg:text-[.9375rem] lg:leading-[1.125rem]",
            titleClassName,
          )}
        >
          {title}
        </ColumnItem>
        <ColumnItem
          className={cn(
            "text-2xl font-bold uppercase leading-6 text-white lg:text-[1.9375rem] lg:leading-[2.3125rem]",
            contentClassName,
          )}
        >
          {content}
        </ColumnItem>
      </ColumnContainer>
    </Block>
  );
};

export const BackgroundTriangle = ({ className = "" }: CommonProps) => {
  return (
    <Block
      className={cn(
        "h-[1rem] w-[2.6875rem] border-l-[21.5px] border-r-[21.5px] border-t-[16px] border-transparent border-t-coral-300",
        className,
      )}
    />
  );
};

export const DiagonalLine = ({ className }: CommonProps) => {
  return (
    <Block
      className={cn("h-[.125rem] w-[30px] transform bg-green-400", className)}
    />
  );
};

export const HorizontalDash = ({ className = "" }: CommonProps) => {
  return <hr className={cn("h-[2px] w-full border-dashed", className)} />;
};
