import { FormPasswordForgot } from "@/components/admin/password-forgot/form-password-forgot";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Forgot Password",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="w-[27.5rem] border border-shade-250 p-10">
        <p className="mb-5 text-center text-xl font-bold leading-normal">
          パスワードを忘れた場合
        </p>
        <FormPasswordForgot />
      </section>
    </div>
  );
}
