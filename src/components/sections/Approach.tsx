"use client";

import { motion, useReducedMotion } from "framer-motion";
import { HiStar } from "react-icons/hi";

const testimonials = [
  {
    name: "Ali Raza",
    role: "Founder, Online Clothing Store",
    text: "They built our online store in just a few weeks. Orders started coming in right away, and the site is easy for our team to update.",
  },
  {
    name: "Ayesha Khan",
    role: "Restaurant Owner",
    text: "The booking page they made is simple and fast. Our customers can now reserve a table from their phone without any trouble.",
  },
  {
    name: "Hassan Malik",
    role: "Real Estate Agent",
    text: "Our property listings finally look professional online. We get better leads now and the site loads really quickly.",
  },
  {
    name: "Sana Tariq",
    role: "Beauty Salon Owner",
    text: "They handled our website and social media together. Everything looks clean and consistent, and new clients book through Instagram.",
  },
  {
    name: "Bilal Ahmed",
    role: "Startup Founder",
    text: "Clear communication and on-time delivery. They understood our budget and still gave us a product that works well.",
  },
  {
    name: "Zainab Ali",
    role: "Online Boutique Owner",
    text: "The team walked us through everything step by step. Now my shop runs smoothly on mobile and desktop.",
  },
  {
    name: "Omar Farooq",
    role: "Gym Owner",
    text: "They set up a membership page where people can sign up on their own. It saves us hours every single week.",
  },
  {
    name: "Mariam Qureshi",
    role: "Marketing Lead",
    text: "Their designs are clean and the developers are quick to respond. Working with them has been very easy.",
  },
  {
    name: "Danish Javed",
    role: "Business Consultant",
    text: "Our agency website looks much more professional now. Clients trust us more and we receive better inquiries.",
  },
  {
    name: "Farhan Sheikh",
    role: "Online Tutor",
    text: "They helped me set up my course website. Now my students can pay and access their lessons without any hassle.",
  },
];

const row1 = testimonials.slice(0, 5);
const row2 = testimonials.slice(5);

function TestimonialCard({ t, staticLayout = false }: { t: (typeof testimonials)[number]; staticLayout?: boolean }) {
  return (
    <div className={`${staticLayout ? "w-full" : "w-[calc(100vw-2rem)] sm:w-96"} shrink-0 rounded-2xl glass-card p-4 sm:p-6`}>
      <div className="mb-3 flex gap-1 sm:mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <HiStar key={i} className="text-sm text-cyan-400" />
        ))}
      </div>
      <p className="text-sm leading-relaxed text-gray-300">&ldquo;{t.text}&rdquo;</p>
      <div className="mt-4 flex min-w-0 items-center gap-3 sm:mt-5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-xs font-bold text-[#ffffff]">
          {t.name.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white">{t.name}</p>
          <p className="truncate text-xs text-gray-500">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

function TestimonialMarquee({ items, reverse }: { items: typeof testimonials; reverse?: boolean }) {
  const reduceMotion = useReducedMotion();
  const displayedItems = reduceMotion ? items : [...items, ...items];

  return (
    <motion.div
      className={
        reduceMotion
          ? "grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
          : "flex w-max gap-4 md:gap-5"
      }
      animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
    >
      {displayedItems.map((t, i) => (
        <TestimonialCard key={reduceMotion ? t.name : `${t.name}-${i}`} t={t} staticLayout={Boolean(reduceMotion)} />
      ))}
    </motion.div>
  );
}

export default function Approach() {
  return (
    <section className="relative overflow-hidden bg-dark-800 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-dark-800 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-dark-800 to-transparent sm:w-24" />

      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 px-4 text-center sm:mb-10"
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Testimonials</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            What Our <span className="text-gradient">Clients Say</span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-5 py-2">
          <TestimonialMarquee items={row1} />
          <TestimonialMarquee items={row2} reverse />
        </div>
      </div>
    </section>
  );
}