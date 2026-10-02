"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiCode, HiPencilAlt, HiDeviceMobile, HiShoppingCart, HiSearch,
  HiSpeakerphone, HiCloud, HiClipboardCheck, HiBriefcase, HiLink,
  HiRefresh, HiColorSwatch, HiSupport, HiShieldCheck,
} from "react-icons/hi";

const services = [
  { icon: HiCode, title: "Custom Web Development" },
  { icon: HiPencilAlt, title: "UI/UX Design & Wireframing" },
  { icon: HiDeviceMobile, title: "Mobile App Development" },
  { icon: HiShoppingCart, title: "E-Commerce Solutions" },
  { icon: HiSearch, title: "Search Engine Optimization (SEO)" },
  { icon: HiSpeakerphone, title: "Digital Marketing & Social Media Management" },
  { icon: HiCloud, title: "Cloud & DevOps Services" },
  { icon: HiClipboardCheck, title: "Quality Assurance (QA) & Testing" },
  { icon: HiBriefcase, title: "Enterprise Software & CRM/ERP Development" },
  { icon: HiLink, title: "API Development & Integration" },
  { icon: HiRefresh, title: "Workflow Automation" },
  { icon: HiColorSwatch, title: "Graphic Design & Branding" },
  { icon: HiSupport, title: "Maintenance & Support Services" },
  { icon: HiShieldCheck, title: "Cybersecurity & Data Protection" },
];

const row1 = services.slice(0, 7);
const row2 = services.slice(7);

function ServiceMarquee({ items, reverse }: { items: typeof services; reverse?: boolean }) {
  const reduceMotion = useReducedMotion();
  const displayedItems = reduceMotion ? items : [...items, ...items];

  return (
    <motion.div
      className={
        reduceMotion
          ? "grid grid-cols-1 gap-3 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-3"
          : "flex w-max gap-3 md:gap-4"
      }
      animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
    >
      {displayedItems.map((s, i) => {
        const Icon = s.icon;
        return (
          <div
            key={reduceMotion ? s.title : `${s.title}-${i}`}
            className={`flex min-w-0 items-center gap-3 rounded-2xl glass-card px-4 py-3 md:px-5 ${reduceMotion ? "" : "shrink-0"}`}
          >
            <span className="w-9 h-9 shrink-0 rounded-lg bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center">
              <Icon className="text-cyan-400 text-lg" />
            </span>
            <span className={`text-white text-sm font-medium md:text-base ${reduceMotion ? "whitespace-normal" : "whitespace-nowrap"}`}>
              {s.title}
            </span>
          </div>
        );
      })}
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-dark-800 py-14 sm:py-16">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-dark-800 to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-dark-800 to-transparent sm:w-24" />

      <div className="mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 px-4 text-center sm:mb-10"
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Our Services</span>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
            Everything Your Business Needs <span className="text-gradient">to Go Digital</span>
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Tribal 3 is a full service software house offering custom web development, MERN stack
            engineering, e-commerce builds on Shopify and WordPress, mobile app development, UI/UX
            design, graphic design and branding, SEO, digital marketing, cloud and DevOps, CRM/ERP
            software, API integration and long term maintenance &mdash; under one roof, at fair
            prices.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4 md:gap-5 py-2">
          <ServiceMarquee items={row1} />
          <ServiceMarquee items={row2} reverse />
        </div>
      </div>
    </section>
  );
}