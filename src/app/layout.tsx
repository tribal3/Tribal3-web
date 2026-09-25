import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Tribal 3 | Premium Digital Experiences",
  description: "MERN Stack · Graphics Design · Digital Marketing · Shopify · WordPress · AI Integration",
  keywords: "web development, MERN stack, digital agency, 3D websites, UI/UX design",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
