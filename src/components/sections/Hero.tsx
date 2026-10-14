"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  HiCode,
  HiDeviceMobile,
  HiColorSwatch,
  HiCloud,
  HiLightningBolt,
} from "react-icons/hi";
import Scene3D from "@/components/three/Scene3D";

const trust = [
  { value: "50+", label: "Projects" },
  { value: "30+", label: "Clients" },
  { value: "5+", label: "Years" },
];

const chips = [
  { icon: HiCode, label: "Web" },
  { icon: HiDeviceMobile, label: "Apps" },
  { icon: HiColorSwatch, label: "Design" },
  { icon: HiCloud, label: "Cloud" },
];

const bars = [42, 66, 48, 82, 58, 92, 74];

function GrowthPanel() {
  const reduceMotion = useReducedMotion();
  const C = 2 * Math.PI * 42;

  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-[30rem]">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/25 via-blue-500/10 to-transparent blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative glass-card rounded-3xl border border-cyan-400/20 p-5 shadow-2xl sm:p-6"
      >
        <div className="mb-5 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-500/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-cyan-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent" />
          <span className="ml-3 flex-1 truncate rounded-full border border-dark-600/60 bg-dark-900/60 px-3 py-1 text-[11px] text-gray-500">
            tribal3.digital/dashboard
          </span>
        </div>

        <div className="flex items-center justify-between gap-4 rounded-2xl border border-dark-600/50 bg-dark-900/50 p-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.2em] text-gray-500">
              Live Projects
            </p>
            <p className="mt-1 text-4xl font-bold text-gradient sm:text-5xl">48</p>
            <p className="mt-1 text-xs font-medium text-cyan-400">
              +12 this quarter
            </p>
          </div>
          <div className="relative h-24 w-24 shrink-0">
            <svg viewBox="0 0 100 100" className="h-24 w-24 -rotate-90">
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="9"
                className="stroke-dark-600"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                strokeWidth="9"
                strokeLinecap="round"
                className="stroke-accent"
                strokeDasharray={C}
                initial={{ strokeDashoffset: reduceMotion ? C * 0.02 : C }}
                animate={{ strokeDashoffset: C * 0.02 }}
                transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold text-white">
              98%
            </span>
          </div>
        </div>

        <div className="mt-4 flex h-28 items-end gap-2 rounded-2xl border border-dark-600/50 bg-dark-900/50 p-4">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              className="flex-1 rounded-t-md bg-gradient-to-t from-cyan-500/30 to-accent"
              initial={{ height: reduceMotion ? `${h}%` : 0, opacity: 0 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 + i * 0.08, ease: "easeOut" }}
            />
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-dark-600/50 bg-dark-900/50 p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
              Uptime
            </p>
            <p className="mt-1 text-xl font-bold text-white">99.9%</p>
          </div>
          <div className="rounded-2xl border border-dark-600/50 bg-dark-900/50 p-4">
            <p className="text-[11px] uppercase tracking-[0.15em] text-gray-500">
              Growth
            </p>
            <p className="mt-1 text-xl font-bold text-gradient">+64%</p>
          </div>
        </div>
      </motion.div>

      {chips.map((chip, i) => {
        const Icon = chip.icon;
        const positions = [
          "-left-5 top-16",
          "-right-4 top-8",
          "-left-4 bottom-24",
          "-right-5 bottom-40",
        ];
        return (
          <motion.div
            key={chip.label}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + i * 0.12 }}
            className={`absolute ${positions[i]} hidden items-center gap-2 rounded-xl glass-card border border-cyan-400/20 px-3 py-2 shadow-lg sm:flex`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/15">
              <Icon className="text-cyan-400" />
            </span>
            <span className="text-xs font-semibold text-white">{chip.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pt-24 pb-14 sm:pt-28 sm:pb-20">
      <Scene3D />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-900/70 via-dark-900/55 to-dark-900" />
      <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/80 to-dark-900/30" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-500/10 px-4 py-1.5 text-xs font-medium tracking-[0.2em] text-cyan-300 uppercase">
            <HiLightningBolt className="text-sm" />
            360&deg; Digital Solutions
          </span>

          <h1 className="mx-auto mt-5 max-w-2xl text-4xl font-bold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:mx-0 lg:text-[4.25rem]">
            We Turn Ideas Into{" "}
            <span className="text-gradient">Digital Reality</span>
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-gray-400 sm:text-lg lg:mx-0">
            Your best software house in Karachi &mdash; web, apps, design, cloud and
            marketing. Shaping the future of digital experience through technology.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 min-[400px]:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#contact"
              className="flex min-h-12 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-300 transition-colors hover:bg-cyan-500/30 sm:text-base"
            >
              Start Your Project
            </a>
            <a
              href="#services"
              className="flex min-h-12 items-center justify-center rounded-xl border border-dark-600/60 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-cyan-400/40 hover:text-cyan-300 sm:text-base"
            >
              Explore Services
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex items-center justify-center gap-8 lg:justify-start"
          >
            {trust.map((t) => (
              <div key={t.label} className="text-center lg:text-left">
                <p className="text-2xl font-bold text-gradient sm:text-3xl">
                  {t.value}
                </p>
                <p className="mt-1 text-xs text-gray-500 sm:text-sm">{t.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <GrowthPanel />
      </div>
    </section>
  );
}
