import Link from "next/link";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList } from "./breadcrumb";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

// Address repeating implementation - This is NOT a one all be all component
// There could be some situation that this component is not enough.
export const BreadcrumbComposite = ({
  className,
  data,
  isAdmin = false,
}: {
  className?: string;
  isAdmin?: boolean;
  data: { link: string; label: string }[];
}) => {
  return (
    <Breadcrumb className={cn("", className)}>
      <BreadcrumbList
        className={cn("", {
          "text-blue-350": isAdmin,
        })}
      >
        {data.map((item, index) => {
          const isLastItem = index === data.length - 1;
          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {!isLastItem ? (
                  <Link href={item.link}>{item.label}</Link>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>
              {index !== data.length - 1 && (
                <BreadcrumbItem className="text-shade-800">
                  {">"}
                </BreadcrumbItem>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
