import "./globals.scss";
import React from "react";
import { basicGrotesquePro } from "@/styles/font";

import { CursorProvider } from "@/providers/CursorProvide";

import Footer from "@/components/shared/footer/Footer";
import PageTransition from "@/components/shared/transition-page/PageTransition";
import { Metadata } from "next";
import Loader from "@/components/shared/loader/Loader";
import { GoogleTagManager } from "@next/third-parties/google";
import { DynamicCursor, DynamicNav } from "@/components/dynamic/DynamicComponents";
export const metadata: Metadata = {
  title: "SVAROG COMPLEX",
  description: "Відпочинок на який Ви розраховуєте",
  icons: {
    icon: [
      {
        url: "/assets/icons/Favicon.svg",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/assets/icons/Favicon.svg",
        media: "(prefers-color-scheme: light)",
      },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <GoogleTagManager gtmId="GTM-T3G9B5BM" />
      <body className={basicGrotesquePro.className}>
        <CursorProvider>
          <DynamicNav />
          {children}
          <Footer />
          <DynamicCursor />
          <Loader />
          <PageTransition />
        </CursorProvider>
      </body>
    </html>
  );
}
