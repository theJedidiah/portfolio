"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "./theme-provider";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Logo - Fixed top left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-2 left-6 sm:left-12 lg:left-16 z-50"
      >
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="jedidiah."
            width={96}
            height={96}
            className="dark:invert dark:brightness-200 dark:sepia dark:hue-rotate-[340deg]"
          />
        </Link>
      </motion.div>

      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 hidden md:block"
      >
        <nav
          className={`rounded-full border px-2 py-2 transition-all duration-300 ${isScrolled
              ? "bg-white/90 dark:bg-[#1a1412]/90 backdrop-blur-xl border-zinc-200/80 dark:border-white/10 shadow-lg shadow-zinc-900/5 dark:shadow-black/40"
              : "bg-white/70 dark:bg-[#1a1412]/70 backdrop-blur-lg border-zinc-200/50 dark:border-white/5"
            }`}
        >
          <div className="flex items-center justify-center">
            {/* Desktop Navigation */}
            <ul className="flex items-center gap-1">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${active
                          ? "text-white bg-[#6F4E37] shadow-md shadow-[#6F4E37]/20"
                          : "text-zinc-600 dark:text-zinc-300 hover:text-[#6F4E37] dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10"
                        }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
              {/* Theme Toggle */}
              <li className="pl-2 border-l border-zinc-200 dark:border-white/10 ml-1">
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-zinc-500 dark:text-zinc-400 hover:text-[#6F4E37] dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Button - Fixed top right */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 right-6 z-50 flex items-center gap-2 md:hidden"
      >
        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-full bg-white/60 dark:bg-coffee-950/60 backdrop-blur-md border border-coffee-200/60 dark:border-coffee-700/60 text-coffee-600 dark:text-coffee-300 hover:text-coffee-900 dark:hover:text-white transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2.5 rounded-full bg-white/60 dark:bg-coffee-950/60 backdrop-blur-md border border-coffee-200/60 dark:border-coffee-700/60 text-coffee-600 dark:text-coffee-300 hover:text-coffee-900 dark:hover:text-white transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.div>

      {/* Mobile Navigation - Full screen overlay */}
      {isMobileMenuOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 left-4 right-4 z-50 md:hidden bg-white dark:bg-coffee-950 rounded-2xl shadow-xl border border-coffee-200/60 dark:border-coffee-700/60 p-4"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center text-base px-4 py-3 rounded-xl transition-all ${isActive(item.href)
                        ? "bg-[#6F4E37] text-white font-medium dark:ring-2 dark:ring-white"
                        : "text-[#5c4130] dark:text-[#d4b8a5] hover:text-[#412e24] dark:hover:text-white hover:bg-[#faf6f3] dark:hover:bg-[#3d2e24]"
                      }`}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </>
      )}
    </>
  );
}

