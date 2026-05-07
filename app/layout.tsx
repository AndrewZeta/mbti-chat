import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/src/components/LanguageProvider";
import { LanguageToggle } from "@/src/components/LanguageToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MBTI로 만나는 연애",
  description: "지금, 너랑 가장 잘 맞는 사람은? MBTI 기반 연애 대화 시뮬레이션.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-rose-50/90 via-white to-violet-50/80 text-zinc-900 dark:from-zinc-950 dark:via-zinc-950 dark:to-violet-950/40 dark:text-zinc-50">
        <LanguageProvider>
          <LanguageToggle />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
