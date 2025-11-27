"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight, Briefcase, Code2 } from "lucide-react";
import { Project } from "@/types";

interface BentoCardProps {
  project: Project;
  index: number;
}

export function BentoCard({ project, index }: BentoCardProps) {
  const isLarge = index === 0 || index === 3;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        layout: { duration: 0.3 },
      }}
      className={`group relative ${isLarge ? "md:col-span-2" : "col-span-1"}`}
    >
      <Link href={`/work/${project.slug}`}>
        <div className="relative h-full min-h-[280px] rounded-2xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 shadow-sm transition-all duration-300 hover:shadow-md hover:border-zinc-300 dark:hover:border-slate-600 hover:-translate-y-1 overflow-hidden">
          {/* Background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-50/50 dark:from-slate-800/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Content */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Top Row: Role Badge & Arrow */}
            <div className="flex items-start justify-between mb-4">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${
                  project.role === "product"
                    ? "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
                    : project.role === "engineering"
                    ? "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                    : "bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-400 border border-violet-200 dark:border-violet-800"
                }`}
              >
                {project.role === "product" ? (
                  <Briefcase size={12} />
                ) : project.role === "engineering" ? (
                  <Code2 size={12} />
                ) : (
                  <>
                    <Briefcase size={12} />
                    <span className="mx-0.5">+</span>
                    <Code2 size={12} />
                  </>
                )}
                {project.roleLabel}
              </span>

              <motion.div
                className="p-2 rounded-full bg-zinc-100 dark:bg-slate-800 text-zinc-400 dark:text-slate-500 group-hover:bg-slate-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-slate-900 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <ArrowUpRight size={16} />
              </motion.div>
            </div>

            {/* Title & Description */}
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors">
                {project.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Tech Stack & Tools */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[...project.techStack.slice(0, 3), ...project.tools.slice(0, 2)].map(
                (item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300 bg-zinc-100 dark:bg-slate-800 rounded-md border border-zinc-200 dark:border-slate-700"
                  >
                    {item}
                  </span>
                )
              )}
              {project.techStack.length + project.tools.length > 5 && (
                <span className="px-2.5 py-1 text-xs font-medium text-slate-400 dark:text-slate-500 bg-zinc-50 dark:bg-slate-800/50 rounded-md">
                  +{project.techStack.length + project.tools.length - 5}
                </span>
              )}
            </div>

            {/* Year */}
            <div className="mt-4 pt-4 border-t border-zinc-100 dark:border-slate-800">
              <span className="text-xs text-slate-400 dark:text-slate-500">{project.year}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

