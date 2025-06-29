import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import IconPrevArrow from "@public/icon-prev-arrow.svg";
import IconNextArrow from "@public/icon-next-arrow.svg";
import IconNextArrowBlack from "@public/icon-arrow-black.svg";
import IconPrevArrowBlack from "@public/icon-arrow-black.svg";
import { cn } from "@/lib/utils";
import { ButtonProps, buttonVariants } from "@/components/ui/button";
import { ImageBlock, ImageItem } from "../feature/common";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, "size"> &
  React.ComponentProps<"a">;

const PaginationLink = ({
  className,
  isActive,
  size = "icon",
  ...props
}: PaginationLinkProps) => (
  <a
    aria-current={isActive ? "page" : undefined}
    className={cn(
      buttonVariants({
        variant: isActive ? "outline" : "ghost",
        size,
      }),
      className,
    )}
    {...props}
  />
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ImageBlock className="relative flex h-4 w-4">
      <ImageItem src={IconPrevArrow} altText="icon-prev-arrow" className="" />
    </ImageBlock>
    <span>前へ</span>
  </PaginationLink>
);
PaginationPrevious.displayName = "PaginationPrevious";

const AdminPaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="default"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ImageBlock className="relative h-4 w-4 rotate-180">
      <ImageItem src={IconPrevArrowBlack} altText="icon-prev-arrow" />
    </ImageBlock>
    <span>Previous</span>
  </PaginationLink>
);
AdminPaginationPrevious.displayName = "AdmminPaginationPrevious";

const PaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>次へ</span>
    <ImageBlock className="relative h-4 w-4">
      <ImageItem src={IconNextArrow} altText="icon-next-arrow" />
    </ImageBlock>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const AdminPaginationNext = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="default"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    <span>Next</span>
    <ImageBlock className="relative h-4 w-4">
      <ImageItem src={IconNextArrowBlack} altText="icon-next-arrow" />
    </ImageBlock>
  </PaginationLink>
);
PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  AdminPaginationPrevious,
  AdminPaginationNext,
};
