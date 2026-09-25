"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const places = [
  {
    name: "New York, USA",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Paris, France",
    img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Dubai, UAE",
    img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "London, UK",
    img: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Tokyo, Japan",
    img: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Sydney, Australia",
    img: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=600&auto=format&fit=crop",
  },
];

export default function Expertise() {
  return (
    <section className="relative bg-dark-800 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-14"
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Our Reach</span>
          <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl md:text-5xl">
            Delivering <span className="text-gradient">Innovations Worldwide</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray-400 sm:text-base">
            Tribal 3 works with businesses in every corner of the world. Wherever you are, we provide complete digital
            solutions &mdash; from websites and apps to marketing and design &mdash; so you can grow your business online.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {places.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-dark-600 sm:rounded-2xl"
            >
              <Image
                src={p.img}
                alt={p.name}
                fill
                sizes="(max-width: 359px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                <p className="text-sm font-semibold text-white sm:text-base">{p.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}