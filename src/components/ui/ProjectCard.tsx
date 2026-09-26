"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ProjectData } from "@/data/projects";

interface Props {
  project: ProjectData;
  index: number;
}

export default function ProjectCard({ project, index }: Props) {
  const imageSrc = project.imageUrl || "";

  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.01 }}
      className="group glass-card rounded-xl overflow-hidden block"
    >
      <div className="aspect-video bg-gradient-to-br from-dark-700 via-dark-600 to-dark-700 relative overflow-hidden">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt={project.title}
            fill
            className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-500" />
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span
            className={`text-xs px-2 py-0.5 rounded-full ${
              project.category === "top-notch"
                ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400/30"
                : "bg-blue-500/20 text-blue-300 border border-blue-400/30"
            }`}
          >
            {project.category === "top-notch" ? "Featured" : "Portfolio"}
          </span>
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mt-1.5 line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-xs px-2 py-0.5 rounded bg-dark-600 text-gray-300 border border-dark-500"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
}
