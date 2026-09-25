"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
}

export default function MagneticButton({ children,   className = "", onClick, type = "button" }: Props) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMouse = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.3, y: y * 0.3, scale: 1.05, duration: 0.3, ease: "power2.out" });
  };

  const reset = () => {
    if (!ref.current) return;
    gsap.to(ref.current, { x: 0, y: 0, scale: 1, duration: 0.3, ease: "power2.out" });
  };

  return (
    <button
      ref={ref}
      type={type}
      className={`relative min-h-11 overflow-hidden rounded-full border border-cyan-400/30 bg-cyan-500/10 px-5 py-3 text-sm font-medium text-cyan-300 transition-colors hover:border-cyan-400/60 hover:bg-cyan-500/20 sm:px-8 sm:text-base ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
