"use client";

import {
  getAdminUserDetails,
  HeaderActions,
} from "@/components/admin/user-management";
import { FormUser } from "@/components/admin/user-management/form-user";
import { UserManagementDetailsType } from "@/components/admin/user-management/lib/types";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { useParams, useRouter } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";

const breadcrumbData = [
  BREADCRUMB_ADMIN.userManagement.base,
  BREADCRUMB_ADMIN.userManagement.list,
];

export default function EditUserPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userDetails, setUserDetail] =
    useState<UserManagementDetailsType | null>(null);

  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    async function fetchData() {
      setLoading(true);

      try {
        const userDetailsResponse = await getAdminUserDetails(id as string);
        const { data: userDetails } = userDetailsResponse ?? {};
        if (!userDetails) {
          router.replace("/not-found");
          return;
        }
        setUserDetail(userDetails);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const updatedBreadcrumbData = [...breadcrumbData];

  if (id && userDetails) {
    updatedBreadcrumbData.push(
      {
        label: `${userDetails?.name}`,
        link: `/admin/user-management/${id}`,
      },
      BREADCRUMB_ADMIN.userManagement.edit,
    );
  }

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  if (loading || !userDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>お客様の声編集</HeaderTitle>
        <HeaderActions onSubmit={handleSubmit} toDeleteId={id} />
      </Header>

      <Section>
        <BreadcrumbComposite
          isAdmin={true}
          data={updatedBreadcrumbData}
          className="lg:pb-0"
        />
      </Section>

      <Section>
        <FormUser ref={formRef} detail={userDetails} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
