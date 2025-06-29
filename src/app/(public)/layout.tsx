import {
  AnalyticsGoogle,
  AnalyticsMicrosoftClarity,
} from "@/components/analytics";
import { EngagementComposite } from "@/components/feature/engagement/engagement-composite";
import { Footer } from "@/components/feature/footer";
import { Header } from "@/components/feature/header";
import { ModalApplication } from "@/components/feature/modal/modal-application";
import { ModalMessage } from "@/components/feature/modal/modal-message";
import { Onboarding } from "@/components/feature/onboarding";
import { Metadata } from "next";
import { Suspense } from "react";

// For Analytics
export const metadata: Metadata = {
  other: {
    "google-site-verification": "QT_s93wcQDBzi6jpkYYnrRKyfRWumYRFAAoQuYfgYBM",
  },
};

export default function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen w-full flex-col">
      <AnalyticsGoogle />
      <AnalyticsMicrosoftClarity />
      <Header />
      <div className="flex-1 bg-ivory-100">{children}</div>
      <Footer />
      <Onboarding />
      <Suspense>
        <ModalMessage />
      </Suspense>
      <ModalApplication />

      <EngagementComposite />
    </section>
  );
}
