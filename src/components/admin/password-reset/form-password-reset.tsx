"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { formPasswordResetSchema } from "./lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { requestChangePassword } from "./lib";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

export const FormPasswordReset = ({
  token,
  email,
}: {
  token: string;
  email: string;
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof formPasswordResetSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(formPasswordResetSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formPasswordResetSchema>) => {
    setIsLoading(true);

    const response = await requestChangePassword(values, token, email);

    setIsLoading(false);

    if (response?.success) {
      router.push("/admin/login");
    } else {
      toast({
        description: response?.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="password"
          labelText="新パスワード"
          variant="secondary"
          isAdmin={true}
          formLabelClassName="font-bold text-base"
          isPasswordField={true}
        />
        <FieldGenericInput
          formHook={form}
          formInputName="confirmPassword"
          labelText="新パスワード（確認）"
          variant="secondary"
          isAdmin={true}
          formLabelClassName="font-bold text-base"
          isPasswordField={true}
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="admin"
          size="auto"
          className="h-[2.5rem] w-full text-sm leading-none lg:leading-none"
        >
          <span>パスワードを再設定する</span>
        </Button>
      </form>
    </Form>
  );
};
