"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  useEffect,
  type AnchorHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

function scrollToHash(hash: string) {
  if (!hash) {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    return;
  }
  const target = document.getElementById(hash);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (window.location.hash !== `#${hash}`) {
    window.history.replaceState(null, "", `#${hash}`);
  }
}

export default function HashLink({ href, children, onClick, ...rest }: HashLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const rawHash = hashIndex === -1 ? "" : href.slice(hashIndex + 1);
  const hash = decodeURIComponent(rawHash);
  const targetPath = path || "/";
  const isSamePage = pathname === targetPath;

  // Land on the hash target after navigating from another page (or on first load
  // with a #hash in the URL). Delayed slightly so the sections are painted.
  useEffect(() => {
    if (!hash) return;
    const current = decodeURIComponent(window.location.hash.replace(/^#/, ""));
    if (current !== hash) return;
    const timer = window.setTimeout(() => scrollToHash(hash), 80);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;

    if (isSamePage) {
      event.preventDefault();
      scrollToHash(hash);
    }
  };

  if (isSamePage) {
    return (
      <a href={href} onClick={handleClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
