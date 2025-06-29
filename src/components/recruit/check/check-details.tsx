"use client";

import {
  DetailPanel,
  DetailPanelTitle,
  DetailPanelInfo,
  DetailPanelAction,
} from "@/components/feature/detail";
import { DetailComposite } from "@/components/feature/detail/detail-composite";
import {
  useFormJobDetailsStore,
  useJobDetailsStore,
} from "@/components/feature/form/form-job";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { submitFormJobApplication } from "./lib/actions";
import { formatResponseError } from "@/lib/utils";

export const CheckDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formValues = useFormJobDetailsStore.getState().formValues;
  const {
    jobNumber,
    lastName,
    firstName,
    sei,
    may,
    dobDay,
    dobMonth,
    dobYear,
    postCode,
    address,
    telephoneNumber,
    email,
    inquiryDetailsTypes,
    jobQualificationsTypes,
    inquiryContent,
  } = formValues;
  const hasStoredValues = useFormJobDetailsStore.getState().hasStoredValues;
  const jobDetailsValues = useJobDetailsStore.getState().jobDetails;
  const { jobId } = jobDetailsValues;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await submitFormJobApplication(formValues);

      if (!response?.success) {
        toast({
          description: formatResponseError(response.message),
        });
        return;
      }
      router.push("/recruit/thanks");
    } catch (error) {
      toast({
        description: String(error),
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasStoredValues) {
    return (
      <div>
        <p className="mb-2.5 text-lg">データが保存されていません。</p>
        <Button
          variant="form"
          size="auto"
          className="w-full bg-shade-350 text-white lg:max-w-[18.75rem]"
          asChild
        >
          <Link href="#">内容を変更する</Link>
        </Button>
      </div>
    );
  }

  return (
    <DetailPanel>
      <DetailPanelTitle>ユーザーの情報</DetailPanelTitle>
      <DetailPanelInfo>
        <DetailComposite label="求人番号" value={jobNumber} />
        <DetailComposite
          label="問い合わせ内容"
          value={inquiryDetailsTypes.join(", ")}
        />
        <DetailComposite
          label="問い合わせ内容"
          value={jobQualificationsTypes.join(", ")}
        />
        <DetailComposite label="求人番号" value={`${lastName} ${firstName}`} />
        <DetailComposite label="問い合わせ内容" value={`${sei} ${may}`} />
        <DetailComposite
          label="生年月日"
          value={`${dobYear}年${dobMonth}月${dobDay}日`}
        />
        <DetailComposite label="ご住所（郵便番号）" value={postCode} />
        <DetailComposite label="ご住所" value={address} />
        <DetailComposite label="電話番号" value={telephoneNumber} />
        <DetailComposite label="メールアドレス" value={email} />
        <DetailComposite label="お問い合わせ内容" value={inquiryContent} />
      </DetailPanelInfo>

      <DetailPanelAction>
        <Button
          disabled={isLoading}
          variant="form"
          size="auto"
          className="w-full bg-shade-350 text-white lg:max-w-[18.75rem]"
          asChild
        >
          <Link href={`/result/${jobId}?persist=true`}>内容を変更する</Link>
        </Button>
        <Button
          disabled={isLoading}
          variant="form"
          size="auto"
          className="w-full text-white lg:max-w-[18.75rem]"
          onClick={handleSubmit}
        >
          送信する
        </Button>
      </DetailPanelAction>
    </DetailPanel>
  );
};
