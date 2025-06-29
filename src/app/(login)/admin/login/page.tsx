import { FormLogin } from "@/components/admin/login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="flex h-screen items-center justify-center">
      <section className="w-auto border border-shade-250 p-10">
        <p className="mb-5 text-center text-xl font-bold leading-normal">
          ログイン
        </p>
        <FormLogin />
      </section>
    </div>
  );
}
