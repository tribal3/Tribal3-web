"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { HiArrowRight, HiChevronDown } from "react-icons/hi";
import tribalLogo from "../../../images/tribal.logo.png";
import HashLink from "@/components/ui/HashLink";

type NavChild = { label: string; href: string };
type NavItem = { label: string; href?: string; children?: NavChild[] };

const navLinks: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/#about" },
  {
    label: "Our Work",
    children: [
      { label: "Products", href: "/products" },
      { label: "Portfolio", href: "/portfolio" },
    ],
  },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact", href: "/#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [workOpen, setWorkOpen] = useState(false);

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
        <Link href="/" className="relative block h-10 w-40 sm:h-12 sm:w-48 lg:w-56" aria-label="Tribal 3 home">
          <Image
            src={tribalLogo}
            alt="Tribal 3"
            width={999}
            height={249}
            priority
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 192px, 224px"
            className="h-full w-full object-contain object-left rotate-180"
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-5 xl:gap-8">
          {navLinks.map((link) =>
            link.children ? (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => setWorkOpen(true)}
                onMouseLeave={() => setWorkOpen(false)}
              >
                <button
                  type="button"
                  onClick={() => setWorkOpen((v) => !v)}
                  aria-expanded={workOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 text-sm text-gray-400 transition-colors hover:text-cyan-400"
                >
                  {link.label}
                  <HiChevronDown className={`text-xs transition-transform duration-300 ${workOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {workOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className="absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3"
                    >
                      <div className="w-44 rounded-xl border border-dark-600/60 bg-[#ffffff] p-1.5 shadow-xl">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setWorkOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm text-gray-400 transition-colors hover:bg-cyan-500/10 hover:text-cyan-400"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <HashLink
                key={link.href}
                href={link.href ?? "/"}
                className="text-sm text-gray-400 hover:text-cyan-400 transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </HashLink>
            )
          )}
          <HashLink
            href="/#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-cyan-50 shadow-lg shadow-cyan-500/25 ring-1 ring-inset ring-[#bcdcff]/30 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/40"
          >
            <span className="pointer-events-none absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-[#eaf4ff]/40 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[150%]" />
            <span className="relative">Get in Touch</span>
            <HiArrowRight className="relative text-base transition-transform duration-300 group-hover:translate-x-1" />
          </HashLink>
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
              {navLinks.map((link) =>
                link.children ? (
                  <div key={link.label} className="pt-1">
                    <p className="flex min-h-10 items-center gap-1.5 text-base font-medium text-gray-300">
                      <HiChevronDown className="text-sm text-cyan-400" />
                      {link.label}
                    </p>
                    <div className="ml-2 border-l border-dark-600/60 pl-3">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMenuOpen(false)}
                          className="flex min-h-11 items-center text-base text-gray-400 transition-colors hover:text-cyan-400"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <HashLink
                    key={link.href}
                    href={link.href ?? "/"}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-11 items-center text-base text-gray-300 hover:text-cyan-400 transition-colors"
                  >
                    {link.label}
                  </HashLink>
                )
              )}
              <HashLink
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-2 flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-base font-semibold text-cyan-50 shadow-lg shadow-cyan-500/25"
              >
                Get in Touch
                <HiArrowRight className="text-lg" />
              </HashLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
