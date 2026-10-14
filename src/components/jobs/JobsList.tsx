"use client";

import { motion } from "framer-motion";
import { HiBriefcase, HiMail, HiUserGroup } from "react-icons/hi";
import { SITE_EMAIL, mailComposeUrl } from "@/lib/seo";

export interface JobItem {
  _id: string;
  title: string;
  description: string;
  seats?: number;
}

export default function JobsList({ jobs }: { jobs: JobItem[] }) {
  if (jobs.length === 0) {
    return (
      <div className="glass-card mx-auto max-w-2xl rounded-xl p-10 text-center sm:p-14">
        <p className="text-gray-400">
          No open positions right now. Check back soon &mdash; or email us your resume at{" "}
          <a
            href={mailComposeUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300"
          >
            {SITE_EMAIL}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5">
      {jobs.map((job, i) => {
        const seats = job.seats ?? 0;
        const applyUrl = mailComposeUrl(`Application for ${job.title}`);
        return (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-card rounded-2xl border border-dark-600/60 p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-500/10">
                  <HiBriefcase className="text-lg text-cyan-400" />
                </span>
                <h2 className="text-lg font-bold text-white sm:text-xl">{job.title}</h2>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-300">
                <HiUserGroup className="text-sm" />
                {seats} {seats === 1 ? "Seat" : "Seats"}
              </span>
            </div>

            <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-gray-400">
              {job.description}
            </p>

            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-5 py-2.5 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30"
            >
              <HiMail className="text-base" />
              Apply via Email
            </a>
          </motion.div>
        );
      })}
    </div>
  );
}
