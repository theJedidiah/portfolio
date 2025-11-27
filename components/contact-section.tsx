"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, Loader2 } from "lucide-react";

type HelpType = "strategy" | "dev" | "hello";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    helpType: "hello" as HelpType,
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "YOUR_ACCESS_KEY",
          name: formData.name,
          email: formData.email,
          subject: `Portfolio Contact: ${formData.helpType}`,
          message: formData.message,
          from_name: "Portfolio Website",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", helpType: "hello", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const helpOptions: { value: HelpType; label: string }[] = [
    { value: "strategy", label: "Product Strategy" },
    { value: "dev", label: "Development Work" },
    { value: "hello", label: "Just Saying Hi" },
  ];

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-semibold text-slate-900 dark:text-white mb-4">
            Let&apos;s Work Together
          </h2>
          <p className="text-slate-500 dark:text-slate-400">
            Have a project in mind? I&apos;d love to hear about it.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Name & Email Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-300 dark:focus:border-slate-600 transition-all"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-300 dark:focus:border-slate-600 transition-all"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Help Type Radio */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              How can I help?
            </label>
            <div className="flex flex-wrap gap-3">
              {helpOptions.map((option) => (
                <label
                  key={option.value}
                  className={`relative cursor-pointer px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    formData.helpType === option.value
                      ? "bg-[#6F4E37] text-white dark:ring-2 dark:ring-white"
                      : "bg-zinc-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-zinc-200 dark:hover:bg-slate-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="helpType"
                    value={option.value}
                    checked={formData.helpType === option.value}
                    onChange={(e) =>
                      setFormData({ ...formData, helpType: e.target.value as HelpType })
                    }
                    className="sr-only"
                  />
                  {option.label}
                </label>
              ))}
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-white/10 focus:border-slate-300 dark:focus:border-slate-600 transition-all resize-none"
              placeholder="Tell me about your project..."
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={status === "loading" || status === "success"}
            className="w-full py-4 px-6 bg-[#6F4E37] text-white rounded-full font-medium text-sm hover:bg-[#5c4130] dark:ring-2 dark:ring-white disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
          >
            {status === "loading" ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Sending...
              </>
            ) : status === "success" ? (
              <>
                <CheckCircle size={18} />
                Message Sent!
              </>
            ) : (
              <>
                <Send size={18} />
                Send Message
              </>
            )}
          </button>

          {status === "error" && (
            <p className="text-center text-sm text-red-500 dark:text-red-400">
              Something went wrong. Please try again.
            </p>
          )}
        </motion.form>
      </div>
    </section>
  );
}

