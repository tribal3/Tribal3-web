import type { Metadata } from "next";
import JobsList from "@/components/jobs/JobsList";
import { getCatalogItems } from "@/lib/catalog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Careers",
  description:
    "Join the Tribal 3 team, a top software house in Karachi. Explore careers and open roles in web development, mobile apps, design, SEO and digital marketing, and apply today.",
  keywords: [
    "software house in Karachi",
    "best software house in Karachi",
    "IT jobs in Karachi",
    "software house jobs Karachi",
    "web developer jobs Karachi",
    "developer jobs in Karachi",
  ],
  alternates: { canonical: "/jobs" },
};

export default async function JobsPage() {
  const jobs = await getCatalogItems("job");

  return (
    <section className="min-h-[70vh] bg-dark-900 pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-10 text-center sm:mb-14">
          <span className="text-sm uppercase tracking-[0.2em] text-cyan-400">Careers</span>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Join Our <span className="text-gradient">Team</span>
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
            We are always looking for talented people who love building great digital
            products. Explore our open positions below and apply today.
          </p>
        </div>

        <JobsList jobs={jobs} />
      </div>
    </section>
  );
}
