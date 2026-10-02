"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { value: "05+", label: "Years of Experience" },
  { value: "50+", label: "Projects Completed" },
  { value: "98%", label: "Client Satisfaction" },
];

export default function About() {
  return (
    <section id="about" className="relative bg-dark-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 items-center gap-10 px-4 sm:px-6 sm:gap-12 lg:grid-cols-2">
        {/* Left: Image collage */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-3 sm:space-y-4">
              <div className="overflow-hidden rounded-xl border border-dark-600 sm:rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1603201667141-5a2d4c673378?w=500&q=80"
                  alt="Creative team collaborating"
                  width={500}
                  height={500}
                  sizes="(max-width: 640px) 45vw, 25vw"
                  className="h-36 w-full object-cover sm:h-48"
                />
              </div>
              <div className="overflow-hidden rounded-xl border border-dark-600 sm:rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=500&q=80"
                  alt="Project showcase"
                  width={500}
                  height={500}
                  sizes="(max-width: 640px) 45vw, 25vw"
                  className="h-32 w-full object-cover sm:h-40"
                />
              </div>
            </div>
            <div className="pt-5 sm:pt-8">
              <div className="overflow-hidden rounded-xl border border-dark-600 sm:rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=500&q=80"
                  alt="Team collaboration"
                  width={500}
                  height={500}
                  sizes="(max-width: 640px) 45vw, 25vw"
                  className="h-48 w-full object-cover sm:h-64"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Text + Stats */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">About Us</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Your 360&deg; Digital <span className="text-gradient">Solutions Partner</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-gray-400 sm:text-base">
            Tribal 3 is a full-service software house providing 360&deg; digital solutions &mdash; from web development, app development, and digital marketing to content creation, graphic design, and every service that transforms businesses from physical to digital. We help brands establish, grow, and scale their online presence end to end.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3 sm:flex sm:flex-wrap sm:gap-8">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-2xl font-bold text-gradient sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs leading-snug text-gray-500 sm:text-sm">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:flex sm:flex-wrap sm:gap-4">
<a
              href="#contact"
              className="flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-4 py-3 text-center text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/30 sm:px-6"
            >
              Get Started
            </a>
            <a
              href="#services"
              className="flex min-h-11 items-center justify-center rounded-xl border border-gray-600/40 px-4 py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-gray-400/60 sm:px-6"
            >
              Our Services
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
