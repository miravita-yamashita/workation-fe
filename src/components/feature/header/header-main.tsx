"use client";

import { cn, getUniqueId } from "@/lib/utils";
import { HeaderLogo } from "./header-logo";
import { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { headerLinks } from "@/lib/static-datasource";
import { HeaderInformation } from "./header-information";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import IconHamburgerMenu from "@public/header/icon-hamburger-menu.svg";
import IconClose from "@public/icon-close.svg";
import IconCaret from "@public/icon-caret.svg";
import IconStar from "@public/icon-star.svg";
import { ImageBlock, ImageItem, MainBlock } from "../common";
import { formatEngagementCount, useEngagement } from "../engagement";
import {
  HeaderContactCorporate,
  HeaderContactInformation,
  HeaderContactUs,
} from "./header-contact-us";
import { headerInformationValues } from "@/lib/static-datasource/hamburger-contact-links-values";
import { SocialsBlock } from "../socials";
import { socials } from "@/lib/static-datasource";
import IconFooterArrowBox from "@public/icon-footer-arrow-box-white.svg";

type LayoutProps = PropsWithChildren & { className?: string };

const MobileActions = ({ children, className }: LayoutProps) => {
  return <div className={cn("flex lg:hidden", className)}>{children}</div>;
};

const HeaderRight = ({ children, className }: LayoutProps) => {
  return (
    <div className={cn("flex items-center gap-2.5 lg:gap-5", className)}>
      {children}
    </div>
  );
};

// NOTE: Commenting this for now as I am not sure if this is needed as composite.
/** 
type MenuItem = {
  label: string;
  url: string;
};

const HeaderItem = (item: MenuItem) => {
  return (
    <Link
      href={item.url}
      className="flex items-center justify-between border-b-shade-350 py-3 text-[.9375rem] font-medium text-black"
    >
      <span>{item.label}</span>
      <div className="relative h-4 w-4">
        <Image src={IconCaret} alt="menu" fill />
      </div>
    </Link>
  );
};
*/

/**
 * Renders the main header component of the application.
 * It includes the header information, a logo, and navigation links
 * for both desktop and mobile views.
 *
 * The desktop version displays a horizontal navigation bar with links,
 * while the mobile version includes a toggleable menu.
 */

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <HeaderInformation />
      <div className="bg-white py-3 lg:py-5">
        <MainBlock size="sm" className="lg:p-0">
          <header className="flex justify-between lg:mx-auto lg:max-h-[5rem] lg:px-10 lg:py-[1.5625rem] lg:shadow-[0_4px_20px_rgba(145,145,145,0.15)] xl:py-[1.25rem]">
            <Link href="/" onClick={() => setIsMenuOpen(false)}>
              <HeaderLogo />
            </Link>
            <HeaderRightDesktop />
            <HeaderRightMobile
              isMenuOpen={isMenuOpen}
              setIsMenuOpen={setIsMenuOpen}
            />
          </header>
        </MainBlock>
      </div>
    </>
  );
};

const HeaderRightDesktop = ({ className }: LayoutProps) => {
  return (
    <div className={cn("hidden lg:flex", className)}>
      <HeaderRight className="lg:gap-10">
        {headerLinks?.map(({ url, label }, index) => (
          <Link key={getUniqueId(index.toString())} href={url}>
            <span className="font-yugothic text-sm font-medium text-black">
              {label}
            </span>
          </Link>
        ))}
      </HeaderRight>
    </div>
  );
};

const HeaderRightMobile = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (isMenuOpen: boolean) => void;
}) => {
  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // TODO: to remove
  // Needed this to prevent scrolling when the menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const { engagementCount } = useEngagement();

  return (
    <>
      <MobileActions>
        <Button
          className="h-auto p-0"
          onClick={handleMenuToggle}
          variant="empty"
        >
          {isMenuOpen ? (
            <div className="relative h-4 w-4">
              <Image src={IconClose} alt="menu" fill />
            </div>
          ) : (
            <div className="relative h-6 w-6">
              <Image src={IconHamburgerMenu} alt="menu" fill />
            </div>
          )}
        </Button>
      </MobileActions>

      <div
        className={cn(
          "absolute right-0 top-[7.5rem] z-30 mx-auto flex h-full w-full flex-col overflow-y-scroll bg-white px-4 py-5 lg:hidden lg:p-5",
          {
            hidden: !isMenuOpen,
          },
        )}
      >
        <div className="grid grid-cols-3 gap-2">
          <JobsInfoBlock
            icon={IconStar}
            label="キープ"
            count={formatEngagementCount(engagementCount.savedJob)}
          />
          <JobsInfoBlock
            label="最近見た"
            count={formatEngagementCount(engagementCount.recentlyViewJob)}
          />
          <JobsInfoBlock
            label="保存した条件"
            count={formatEngagementCount(engagementCount.savedSearch)}
          />
        </div>
        <ul>
          {headerLinks?.map((item) => (
            <li
              key={getUniqueId()}
              className="border-b-[.0625rem] border-shade-500 lg:border-0"
            >
              <Link
                href={item?.url}
                onClick={handleMenuToggle}
                className="flex items-center justify-between border-b-shade-350 py-3 text-[.9375rem] font-medium text-black"
              >
                <span>{item?.label}</span>
                <div className="relative h-4 w-4">
                  <Image src={IconCaret} alt="menu" fill />
                </div>
              </Link>
            </li>
          ))}
          <HeaderContactUs className="mt-5 h-full w-full bg-pink-200 px-4">
            <span className="mb-[.625rem] flex w-full justify-center pt-5 text-[20px] font-bold leading-[2rem] text-white">
              お問い合わせ
            </span>
            <HeaderContactInformation className="mx-auto w-full max-w-[21.4375rem] gap-[.375rem]">
              {headerInformationValues?.map(({ imgSrc, alt, url }, index) => (
                <Link href={url} key={index} onClick={handleMenuToggle}>
                  <ImageBlock className="relative h-[5rem] w-full sm:m-auto sm:max-w-[21.4375rem]">
                    <ImageItem
                      src={imgSrc}
                      altText={alt}
                      className="rounded-xl object-cover"
                    />
                  </ImageBlock>
                </Link>
              ))}
            </HeaderContactInformation>
            <p className="font-xs mb-[.625rem] mt-7 text-left font-albertsans font-medium uppercase text-white">
              FOLLOW US
            </p>

            <SocialsBlock
              socials={socials}
              iconOnly={true}
              useWhiteIcons={true}
              className="gap-[1.875rem] lg:gap-[1.625rem]"
            />

            <HeaderContactCorporate className="mt-5 w-full flex-row items-center gap-[.5rem]">
              <p className="block text-sm font-medium text-white">
                コーポレートサイト
              </p>
              <ImageBlock className="relative h-3 w-3">
                <ImageItem
                  src={IconFooterArrowBox}
                  altText="icon test tube"
                  className="object-contain"
                />
              </ImageBlock>
            </HeaderContactCorporate>
          </HeaderContactUs>
        </ul>
      </div>
    </>
  );
};

export const JobsInfoBlock = ({ label = "", count = "", icon = "" }) => {
  return (
    <div className="mb-3 rounded bg-red-100 py-3 text-center font-albertsans font-bold text-white">
      <div className="label flex justify-center gap-1 text-sm">
        {icon && <Image src={icon} alt="icon" width={14} height={14} />}
        <div className="text">{label}</div>
      </div>
      <div className="count text-[1.625rem]">{count}</div>
    </div>
  );
};
