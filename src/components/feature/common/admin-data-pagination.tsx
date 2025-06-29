"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  AdminPaginationNext,
  AdminPaginationPrevious,
} from "@/components/ui/pagination";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  paginationData: {
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
      url: string | null;
      label: string;
      active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number | string;
    current_page: number;
  };
}
export function AdminDataPagination({
  paginationData,
  className = "",
}: PaginationProps & { className?: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handlePageChange = async (url: string | null) => {
    if (!url) return null;

    const pageNumberMatch = url.match(/[?&]page=(\d+)/);
    const pageNumber = pageNumberMatch ? pageNumberMatch[1] : null;

    if (pageNumber) {
      const builtQueryString = queryStringBuilder({
        queryString: searchParams.toString(),
        targetKey: "page",
        targetValue: pageNumber,
      });

      const newUrl = `${pathname}?${builtQueryString}`;
      router.push(newUrl);
    }
  };

  if (paginationData.last_page <= 1) return null;

  return (
    <div className={cn("pt-4", className)}>
      <Pagination className="flex w-full items-center justify-between">
        <PaginationContent className="flex w-full items-center justify-center gap-2">
          {/* Previous Button (always visible, but disabled on first page) */}
          <PaginationItem>
            <AdminPaginationPrevious
              className={cn(
                "cursor-pointer gap-2 rounded-lg text-xs font-medium text-black",
                paginationData.current_page <= 1 &&
                  "pointer-events-none text-dark-550 opacity-50",
              )}
              onClick={() => {
                if (paginationData.current_page > 1) {
                  handlePageChange(paginationData.prev_page_url);
                }
              }}
            />
          </PaginationItem>

          {/* Render pagination links */}
          {paginationData?.links?.map((link, index) => {
            // Render ellipsis (...) if present
            if (link.label === "...") {
              return (
                <PaginationItem key={index}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            // Render page number links
            if (
              !link.label.includes("&laquo") &&
              !link.label.includes("&raquo")
            ) {
              return (
                <PaginationItem key={index}>
                  <PaginationLink
                    onClick={() => handlePageChange(link.url)}
                    isActive={link.active}
                    className={cn(
                      "text-base font-normal",
                      {
                        "bg-dark-250 pointer-events-none rounded-lg text-white":
                          link.active,
                        "default cursor-pointer text-black": !link.active,
                      },
                      "text-xs font-medium",
                    )}
                  >
                    {link.label}
                  </PaginationLink>
                </PaginationItem>
              );
            }
          })}

          {/* Next Button (always visible, but disabled on last page) */}
          <PaginationItem>
            <AdminPaginationNext
              className={cn(
                "cursor-pointer gap-2 rounded-lg text-xs font-medium text-black",
                paginationData.current_page >= paginationData.last_page &&
                  "pointer-events-none text-dark-550 opacity-50",
              )}
              onClick={() => {
                if (paginationData.current_page < paginationData.last_page) {
                  handlePageChange(paginationData.next_page_url);
                }
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
