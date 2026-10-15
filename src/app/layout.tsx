import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import StructuredData from "@/components/StructuredData";
import { DESCRIPTION, KEYWORDS, SITE_NAME, SITE_URL, TITLE } from "@/lib/seo";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-8K0RVY0S2J";
const GOOGLE_SITE_VERIFICATION =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
  process.env.GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: KEYWORDS,
  applicationName: SITE_NAME,
  category: "technology",
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@tribal3tech",
    creator: "@tribal3tech",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
  verification: GOOGLE_SITE_VERIFICATION
    ? { google: GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: {
    brand: "Tribal 3",
    "alternate-name": "Tribal 3, Tribal3, Tribal 3 Tech, Tribal3tech, Tribal Three",
    "og:site_name": SITE_NAME,
  },
};

export const viewport: Viewport = {
  themeColor: "#e9f3ff",
  colorScheme: "light",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <StructuredData />
        <GoogleAnalytics gaId={GA_ID} />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}