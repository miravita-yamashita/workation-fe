"use client";

import {
  DetailPanel,
  DetailPanelAction,
  DetailPanelInfo,
  DetailPanelTitle,
} from "@/components/feature/detail";
import { DetailComposite } from "@/components/feature/detail/detail-composite";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useFormHospitalStore } from "@/components/feature/form";
import { submitFormHospital } from "./lib";
import { InquiryFromType } from "@/components/contact";


export const CheckDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formValues = useFormHospitalStore.getState().formValues;
  const {
    companyName,
    sei,
    may,
    facilityName,
    personInChargeLastName,
    personInChargeFirstName,
    postCode,
    address,
    telephoneNumber,
    email,
    inquiryContent,
  } = formValues;
  const hasStoredValues = useFormHospitalStore.getState().hasStoredValues;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await submitFormHospital(
        InquiryFromType.Hospital,
        formValues,
      );
      
      if (!response?.success) {
        toast({
          description: formatResponseError(response.message),
        });

        return;
      }

      router.push("/contact-hospital/thanks");
      
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
          <Link href="/contact-hospital">内容を変更する</Link>
        </Button>
      </div>
    );
  }

  return (
    <DetailPanel>
      <DetailPanelTitle>ユーザーの情報</DetailPanelTitle>
      <DetailPanelInfo>
        <DetailComposite label="法人名" value={`${companyName}`} />
        <DetailComposite label="病院・施設名" value={facilityName} />
        <DetailComposite
          label="ご担当者様名"
          value={`${personInChargeLastName} ${personInChargeFirstName}`}
        />
        <DetailComposite label="フリガナ" value={`${sei} ${may}`} />
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
          <Link href="/contact-hospital?persist=true">内容を変更する</Link>
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
