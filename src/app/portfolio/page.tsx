import type { Metadata } from "next";
import CatalogGrid from "@/components/ui/CatalogGrid";
import { getCatalogItems } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse the portfolio of Tribal 3, a leading software house in Karachi. See websites, mobile apps and digital experiences we have designed and engineered for clients worldwide.",
  keywords: [
    "software house in Karachi",
    "best software house in Karachi",
    "web development portfolio Karachi",
    "web development company in Karachi",
    "mobile app development Karachi",
    "SEO services in Karachi",
  ],
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const portfolio = await getCatalogItems("portfolio");

  return (
    <section className="bg-dark-900 pt-28 sm:pt-32 pb-16 sm:pb-24 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Our Work</span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our <span className="text-gradient">Portfolio</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
            A look at the projects we have delivered &mdash; from sleek marketing sites to full
            stack web apps, designed and engineered by Tribal 3.
          </p>
        </div>

        <CatalogGrid
          items={portfolio}
          emptyMessage="Portfolio coming soon. Please check back later."
        />
      </div>
    </section>
  );
}
