"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/three/Scene3D";

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden sm:min-h-screen">
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/30 to-dark-900" />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-24 pb-10 text-center sm:px-6 sm:pt-28 sm:pb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* <span className="inline-block text-lg tracking-[0.25em] uppercase text-cyan-400/70 mb-4 border border-cyan-400/20 rounded-full px-4 py-1.5">
            Tribal 3
          </span> */}
          <h1 className="max-w-5xl mx-auto text-4xl font-bold leading-[1.05] text-white sm:text-6xl sm:leading-[1.05] md:text-[5.625rem] lg:text-[6.75rem]">
            Premium Digital{" "}
            <span className="block sm:inline">
              <span className="text-gradient">Solutions</span>
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-base font-bold leading-relaxed text-black sm:mt-8 sm:text-xl md:text-[2.25rem]">
            Shaping The Future Of Digital Experience Through Technology
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-7 grid grid-cols-1 gap-3 min-[380px]:grid-cols-2 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-4"
          >
            <a
              href="#services"
              className="flex min-h-11 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-4 py-3 text-center text-sm font-medium text-cyan-300 transition-colors hover:bg-cyan-500/30 sm:px-6 sm:text-base"
            >
              Our Services
            </a>
            <a
              href="#about"
              className="flex min-h-11 items-center justify-center rounded-xl border border-gray-600/40 px-4 py-3 text-center text-sm font-medium text-gray-300 transition-colors hover:border-gray-600/60 sm:px-6 sm:text-base"
            >
              About Us
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

  );
}