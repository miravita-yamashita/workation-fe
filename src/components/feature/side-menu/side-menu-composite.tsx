"use client";

import { CommonProps } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  SideMenu,
  SideMenuFooter,
  SideMenuHeader,
  SideMenuIcon,
  SideMenuItem,
  SideMenuLink,
  SideMenuList,
  SideMenuSection,
  SideMenuSectionTitle,
  SideMenuSubTitle,
  SideMenuTitle,
} from "./side-menu";
import { ADMIN_MENU_ITEMS, OTHER_MENU_SETTINGS } from "./lib/static-values";
import { usePathname } from "next/navigation";
import { ProfileAvatar, ProfileName, ProfilePosition } from "./profile";
import Image from "next/image";
import IconAvatar from "@public/icon-avatar.svg";
import { ColumnContainer, ColumnItem } from "../common";
import { Button } from "@/components/ui/button";
import { handleLogout } from "@/components/admin/login";
import { useSession } from "next-auth/react";

export const SideMenuComposite = ({ className }: CommonProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <SideMenu className={cn("bg-shade-210", className)}>
      <SideMenuHeader>
        <div className="flex max-w-[8.75rem] flex-col items-center">
          <SideMenuTitle>ワーケーションナース</SideMenuTitle>
          <SideMenuSubTitle>WORKATION NURSE</SideMenuSubTitle>
        </div>
      </SideMenuHeader>

      <section className="relative h-[78%] overflow-y-auto">
        <SideMenuSection className="mb-5">
          <SideMenuList>
            {ADMIN_MENU_ITEMS.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <SideMenuItem key={item.id}>
                  <SideMenuLink path={item.path} isActive={isActive}>
                    <div className="flex gap-1.5">
                      <SideMenuIcon />
                      {item.label}
                    </div>
                  </SideMenuLink>
                </SideMenuItem>
              );
            })}
          </SideMenuList>
        </SideMenuSection>
        <SideMenuSection>
          <SideMenuSectionTitle>その他の設定</SideMenuSectionTitle>
          <SideMenuList>
            {OTHER_MENU_SETTINGS.map((item) => {
              const isActive = pathname.includes(item.path);
              return (
                <SideMenuItem key={item.id}>
                  <SideMenuLink path={item.path} isActive={isActive}>
                    <div className="flex gap-1.5">
                      <SideMenuIcon />
                      {item.label}
                    </div>
                  </SideMenuLink>
                </SideMenuItem>
              );
            })}
          </SideMenuList>
        </SideMenuSection>
      </section>

      <SideMenuFooter className="absolute bottom-0 w-full bg-shade-210">
        <ColumnContainer className="items-center justify-between gap-2.5">
          <ColumnItem className="flex shrink-0 items-center gap-3">
            <ProfileAvatar className="relative h-10 w-10 overflow-hidden rounded-full">
              <Image
                src={session?.user?.avatar || IconAvatar}
                alt="avatar"
                fill
                sizes="100%"
              />
            </ProfileAvatar>
            <div className="flex flex-col gap-1">
              <ProfileName>{session?.user?.name}</ProfileName>
              <ProfilePosition>管理者</ProfilePosition>
            </div>
          </ColumnItem>
          <ColumnItem>
            <Button
              variant="empty"
              className={cn("p-0 text-shade-910", className)}
              onClick={() => {
                handleLogout();
              }}
            >
              ログアウト
            </Button>
          </ColumnItem>
        </ColumnContainer>
      </SideMenuFooter>
    </SideMenu>
  );
};
