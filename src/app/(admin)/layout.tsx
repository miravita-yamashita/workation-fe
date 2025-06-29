import { MediaUploadComposite } from "@/components/feature/media-upload";
import { SideMenuComposite } from "@/components/feature/side-menu";
import { UnsavedPrompt } from "@/components/feature/unsaved-prompt";
import { SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <section className="pl-[18.75rem]">
        <SideMenuComposite />
        <div>{children}</div>
      </section>
      <MediaUploadComposite />
      <UnsavedPrompt />
    </SessionProvider>
  );
}
