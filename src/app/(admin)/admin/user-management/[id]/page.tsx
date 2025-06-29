import { JobTypecolumn } from "@/components/admin/jobs/job/lib";
import {
  getAdminUserDetails,
  HeaderActions,
  TableDetail,
} from "@/components/admin/user-management";
import { UserManagementDetailsType } from "@/components/admin/user-management/lib/types";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import ImageNoPhoto from "@public/image-no-photo.jpg";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.userManagement.base,
  BREADCRUMB_ADMIN.userManagement.list,
];

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function UserDetailPage({ params }: PageProps) {
  const { id } = (await params) || {};

  const [userDetailsResponse]: [{ data: UserManagementDetailsType } | null] =
    await Promise.all([getAdminUserDetails(id)]);

  const userDetails: UserManagementDetailsType | null =
    userDetailsResponse?.data ?? null;

  if (!userDetails) notFound();

  const updatedBreadcrumbData = [...breadcrumbData];

  if (id) {
    updatedBreadcrumbData.push({
      label: userDetails?.name,
      link: ``,
    });
  }

  const userDetailsData: JobTypecolumn[] = [
    {
      id: "1",
      label: "名前",
      value: userDetails?.name ?? "",
    },
    {
      id: "2",
      label: "メールアドレス",
      value: userDetails.email ?? "",
    },
    {
      id: "3",
      label: "権限",
      value: userDetails?.role ?? "",
    },
    {
      id: "4",
      label: "備考",
      value: userDetails?.note ?? "",
    },
  ];

  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>ユーザー情報詳細</HeaderTitle>
        <HeaderActions toDeleteId={id} toEdit={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={updatedBreadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <div className="relative w-full rounded border p-5">
          <div className="mb-8 flex items-center gap-5 rounded-[.5rem] border border-[#E4E4E4] p-5">
            <div className="relative h-[5rem] w-[5rem] overflow-hidden rounded-full bg-gray-200">
              <Image
                className="object-cover"
                src={userDetails?.avatar?.url || ImageNoPhoto}
                fill
                sizes="100%"
                alt={`Image of ${userDetails?.name}`}
              />
            </div>
            <div>
              <h2 className="mb-[.625rem] text-xl font-bold leading-[1.875rem]">
                {userDetails?.name}
              </h2>
              <div className="font-inter text-base leading-[1.375rem]">
                {userDetails.role}
              </div>
            </div>
          </div>
          <SectionHeading title="ユーザーの情報" />
          <TableDetail column={userDetailsData} />
        </div>
      </Section>
      <ModalMessage />
    </Suspense>
  );
}
