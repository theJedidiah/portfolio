"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { useTheme } from "./theme-provider";

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.3 + i * 0.05,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export function Hero() {
  const { theme } = useTheme();
  const name = "jedidiah.";

  return (
    <section className="relative min-h-screen bg-stone-100 dark:bg-slate-950 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Left Content */}
          <div className="flex flex-col justify-center px-6 sm:px-12 lg:px-16 py-32 lg:py-0 lg:ml-[48px]">
            {/* Role Tag */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg sm:text-xl text-teal-600 dark:text-teal-400 font-medium mb-4"
            >
              Product Manager & Developer
            </motion.p>

            {/* Name */}
            <motion.h1
              key={theme}
              initial="hidden"
              animate="visible"
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-serif font-normal text-slate-900 dark:text-white tracking-tight leading-[1.05] mb-8 overflow-hidden"
            >
              {name.split("").map((letter, i) => (
                <motion.span
                  key={`${letter}-${i}`}
                  custom={i}
                  variants={letterVariants}
                  className="inline-block"
                  style={{ display: letter === " " ? "inline" : "inline-block" }}
                >
                  {letter}
                </motion.span>
              ))}
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="border-l-2 border-slate-300 dark:border-slate-600 pl-6 max-w-md"
            >
              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
                jedidiah. is an accomplished product manager and developer with a knack for creating smarter and enriching digital experiences for people and businesses.
              </p>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 text-slate-900 dark:text-white font-medium hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                <span className="text-sm uppercase tracking-wider">View My Work</span>
                <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Right Image */}
          <div className="relative hidden lg:block">
            {/* Decorative shapes */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute bottom-0 left-0 w-48 h-48 bg-teal-600 dark:bg-teal-500 rounded-tr-[80px] z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute top-1/3 right-0 w-24 h-32 bg-amber-400 dark:bg-amber-500 z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute bottom-1/4 left-1/4 w-16 h-16 bg-slate-800 dark:bg-slate-700 rounded-full z-0"
            />

            {/* Main Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative h-full w-full"
            >
              <Image
                src="/hero-image.jpg"
                alt="jedidiah."
                fill
                className="object-cover object-center"
                priority
              />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Mobile decorative element */}
      <div className="lg:hidden absolute bottom-0 right-0 w-32 h-32 bg-teal-600 dark:bg-teal-500 rounded-tl-[60px]" />
    </section>
  );
}

