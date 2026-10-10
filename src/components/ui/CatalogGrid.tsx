"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export interface CatalogItemData {
  _id: string;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
}

interface Props {
  items: CatalogItemData[];
  emptyMessage?: string;
}

export default function CatalogGrid({ items, emptyMessage }: Props) {
  if (items.length === 0) {
    return (
      <div className="glass-card rounded-xl p-10 sm:p-14 text-center max-w-2xl mx-auto">
        <p className="text-gray-400">
          {emptyMessage || "Nothing published yet. Please check back soon."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {items.map((item, index) => {
        const content = (
          <>
            <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-dark-700 via-dark-600 to-dark-700">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : null}
            </div>
            <div className="p-5">
              <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-400 text-sm mt-2 leading-relaxed line-clamp-3">
                {item.description}
              </p>
              {item.url && (
                <span className="inline-block mt-3 text-sm text-cyan-400 group-hover:translate-x-1 transition-transform">
                  View details &rarr;
                </span>
              )}
            </div>
          </>
        );

        const className = "group glass-card rounded-xl overflow-hidden block";

        return item.url ? (
          <motion.a
            key={item._id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className={className}
          >
            {content}
          </motion.a>
        ) : (
          <motion.div
            key={item._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (index % 3) * 0.1 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className={className}
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}
