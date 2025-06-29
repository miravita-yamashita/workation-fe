"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { forgotPasswordFormSchema, requestForgotPassword } from "./lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Link from "next/link";
import { genericAPICallHandler } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const FormPasswordForgot = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof forgotPasswordFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof forgotPasswordFormSchema>) => {
    setIsLoading(true);
    const response = await genericAPICallHandler(() =>
      requestForgotPassword(values.email),
    );
    setIsLoading(false);

    if (response?.success) {
      alert("メールを送信しました");
      router.push("/admin/login");
    } else {
      toast({
        description: response.message,
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="email"
          labelText="メールアドレス"
          variant="secondary"
          isAdmin={true}
          formLabelClassName="font-bold text-base"
        />
        <Button
          type="submit"
          disabled={isLoading}
          variant="admin"
          size="auto"
          className="h-[2.5rem] w-full text-sm leading-none lg:leading-none"
        >
          <span>メールを送信する</span>
        </Button>

        <Link
          href="/admin/login"
          className="flex justify-center font-medium underline"
        >
          ログイン画面に戻る
        </Link>
      </form>
    </Form>
  );
};
