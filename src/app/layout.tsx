import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./global-rich-text.css";
import { Albert_Sans } from "next/font/google";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Toaster } from "@/components/ui/toaster";

const yuGothic = localFont({
  src: [
    { path: "../fonts/YuGothic-Regular.ttf", weight: "400" },
    { path: "../fonts/YuGothic-Medium.ttf", weight: "500" },
    { path: "../fonts/YuGothic-Bold.ttf", weight: "700" },
  ],
  variable: "--font-yu-gothic",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-albertsans",
  preload: false,
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: false,
});

export const metadata: Metadata = {
  title: "Vacation Nurse",
  description: "Vacation Nurse",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${yuGothic.variable} ${albertSans.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Script
          src="https://yubinbango.github.io/yubinbango/yubinbango.js"
          strategy="beforeInteractive"
        />
        <Toaster />
      </body>
    </html>
  );
}
