"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MagneticButton from "@/components/ui/MagneticButton";
import { HiMail, HiMap } from "react-icons/hi";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus((s) => (s === "success" ? "idle" : s)), 4000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus((s) => (s === "error" ? "idle" : s)), 5000);
    }
  };

  return (
    <section id="contact" className="relative bg-dark-900 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center sm:mb-16"
        >
          <span className="text-cyan-400 text-sm tracking-[0.2em] uppercase">Get In Touch</span>
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl md:text-5xl">
            Let&apos;s Build Something <span className="text-gradient">Amazing</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12">
          <motion.form
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4 sm:space-y-5"
          >
            <div>
              <input
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="w-full rounded-xl border border-dark-600 bg-dark-700 px-4 py-3 text-base text-white placeholder-gray-500 transition-colors focus:border-cyan-400/50 focus:outline-none sm:px-5 sm:py-3.5"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full rounded-xl border border-dark-600 bg-dark-700 px-4 py-3 text-base text-white placeholder-gray-500 transition-colors focus:border-cyan-400/50 focus:outline-none sm:px-5 sm:py-3.5"
              />
            </div>
            <div>
              <textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="w-full resize-none rounded-xl border border-dark-600 bg-dark-700 px-4 py-3 text-base text-white placeholder-gray-500 transition-colors focus:border-cyan-400/50 focus:outline-none sm:px-5 sm:py-3.5"
              />
            </div>
            <MagneticButton type="submit" className="w-full">
              {status === "sending"
                ? "Sending..."
                : status === "success"
                ? "Message Sent!"
                : status === "error"
                ? "Failed - Try Again"
                : "Send Message"}
            </MagneticButton>
            {status === "success" && (
              <p className="text-cyan-400 text-sm text-center">Your message has been sent. We&apos;ll get back to you soon.</p>
            )}
            {status === "error" && (
              <p className="text-red-400 text-sm text-center">Something went wrong. Please try again.</p>
            )}
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4 sm:space-y-6"
          >
            {[
              { icon: HiMail, label: "Email", value: "tribal3tech@gmail.com" },
              // { icon: HiPhone, label: "Phone", value: "+92 3122767819" },
              { icon: HiMap, label: "Location", value: "Karachi, Pakistan" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="glass-card flex min-w-0 items-center gap-3 rounded-xl p-4 sm:gap-4 sm:p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-400/20 bg-cyan-500/10 sm:h-12 sm:w-12">
                    <Icon className="text-lg text-cyan-400 sm:text-xl" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-gray-400">{item.label}</p>
                    <p className="break-words text-sm font-medium text-white sm:text-base">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
