"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { queryStringBuilder } from "@/lib/generic-string-builder";
import { cn } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { DesktopBlock, MobileBlock } from "./containers";

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

export function DataPagination({
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

  if (paginationData?.last_page <= 1) return null;

  return (
    <div className={cn("pt-4", className)}>
      <Pagination className="flex w-full justify-between sm:items-center">
        <DesktopBlock className="w-full">
          <PaginationContent className="flex w-full flex-wrap items-center justify-center">
            {paginationData?.links?.map((link, index) => {
              // Render "Previous" button
              if (
                link.label.includes("&laquo") &&
                paginationData.current_page > 1
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationPrevious
                      className="cursor-pointer gap-2 rounded-lg border border-coral-300 bg-white px-4 py-[.3125rem] font-albertsans text-base font-bold text-coral-300 hover:text-coral-300"
                      onClick={() => handlePageChange(link.url)}
                    />
                  </PaginationItem>
                );
              }

              // Render "Next" button
              if (
                link.label.includes("&raquo;") &&
                paginationData.current_page < paginationData.last_page
              ) {
                return (
                  <PaginationItem key={index}>
                    <PaginationNext
                      className="cursor-pointer gap-2 rounded-lg border border-coral-300 bg-white px-4 py-[.3125rem] font-albertsans text-base font-bold text-coral-300 hover:text-coral-300"
                      onClick={() => handlePageChange(link.url)}
                    />
                  </PaginationItem>
                );
              }

              // Render ellipsis (...)
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
                const isLastPage = link.label === `${paginationData.last_page}`;
                const isFirstPage = link.label === "1";
                return (
                  <PaginationItem
                    key={index}
                    className={
                      isLastPage ? "mr-auto" : isFirstPage ? "ml-auto" : ""
                    }
                  >
                    <PaginationLink
                      onClick={() => handlePageChange(link.url)}
                      isActive={link.active}
                      className={cn(
                        "text-base font-normal",
                        {
                          "pointer-events-none rounded-lg bg-coral-300 text-white":
                            link.active,
                          "default cursor-pointer text-coral-300": !link.active,
                        },
                        "font-albertsans font-bold lg:text-base",
                      )}
                    >
                      {link.label}
                    </PaginationLink>
                  </PaginationItem>
                );
              }
            })}
          </PaginationContent>
        </DesktopBlock>
        <MobileBlock className="w-full">
          <div className="flex w-full flex-col justify-between">
            {/* Page numbers */}
            <div className="flex flex-wrap items-center justify-center">
              {paginationData?.links?.map((link, index) => {
                if (
                  !link.label.includes("&laquo") &&
                  !link.label.includes("&raquo")
                ) {
                  return (
                    <PaginationItem key={index} className="list-none">
                      <PaginationLink
                        onClick={() => handlePageChange(link.url)}
                        isActive={link.active}
                        className={cn(
                          "text-base font-normal",
                          {
                            "pointer-events-none rounded-lg bg-coral-300 text-white":
                              link.active,
                            "default cursor-pointer text-coral-300":
                              !link.active,
                          },
                          "font-albertsans font-bold lg:text-base",
                        )}
                      >
                        {link.label}
                      </PaginationLink>
                    </PaginationItem>
                  );
                }
              })}
            </div>

            {/* Previous and Next buttons */}
            <div className="mt-5 flex">
              {paginationData.current_page > 1 && (
                <PaginationItem className="mr-auto list-none">
                  <PaginationPrevious
                    className="cursor-pointer gap-2 rounded-lg border border-coral-300 bg-white px-4 py-[.3125rem] font-albertsans text-base font-bold text-coral-300 hover:text-coral-300"
                    onClick={() =>
                      handlePageChange(paginationData.prev_page_url)
                    }
                  />
                </PaginationItem>
              )}
              {paginationData.current_page < paginationData.last_page && (
                <PaginationItem className="ml-auto list-none">
                  <PaginationNext
                    className="cursor-pointer gap-2 rounded-lg border border-coral-300 bg-white px-4 py-[.3125rem] font-albertsans text-base font-bold text-coral-300 hover:text-coral-300"
                    onClick={() =>
                      handlePageChange(paginationData.next_page_url)
                    }
                  />
                </PaginationItem>
              )}
            </div>
          </div>
        </MobileBlock>
      </Pagination>
    </div>
  );
}
