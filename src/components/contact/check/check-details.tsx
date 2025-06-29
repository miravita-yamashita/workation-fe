"use client";

import {
  DetailPanel,
  DetailPanelAction,
  DetailPanelInfo,
  DetailPanelTitle,
} from "@/components/feature/detail";
import { DetailComposite } from "@/components/feature/detail/detail-composite";
import { useFormGeneralStore } from "@/components/feature/form/form-general/lib/store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { submitFormGeneral } from "./lib/actions";
import { InquiryFromType } from "../lib";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { formatResponseError } from "@/lib/utils";
import { useRouter } from "next/navigation";

export const CheckDetails = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const formValues = useFormGeneralStore.getState().formValues;
  const {
    lastName,
    firstName,
    sei,
    may,
    telephoneNumber,
    email,
    inquiryTypes,
    inquiryContent,
  } = formValues;
  const hasStoredValues = useFormGeneralStore.getState().hasStoredValues;

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await submitFormGeneral(
        InquiryFromType.General,
        formValues,
      );
      
      if (!response?.success) {
        toast({
          description: formatResponseError(response.message),
        });

        return;
      }

      router.push("/contact/thanks");
      
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
          <Link href="/contact?persist=true">内容を変更する</Link>
        </Button>
      </div>
    );
  }

  return (
    <DetailPanel>
      <DetailPanelTitle>ユーザーの情報</DetailPanelTitle>
      <DetailPanelInfo>
        <DetailComposite label="お名前" value={`${lastName} ${firstName}`} />
        <DetailComposite label="フリガナ" value={`${sei} ${may}`} />
        <DetailComposite label="電話番号" value={telephoneNumber} />
        <DetailComposite label="メールアドレス" value={email} />
        <DetailComposite
          label="お問い合わせの種類"
          value={inquiryTypes.join(", ")}
        />
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
          <Link href="/contact?persist=true">内容を変更する</Link>
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
