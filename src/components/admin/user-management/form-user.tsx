"use client";

import { ColumnContainer, ColumnItem } from "@/components/feature/common";
import { SectionHeading } from "@/components/feature/common/section-heading";
import {
  AdminFieldGenericSelect,
  FieldGenericInput,
  FieldGenericTextArea,
  FieldLabel,
  FieldLabelGroup,
  FieldLabelLine,
  FieldLabelText,
} from "@/components/feature/form";
import { useUnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { Form } from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { forwardRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createUpdateUser, userFormSchema, userFormUpdateSchema } from "./lib";
import { UserManagementDetailsType } from "./lib/types";
import ThumbnailUpload from "./thumbnail-upload";

export type MedCatType = {
  id: string;
  value: string;
  label: string;
};

type Props = {
  detail?: UserManagementDetailsType | null;
};

export const FormUser = forwardRef<HTMLFormElement, Props>(
  ({ detail }, ref) => {
    const router = useRouter();
    const isEditMode = Boolean(detail);
    const schema = detail ? userFormUpdateSchema : userFormSchema;
    const form = useForm<z.infer<typeof schema>>({
      mode: "onBlur",
      reValidateMode: "onBlur",
      resolver: zodResolver(schema),
      defaultValues: {
        name: detail?.name || "",
        email: detail?.email.toString() || "",
        role: detail?.role || "",
        note: detail?.note || "",
        password: "",
        confirmPassword: "",
        thumbnail: detail?.avatar?.id
          ? [
              {
                id: String(detail.avatar?.id),
                url: detail.avatar?.url ?? null,
              },
            ]
          : undefined,
      },
    });

    const { isDirty, isSubmitting } = form.formState;
    useUnsavedPrompt({
      isDirty: isDirty && !isSubmitting,
      formRef: ref as React.RefObject<HTMLFormElement | null>,
    });

    const onSubmit = async (values: z.infer<typeof schema>) => {
      const afterSubmissionPath =
        isEditMode && detail?.id
          ? `/admin/user-management/${detail?.id}`
          : "/admin/user-management";
      try {
        let response;
        if (isEditMode && detail?.id) {
          response = await createUpdateUser({ ...values }, detail?.id);
        } else {
          response = await createUpdateUser({ ...values });
        }

        if (response?.success) {
          router.push(afterSubmissionPath);
          router.refresh();
        } else {
          toast({
            description: response?.message,
          });
        }
      } catch (error) {
        toast({
          description: `${String(error)}`,
        });
      } finally {
      }
    };

    const rolesData = [
      {
        id: "閲覧者",
        label: "閲覧者",
        value: "Viewer",
      },
      {
        id: "管理者",
        label: "管理者 ",
        value: "Administrator",
      },
    ];

    return (
      <>
        <div className="relative w-full">
          <Form {...form}>
            <form
              ref={ref}
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="flex gap-5">
                <div className="w-full flex-1 rounded border p-5">
                  <ColumnContainer className="justify-between">
                    <ColumnItem className="w-full space-y-5">
                      <SectionHeading title="ユーザーの情報" />
                      <FieldGenericInput
                        formHook={form}
                        formInputName="name"
                        labelText="名前【必須】"
                        variant="secondary"
                        formInputClassName="w-full"
                        isAdmin={true}
                        placeholder=""
                        formLabelClassName="font-bold text-base"
                      />
                      <FieldGenericInput
                        isAdmin={true}
                        formHook={form}
                        formInputName="email"
                        labelText="メールアドレス【必須】"
                        placeholder="sample@company.com"
                        variant="secondary"
                        formItemClassName="w-full"
                        formLabelClassName="font-bold text-base"
                      />
                      <FieldLabelGroup className="max-w-[22.1875rem]">
                        <AdminFieldGenericSelect
                          formHook={form}
                          formInputName="role"
                          labelText="権限"
                          selectPlaceholder="選択してください"
                          variant="secondary"
                          isAdmin={true}
                          dropdownValues={rolesData}
                          selectTriggerClassName="!rounded-[.3125rem] h-[2.8125rem] border-[#cccccc]"
                          formLabelClassName="font-bold text-base"
                        />
                      </FieldLabelGroup>

                      <FieldGenericInput
                        formHook={form}
                        formInputName="password"
                        labelText="パスワード"
                        variant="secondary"
                        isAdmin={true}
                        formLabelClassName="font-bold text-base"
                        isPasswordField={true}
                      />
                      <FieldGenericInput
                        formHook={form}
                        formInputName="confirmPassword"
                        labelText="パスワード【確認用】"
                        variant="secondary"
                        isAdmin={true}
                        formLabelClassName="font-bold text-base"
                        isPasswordField={true}
                      />

                      <FieldLabelGroup>
                        <FieldGenericTextArea
                          formHook={form}
                          formInputName="note"
                          labelText="備考"
                          placeholder=""
                          textAreaClassName="h-[5rem]"
                          isAdmin={true}
                        />
                      </FieldLabelGroup>
                    </ColumnItem>
                  </ColumnContainer>
                </div>
                <div className="w-[19.375rem] self-start rounded border p-5">
                  <FieldLabelGroup className="flex flex-col gap-4">
                    <FieldLabel>
                      <FieldLabelText>サムネイル</FieldLabelText>
                      <FieldLabelLine />
                    </FieldLabel>
                    <ThumbnailUpload
                      formHook={form}
                      formInputName="thumbnail"
                    />
                  </FieldLabelGroup>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </>
    );
  },
);

FormUser.displayName = "FormUser";
