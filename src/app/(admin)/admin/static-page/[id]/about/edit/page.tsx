import { auth } from "@/app/auth";
import { getArticleDropdown } from "@/components/admin/posts";
import { getAdminStaticPageDetail } from "@/components/admin/static-page";
import { FormStaticAbout } from "@/components/admin/static-page/edit/about";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { ColumnContainer } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import {
  FormInteractionProvider,
  RemoteSubmitButton,
} from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  const [adminStaticPageDetailResponse, adminPostsNameListResponse] =
    await Promise.all([getAdminStaticPageDetail(id), getArticleDropdown()]);
  const { data: adminStaticPageDetail } = adminStaticPageDetailResponse || {};
  const { data: adminPostsNameList } = adminPostsNameListResponse || {};
  const { title } = adminStaticPageDetail || {};

  const breadcrumbData = [
    BREADCRUMB_ADMIN.dashboard,
    BREADCRUMB_ADMIN.staticPage.list,
    {
      label: title,
      link: id
        ? BREADCRUMB_ADMIN.staticPage.detail.link
            .replace(":slug", "about")
            .replace(":id", id)
        : BREADCRUMB_ADMIN.staticPage.list.link,
    },
  ];
  const updatedBreadcrumbData = [...breadcrumbData];
  if (id) {
    updatedBreadcrumbData.push({
      label: "編集",
      link: "",
    });
  } else {
    updatedBreadcrumbData.push({
      label: "新規作成",
      link: "",
    });
  }

  const session = await auth();

  return (
    <FormInteractionProvider>
      <Header>
        <HeaderTitle>トップページ Top</HeaderTitle>
        <ColumnContainer className="gap-5">
          <Button size="auto" variant="return" asChild>
            <Link href={`/admin/static-page`}>戻る</Link>
          </Button>
          <Button size="auto" variant="return" asChild></Button>
          {session?.user?.isAdmin && <RemoteSubmitButton />}
        </ColumnContainer>
      </Header>
      <Section>
        <BreadcrumbComposite
          data={updatedBreadcrumbData}
          className="lg:pb-0"
          isAdmin={true}
        />
      </Section>
      <Section>
        <Section className="rounded-[.5rem] p-5">
          <FormStaticAbout
            id={id}
            info={adminStaticPageDetail}
            postsNameList={adminPostsNameList}
          />
        </Section>
      </Section>
    </FormInteractionProvider>
  );
}
