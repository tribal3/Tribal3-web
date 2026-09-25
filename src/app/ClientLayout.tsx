"use client";

import { ReactNode } from "react";
import ScrollProgress from "@/components/ui/ScrollProgress";
import BackToTop from "@/components/ui/BackToTop";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>{children}</main>
      <BackToTop />
      <Footer />
    </>
  );
}
