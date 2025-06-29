"use client";

import {
  ColumnContainer,
  ColumnItem,
  LabelBlock,
  LabelFieldBlock,
  Spinner,
} from "@/components/feature/common";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabelGroup,
} from "@/components/feature/form";
import { FieldMultipleCheckboxAdmin } from "@/components/feature/form/field-multiple-checkbox-admin";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { mapToCategoryFormat } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { getAdminAreaNameList, JobSelectOptionsType } from "../jobs/job/lib";
import {
  createAndUpdateFacility,
  FacilityDetailsType,
  FacilityFormSchema,
  MedicalSpecialty,
} from "./lib";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  medCat: MedicalSpecialty[];
  detail?: FacilityDetailsType | null;
};

export const FormFacility = forwardRef<HTMLFormElement, Props>(
  ({ medCat, detail }, ref) => {
    const router = useRouter();
    const isEditMode = Boolean(detail);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [emailAlreadyRegistered, setEmailAlreadyRegistered] = useState(false);
    const [phoneAlreadyRegistered, sePhoneAlreadyRegistered] = useState(false);
    const [areaNameList, setAreaNameList] = useState<JobSelectOptionsType[]>();

    const form = useForm<z.infer<typeof FacilityFormSchema>>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(FacilityFormSchema),
      defaultValues: {
        name: detail?.name || "",
        email: detail?.email || "",
        phoneNumber: detail?.phone_number || "",
        prefecture: detail?.prefecture?.value.toString() || "",
        addressCity: detail?.address_city || "",
        addressStreet: detail?.address_street || "",
        access: detail?.access || "",
        map: detail?.map || "",
        medicalSubjectCategories:
          (detail?.medical_subject_categories.map(
            (cat) => cat.id,
          ) as string[]) || "",
        noEmployees: detail?.no_employees.toString() || "",
        recordMethod: detail?.record_method || "",
        noBeds: detail?.no_beds.toString() || "",
        nursingStandard: detail?.nursing_standard || "",
        parkingLot: detail?.parking_lot || "",
      },
    });

    const { isDirty, isSubmitting } = form.formState;
    useUnsavedPrompt({
      isDirty: isDirty && !isSubmitting,
      formRef: ref as React.RefObject<HTMLFormElement | null>,
    });

    useEffect(() => {
      let isMounted = true; // Prevents state updates if unmounted

      async function fetchData() {
        try {
          const [areaNameListResponse] = await Promise.all([
            getAdminAreaNameList(),
          ]);

          if (isMounted) {
            setAreaNameList((prev) =>
              prev?.length === areaNameListResponse?.data?.length
                ? prev // Prevent unnecessary updates
                : mapToCategoryFormat(areaNameListResponse?.data || []),
            );
          }
        } catch (error) {
          console.error("Error fetching medical categories:", error);
        } finally {
          if (isMounted) setIsPageLoading(false);
        }
      }

      fetchData();

      return () => {
        isMounted = false;
      };
    }, []);

    const onSubmit = async (values: z.infer<typeof FacilityFormSchema>) => {
      const afterSubmissionPath = "/admin/facilities";
      setIsLoading(true);

      try {
        let response;
        if (isEditMode && detail?.id) {
          response = await createAndUpdateFacility({ ...values }, detail?.id);
        } else {
          response = await createAndUpdateFacility({ ...values });
        }

        if (response?.success) {
          router.push(afterSubmissionPath);
          form.reset();
          router.refresh();
          setEmailAlreadyRegistered(false);
        } else {
          if (
            response?.errors?.email?.some(
              (error: string) => error === "既に登録されています",
            )
          ) {
            setEmailAlreadyRegistered(true);
            form.setFocus("email");
          } else {
            setEmailAlreadyRegistered(false);
          }

          if (
            response?.errors?.phone_number?.some(
              (error: string) =>
                error ===
                "ティーピーボーンナンバーは他県に比べて全てレアでした。",
            )
          ) {
            sePhoneAlreadyRegistered(true);
            form.setFocus("phoneNumber");
          } else {
            sePhoneAlreadyRegistered(false);
          }
        }
      } catch (error) {
        toast({
          description: `${String(error)}`,
        });
      } finally {
        setIsLoading(false);
      }
    };
    if (isPageLoading)
      return (
        <Spinner className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
      );

    return (
      <Form {...form}>
        <form
          ref={ref}
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <div className="relative min-h-[95vh] w-full rounded border p-5">
            <ColumnContainer className="justify-between">
              <ColumnItem className="w-full max-w-[46.875rem] space-y-5">
                <FieldGenericInput
                  formHook={form}
                  formInputName="name"
                  labelText="名称【必須】"
                  variant="secondary"
                  formInputClassName="w-full font-infer"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />
                <ColumnContainer className="gap-5">
                  <ColumnItem className="flex-1">
                    <FieldGenericInput
                      formHook={form}
                      formInputName="email"
                      labelText="メールアドレス"
                      placeholder="sample@company.com"
                      variant="secondary"
                      isAdmin={true}
                      formItemClassName="w-full "
                      formLabelClassName="font-bold text-base"
                      formInputClassName="w-full font-infer"
                    />

                    {emailAlreadyRegistered && (
                      <p className="mt-2 text-sm font-normal leading-normal text-red-300">
                        既に登録されています
                      </p>
                    )}
                  </ColumnItem>
                  <ColumnItem className="flex-1">
                    <FieldGenericInput
                      formHook={form}
                      formInputName="phoneNumber"
                      labelText="電話番号【ハイフンあり】"
                      placeholder="000-0000-0000"
                      variant="secondary"
                      isAdmin={true}
                      formItemClassName="w-full  font-inter"
                      formLabelClassName="font-bold text-base"
                    />
                    {phoneAlreadyRegistered && (
                      <p className="mt-2 text-sm font-normal leading-normal text-red-300">
                        既に登録されています
                      </p>
                    )}
                  </ColumnItem>
                </ColumnContainer>
                <FieldLabelGroup className="max-w-[22.8125rem]">
                  <AdminFieldGenericSelect
                    formHook={form}
                    formInputName="prefecture"
                    labelText="都道府県【必須】"
                    selectPlaceholder="選択してください"
                    variant="secondary"
                    isAdmin={true}
                    dropdownValues={areaNameList || []}
                    formLabelClassName="font-bold text-base"
                    selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                    formItemClassName="text-base font-inter"
                  />
                </FieldLabelGroup>

                <FieldGenericInput
                  formHook={form}
                  formInputName="addressCity"
                  labelText="市区町村【必須】"
                  placeholder=""
                  variant="secondary"
                  isAdmin={true}
                  formItemClassName="w-full "
                  formLabelClassName="font-bold text-base"
                  formInputClassName="font-inter text-base"
                />

                <FieldGenericInput
                  formHook={form}
                  formInputName="addressStreet"
                  labelText="番地"
                  variant="secondary"
                  formInputClassName="w-full  font-inter text-base"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />

                <FieldGenericTextArea
                  formHook={form}
                  formInputName="access"
                  labelText="アクセス【必須】"
                  textAreaClassName="w-full  font-inter"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />

                <FieldGenericInput
                  formHook={form}
                  formInputName="map"
                  labelText="Google Mapリンク【必須】"
                  variant="secondary"
                  formInputClassName="w-full  font-inter"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />

                <LabelFieldBlock>
                  <LabelBlock variant="empty" className="text-black">
                    診療科目【必須】
                  </LabelBlock>
                  <FieldMultipleCheckboxAdmin
                    formHook={form}
                    formInputName="medicalSubjectCategories"
                    items={medCat}
                  />
                </LabelFieldBlock>
                <FieldLabelGroup className="relative max-w-[22.8125rem]">
                  <FieldGenericInput
                    formHook={form}
                    formInputName="noEmployees"
                    labelText="職員数【必須】"
                    variant="secondary"
                    formInputClassName="w-full  !pr-[2.6rem]  font-inter"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <p className="absolute right-[.8125rem] top-[2.625rem] font-inter text-base">
                    名
                  </p>
                </FieldLabelGroup>
                <FieldGenericInput
                  formHook={form}
                  formInputName="recordMethod"
                  labelText="記録方式【必須】"
                  variant="secondary"
                  formInputClassName="w-full  font-inter"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />
                <FieldLabelGroup className="relative max-w-[22.8125rem]">
                  <FieldGenericInput
                    formHook={form}
                    formInputName="noBeds"
                    labelText="病床数【必須】"
                    variant="secondary"
                    formInputClassName="w-full  !pr-[2.6rem]  font-inter"
                    isAdmin={true}
                    placeholder=""
                    formLabelClassName="font-bold text-base"
                  />
                  <p className="absolute right-[.8125rem] top-[2.625rem] font-inter text-base">
                    床
                  </p>
                </FieldLabelGroup>

                <FieldGenericInput
                  formHook={form}
                  formInputName="nursingStandard"
                  labelText="看護基準【必須】"
                  variant="secondary"
                  formInputClassName="w-full  font-inter"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />

                <FieldGenericInput
                  formHook={form}
                  formInputName="parkingLot"
                  labelText="駐車場【必須】"
                  variant="secondary"
                  formInputClassName="w-full font-inter"
                  isAdmin={true}
                  placeholder=""
                  formLabelClassName="font-bold text-base"
                />

                <div className="mt-5 text-right">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    variant="admin"
                    size="auto"
                    className="mr-[10rem] h-[2.5rem] min-w-[7.5rem] bg-[#357DC9] p-3 text-sm leading-none hover:opacity-75 lg:leading-none"
                  >
                    <span>保存</span>
                  </Button>
                </div>
              </ColumnItem>
            </ColumnContainer>
          </div>
        </form>
      </Form>
    );
  },
);

FormFacility.displayName = "FormFacility";
