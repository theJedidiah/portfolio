"use client";

import { motion } from "framer-motion";

const coreSkills = [
  { name: "HTML & CSS", level: 90 },
  { name: "React", level: 80 },
  { name: "JavaScript", level: 75 },
  { name: "Figma", level: 85 },
  { name: "Responsive Design", level: 90 },
  { name: "API Integration", level: 70 },
];

const additionalExperience = [
  "Agile / Scrum",
  "Product Strategy",
  "User Journey Mapping",
  "A/B Testing",
  "Google Analytics",
  "Mixpanel",
  "GitHub",
  "Fintech & Payments",
  "KYC Flows",
  "Mobile POS",
];

export function WhatIBringSection() {
  return (
    <section id="what-i-bring" className="py-24 px-6 bg-zinc-50/70 dark:bg-slate-900/40">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-[#6F4E37] dark:text-coffee-300 mb-3">
            What I bring
          </p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white">
            Skills
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            {coreSkills.map((skill) => (
              <div key={skill.name}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-slate-800 dark:text-slate-200 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="w-full h-2.5 bg-zinc-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-[#6F4E37] dark:bg-coffee-400 rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-6 sm:p-8"
          >
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-5">
              Also experienced in
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {additionalExperience.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full text-sm font-medium text-slate-700 dark:text-slate-300 bg-zinc-100 dark:bg-slate-800 border border-zinc-200 dark:border-slate-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
