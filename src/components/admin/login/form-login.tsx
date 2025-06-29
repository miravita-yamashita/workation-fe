"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginFormSchema } from "./lib/form-schema";
import { FieldGenericInput } from "@/components/feature/form";
import { Button } from "@/components/ui/button";
import { FieldGenericCheckbox } from "@/components/feature/form/field-generic-checkbox";
import { Form } from "@/components/ui/form";
import {
  handleLogin,
  updateCookieKeepLoggedIn,
  updateKeepLoggedInCookieFlag,
} from "./lib";
import { toast } from "@/hooks/use-toast";
import Link from "next/link";

export const FormLogin = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
      keepMeLoggedIn: false,
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);

    // Set Remember Me / Keep Me Logged In flag first
    updateKeepLoggedInCookieFlag(values.keepMeLoggedIn);

    // Call Auth
    try {
      const response = await handleLogin({ ...values, isAdmin: true });
      // Handle success and false positives
      if (response?.success) {
        // Manipulate the cookie
        updateCookieKeepLoggedIn();
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        toast({
          description: response?.message,
        });
      }
    } catch (error) {
      toast({
        description: String(error),
      });
    } finally {
      setIsLoading(false);

      // Reset flag to false
      updateKeepLoggedInCookieFlag(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FieldGenericInput
          formHook={form}
          formInputName="username"
          labelText="ログインID"
          variant="secondary"
          formInputClassName="w-[360px]"
          isAdmin={true}
          formLabelClassName="font-bold text-base"
        />
        <FieldGenericInput
          formHook={form}
          formInputName="password"
          labelText="パスワード"
          isPasswordField={true}
          variant="secondary"
          formInputClassName="w-[360px]"
          isAdmin={true}
          formLabelClassName="font-bold text-base"
        />

        <div className="flex">
          <FieldGenericCheckbox
            formHook={form}
            formInputName="keepMeLoggedIn"
            labelText="ログイン状態を保持する"
            isHighlighted={false}
            formCheckboxContainerClassName="!border-0"
          />
        </div>

        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={isLoading}
            variant="admin"
            size="auto"
            className="h-[2.5rem] w-full text-sm leading-none lg:leading-none"
          >
            <span>ログイン</span>
          </Button>
        </div>

        <Link
          href="/admin/password-forgot"
          className="flex justify-center font-medium underline"
        >
          パスワードを忘れた方はこちら
        </Link>
      </form>
    </Form>
  );
};
