"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import tribalLogo from "../../../images/tribal.logo.png";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-[#ffffff] backdrop-blur-md ${
        scrolled ? "shadow-md border-b border-dark-600/40" : "border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href="#" className="relative block h-10 w-40 sm:h-12 sm:w-48 lg:w-56" aria-label="Tribal 3 home">
          <Image
            src={tribalLogo}
            alt="Tribal 3"
            width={999}
            height={249}
            priority
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
            className="h-full w-full object-contain object-left rotate-180"
          />
        </a>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-gray-400 hover:text-cyan-400 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#contact"
            className="px-3.5 py-2 rounded-xl bg-cyan-500/15 border border-cyan-400/25 text-cyan-300 text-sm font-medium hover:bg-cyan-500/25 transition-colors"
          >
            Get in Touch
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="lg:hidden relative -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px]"
        >
          <span className={`block h-px w-6 bg-cyan-500 transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
          <span className={`block h-px w-6 bg-cyan-500 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-px w-6 bg-cyan-500 transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#ffffff] border-t border-dark-600/40 overflow-hidden"
          >
            <div className="px-4 sm:px-6 py-4 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex min-h-11 items-center text-base text-gray-300 hover:text-cyan-400 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center text-base text-cyan-300 font-medium transition-colors"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
