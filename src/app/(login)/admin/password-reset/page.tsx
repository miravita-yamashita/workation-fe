import { FormPasswordReset } from "@/components/admin/password-reset";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Reset Password",
};
type PageProps = {
  searchParams: Promise<Record<string, string>>;
};
export default async function Page({ searchParams }: PageProps) {
  const { email, token } = await searchParams;

  if (!email || !token) {
    return notFound();
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <section className="w-[27.5rem] border border-shade-250 p-10">
        <p className="mb-5 text-center text-xl font-bold leading-normal">
          パスワードの再設定
        </p>
        <FormPasswordReset email={email} token={token} />
      </section>
    </div>
  );
}
