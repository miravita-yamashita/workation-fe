import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import {
  getRecentData,
  Header,
  HeaderTitle,
  Recent,
  RecentRedirect,
  RecentTableBody,
  RecentTableCell,
  RecentTableHead,
  RecentTableHeader,
  RecentTableRow,
  RecentTitle,
  Section,
  SectionTitle,
  Stat,
  StatCount,
  StatEmphasizedText,
  StatLabel,
  QUICK_LINKS,
  QuickLink,
  QuickLinkButton,
  QuickLinkIcon,
  QuickLinkTitle,
} from "@/components/feature/dashboard";
import { Table } from "@/components/ui/table";
import { GENERIC_NO_DATA } from "@/lib/message-map";
import { cn } from "@/lib/utils";

import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dashboard",
};

const breadcrumbData = [BREADCRUMB_ADMIN.dashboard];

export default async function Page() {
  const [getRecentDataResponse] = await Promise.all([getRecentData()]);

  const { data } = getRecentDataResponse;
  const {
    job_openings = 0,
    applications_count = 0,
    recent_jobs = [],
    inquiries = [],
  } = data || {};

  return (
    <>
      <Header>
        <HeaderTitle>トップ</HeaderTitle>
      </Header>
      <Section>
        <BreadcrumbComposite data={breadcrumbData} className="lg:pb-0" />
      </Section>

      <Section>
        <ColumnContainer className="gap-5">
          <Stat className="max-w-[19.625rem]">
            <StatLabel>今月の応募</StatLabel>
            <StatCount>
              <div className="flex items-end gap-1">
                <StatEmphasizedText>{applications_count}</StatEmphasizedText>
                <span>件</span>
              </div>
            </StatCount>
          </Stat>
          <Stat className="max-w-[19.625rem]">
            <StatLabel>今月の求人</StatLabel>
            <StatCount>
              <div className="flex items-end gap-1">
                <StatEmphasizedText>{job_openings}</StatEmphasizedText>
                <span>件</span>
              </div>
            </StatCount>
          </Stat>
          <div className="w-full"></div>
        </ColumnContainer>
      </Section>

      <Section>
        <ColumnContainer className="flex-row flex-wrap gap-5">
          <Recent className="w-[42.5rem] min-w-[40rem]">
            <ColumnContainer className="mb-5 justify-between">
              <RecentTitle>最近の求人</RecentTitle>
              <RecentRedirect>
                <Link href="/admin/jobs">求人一覧へ</Link>
              </RecentRedirect>
            </ColumnContainer>
            <Table>
              <RecentTableHeader>
                <RecentTableRow className="!border-0">
                  <RecentTableHead className="w-[15rem]">求人</RecentTableHead>
                  <RecentTableHead>施設</RecentTableHead>
                  <RecentTableHead>エリア</RecentTableHead>
                </RecentTableRow>
              </RecentTableHeader>
              <RecentTableBody>
                {recent_jobs?.map(({ id, name, facility, area }) => (
                  <RecentTableRow key={id}>
                    <RecentTableCell className="font-medium">
                      {name}
                    </RecentTableCell>
                    <RecentTableCell>{facility?.name ?? "-"}</RecentTableCell>
                    <RecentTableCell>{area?.label ?? "-"}</RecentTableCell>
                  </RecentTableRow>
                ))}
                {recent_jobs?.length === 0 && (
                  <RecentTableRow>
                    <RecentTableCell>{GENERIC_NO_DATA}</RecentTableCell>
                  </RecentTableRow>
                )}
              </RecentTableBody>
            </Table>
          </Recent>
          <Recent className="w-[25rem] max-w-[25rem]">
            <ColumnContainer className="mb-5 justify-between">
              <RecentTitle>最新お問い合せ</RecentTitle>
              <RecentRedirect>
                <Link href="/admin/inquiries">最新お問い合せ</Link>
              </RecentRedirect>
            </ColumnContainer>
            <Table>
              <RecentTableHeader>
                <RecentTableRow className="!border-0">
                  <RecentTableHead className="w-[240px]">
                    お問い合せ内容
                  </RecentTableHead>
                  <RecentTableHead>ステータス</RecentTableHead>
                </RecentTableRow>
              </RecentTableHeader>
              <RecentTableBody>
                {inquiries?.map((info, index) => (
                  <RecentTableRow key={index}>
                    <RecentTableCell className="font-medium">
                      <p className="line-clamp-1">{info?.details}</p>
                    </RecentTableCell>
                    <RecentTableCell>
                      <span
                        className={cn("", {
                          "text-shade-910": !info?.is_replied,
                        })}
                      >
                        {info?.is_replied ? "対応済み" : "未対応"}
                      </span>
                    </RecentTableCell>
                  </RecentTableRow>
                ))}
                {inquiries?.length === 0 && (
                  <RecentTableRow>
                    <RecentTableCell>{GENERIC_NO_DATA}</RecentTableCell>
                  </RecentTableRow>
                )}
              </RecentTableBody>
            </Table>
          </Recent>
        </ColumnContainer>
      </Section>

      <Section>
        <SectionTitle className="mb-5">クイックリンクス</SectionTitle>
        <div className="flex flex-wrap gap-5">
          {QUICK_LINKS.map((item) => {
            const { id, title, create, list } = item;
            return (
              <QuickLink key={id} className="w-[12.75rem]">
                <div className="flex flex-col gap-2">
                  <QuickLinkTitle>{title}</QuickLinkTitle>
                  <QuickLinkButton>
                    <Link href={create.path}>
                      <QuickLinkIcon />
                      <span>{create.label}</span>
                    </Link>
                  </QuickLinkButton>
                  <QuickLinkButton>
                    <Link href={list.path}>
                      <QuickLinkIcon />
                      <span>{list.label}</span>
                    </Link>
                  </QuickLinkButton>
                </div>
              </QuickLink>
            );
          })}
        </div>
      </Section>
    </>
  );
}
