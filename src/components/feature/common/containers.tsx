import { PropsWithChildren } from "react";
import { cn } from "@/lib/utils";
import { ImageBlock, ImageItem } from "./image-component";
import ImageNoPhoto from "@public/image-no-photo.jpg";

// Define a reusable prop type for components with children and an optional className
type CommonProps = PropsWithChildren & {
  className?: string;
};

// MainBlock component with size variations
type MainBlockProps = {
  size?: "sm" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
  noPadding?: boolean;
};

export const ColumnItem = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const ColumnContainer = ({ children, className }: CommonProps) => {
  return <div className={cn("flex flex-row", className)}>{children}</div>;
};

export const MainBlock = ({
  size,
  className = "",
  children,
}: MainBlockProps) => {
  return (
    <div
      className={cn(
        "m-auto px-6 sm:px-8",
        {
          "max-w-[84rem]": !size,
          "max-w-[65rem] px-4": size === "sm",
          "max-w-[120rem]": size === "lg",
          "max-w-[97.75rem]": size === "xl",
        },
        className,
      )}
    >
      {children}
    </div>
  );
};

// TwoColContainer and its item container with reusable props
export const TwoColContainer = ({
  children,
  className = "",
}: CommonProps & { children: React.ReactNode[] }) => {
  return (
    <div
      className={cn("flex flex-col lg:flex-row lg:justify-between", className)}
    >
      {children}
    </div>
  );
};

export const TwoColContainerBlock = ({ children, className }: CommonProps) => {
  return (
    <div
      className={cn(
        "two-col-container-block flex h-full w-full items-center justify-between",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BackgroundContainer = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const Block = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const UserPhoto = ({
  className = "",
  imageClassName = "",
  imgSrc,
}: CommonProps & { imgSrc?: string; imageClassName?: string }) => {
  return (
    <Block className={cn("", className)}>
      <ImageBlock
        className={cn(
          "h-20 w-20 shrink-0 lg:h-[6.25rem] lg:w-[6.25rem]",
          imageClassName,
        )}
      >
        <ImageItem
          src={imgSrc || ImageNoPhoto?.src}
          altText="icon user photo"
          className="rounded-full object-cover"
        />
      </ImageBlock>
    </Block>
  );
};

export const Title = ({ children, className }: CommonProps) => {
  return <div className={cn("font-bold", className)}>{children}</div>;
};

export const Body = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const Description = ({ children, className }: CommonProps) => {
  return <div className={cn(className)}>{children}</div>;
};

export const ParagraphBlock = ({ children, className = "" }: CommonProps) => {
  return (
    <div className={cn("text-sm font-medium leading-[25.2px]", className)}>
      {children}
    </div>
  );
};

export const SubHeadingTitle = ({
  title = "",
  className = "",
}: CommonProps & { title?: string }) => {
  return (
    <Block
      className={cn(
        "block w-full border-l-[.3125rem] border-coral-300 pl-2 text-lg font-bold text-black lg:text-[1.375rem]",
        className,
      )}
    >
      {title}
    </Block>
  );
};

export const NumberedList = ({
  items,
  type,
  className = "",
}: CommonProps & {
  items: (string | { text: string; sublist: string[] })[];
  type?: "alpha";
}) => {
  return (
    <ol
      className={cn(
        type === "alpha" ? "list-alpha pl-5" : "list-decimal pl-5",
        "text-sm",
        className,
      )}
    >
      {items?.map((item, index) => {
        if (typeof item === "string") {
          return <li key={index}>{item}</li>;
        }

        if (item.sublist) {
          return (
            <li key={index}>
              {item.text}
              {/* Pass type to sublist to ensure it can be alphabetic */}
              <NumberedList items={item.sublist} type="alpha" />
            </li>
          );
        }

        return null;
      })}
    </ol>
  );
};

export const DesktopBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("hidden lg:block", className)}>{children}</div>;
};

export const MobileBlock = ({ children, className }: CommonProps) => {
  return <div className={cn("lg:hidden", className)}>{children}</div>;
};

export const Table = ({ children, className = "" }: CommonProps & {}) => {
  return <div className={cn("grid w-full", className)}>{children}</div>;
};

export const TableItem = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};

export const Actions = ({ children, className }: CommonProps) => {
  return <div className={cn("flex", className)}>{children}</div>;
};

export const BannerImage = ({ children, className }: CommonProps) => {
  return <div className={cn("", className)}>{children}</div>;
};
