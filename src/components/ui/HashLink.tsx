"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AnchorHTMLAttributes, ReactNode } from "react";

interface HashLinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
}

export default function HashLink({ href, children, onClick, ...rest }: HashLinkProps) {
  const pathname = usePathname();
  const hashIndex = href.indexOf("#");
  const path = hashIndex === -1 ? href : href.slice(0, hashIndex);
  const hash = hashIndex === -1 ? "" : href.slice(hashIndex + 1);
  const targetPath = path || "/";
  const isSamePage = Boolean(hash) && pathname === targetPath;

  if (isSamePage) {
    return (
      <a href={`#${hash}`} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} onClick={onClick} {...rest}>
      {children}
    </Link>
  );
}
