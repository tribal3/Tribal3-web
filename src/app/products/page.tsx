import type { Metadata } from "next";
import CatalogGrid from "@/components/ui/CatalogGrid";
import { getCatalogItems } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore digital products and solutions built by Tribal 3, the best software house in Karachi. Ready-to-use tools and custom software crafted for modern businesses in Pakistan and worldwide.",
  keywords: [
    "software house in Karachi",
    "best software house in Karachi",
    "software products Karachi",
    "custom software development Karachi",
    "IT company in Karachi",
    "digital products Pakistan",
  ],
  alternates: { canonical: "/products" },
};

export default async function ProductsPage() {
  const products = await getCatalogItems("product");

  return (
    <section className="bg-dark-900 pt-28 sm:pt-32 pb-16 sm:pb-24 min-h-[70vh]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">What We Offer</span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Our <span className="text-gradient">Products</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Handpicked products and solutions from Tribal 3 &mdash; built to help your business
            launch faster, work smarter and grow further.
          </p>
        </div>

        <CatalogGrid
          items={products}
          emptyMessage="No products published yet. Please check back soon."
        />
      </div>
    </section>
  );
}
