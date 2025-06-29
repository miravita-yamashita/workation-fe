import { cn, getUniqueId } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import { socials as socialsValues } from "@/lib/static-datasource";
import { SocialsConfig } from "./lib";

export type SocialsProps = {
  socials: SocialsConfig[];
  iconOnly?: boolean;
  useWhiteIcons?: boolean;
  className?: string;
};

export const SocialsBlock = ({
  socials = socialsValues,
  iconOnly = false,
  useWhiteIcons = false,
  className = "",
}: SocialsProps) => {
  const sortedSocials = socials.sort(
    (a, b) => (a.displayOrder ?? 0) - (b.displayOrder ?? 0),
  );

  return (
    <div className={cn("flex gap-2", className)}>
      {sortedSocials?.map(
        (
          { icon, iconWhite, href = "#", label, socialClassName, onClick },
          index,
        ) => {
          const { height = "", width = "" } =
            typeof socialClassName === "object" && socialClassName !== null
              ? (socialClassName as { height?: string; width?: string })
              : {};

          return (
            <Link
              key={getUniqueId(index.toString())}
              href={href}
              onClick={onClick}
            >
              <div
                className={cn("flex items-center justify-center gap-2", {
                  "rounded-xl bg-white px-[.875rem] py-3 lg:max-w-[5.9375rem]":
                    !iconOnly,
                })}
              >
                {/* Icon */}
                <div
                  className="relative flex"
                  style={
                    height && width
                      ? { height, width }
                      : { height: "1.5rem", width: "1.5rem" }
                  }
                >
                  <Image
                    src={useWhiteIcons ? iconWhite || "" : icon || ""}
                    alt={label ? `${label} social icon` : "social icon"}
                    fill
                  />
                </div>
                {/* Label */}
                {!iconOnly && label && (
                  <span className="block font-albertsans text-[.625rem] font-bold">
                    {label}
                  </span>
                )}
              </div>
            </Link>
          );
        },
      )}
    </div>
  );
};
