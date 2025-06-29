"use client";

import { HeaderActions } from "@/components/admin/jobs/job";
import {
  BREADCRUMB_ADMIN,
  BreadcrumbComposite,
} from "@/components/feature/breadcrumb";
import { Loading } from "@/components/feature/common";
import { Header, HeaderTitle, Section } from "@/components/feature/dashboard";
import { Suspense, useEffect, useRef, useState } from "react";

import { FormJob } from "@/components/admin/jobs/job";
import {
  getJobShow,
  JobDetailsPageType,
} from "@/components/admin/jobs/job/lib";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { useParams, useRouter } from "next/navigation";

const breadcrumbData = [BREADCRUMB_ADMIN.jobs.base, BREADCRUMB_ADMIN.jobs.list];

export default function EditJobPage() {
  const { id } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [jobDetails, setJobDetails] = useState<JobDetailsPageType | null>(null);
  const updatedBreadcrumbData = [...breadcrumbData];
  const formRef = useRef<HTMLFormElement | null>(null);

  if (jobDetails?.name && id) {
    updatedBreadcrumbData.push(
      {
        label: jobDetails?.name,
        link: `/admin/jobs/${id}`,
      },
      BREADCRUMB_ADMIN.jobs.edit,
    );
  }

  useEffect(() => {
    if (!id || Array.isArray(id)) return;
    async function fetchData() {
      setLoading(true);

      try {
        const JobDetailsResponse = await getJobShow(id as string);
        const { data: jobDetails } = JobDetailsResponse ?? {};

        if (!jobDetails) {
          router.replace("/not-found");
          return;
        }

        setJobDetails(jobDetails);
      } catch (error) {
        console.error("Error fetching Job details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id, router]);

  const handleSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  if (loading || !jobDetails) return <>{}</>;
  return (
    <Suspense fallback={<Loading />}>
      <Header className="flex items-center justify-between gap-3">
        <HeaderTitle>求人詳細編集</HeaderTitle>
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
        <FormJob ref={formRef} detail={jobDetails} />
      </Section>

      <ModalMessage />
    </Suspense>
  );
}
