"use client";

import { motion } from "framer-motion";
import { FilterCategory } from "@/types";
import { Briefcase, Code2, Layers } from "lucide-react";

interface ProjectFilterProps {
  activeFilter: FilterCategory;
  onFilterChange: (filter: FilterCategory) => void;
}

const filters: { value: FilterCategory; label: string; icon: React.ReactNode }[] = [
  { value: "all", label: "All Work", icon: <Layers size={16} /> },
  { value: "product", label: "Product", icon: <Briefcase size={16} /> },
  { value: "engineering", label: "Engineering", icon: <Code2 size={16} /> },
];

export function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  return (
    <div className="flex items-center justify-center gap-2 p-1.5 bg-zinc-100/80 dark:bg-slate-800/80 rounded-full border border-zinc-200/60 dark:border-slate-700/60">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${
            activeFilter === filter.value
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
          }`}
        >
          {activeFilter === filter.value && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-white dark:bg-slate-700 rounded-full shadow-sm border border-zinc-200/60 dark:border-slate-600/60"
              transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {filter.icon}
            <span className="hidden sm:inline">{filter.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

