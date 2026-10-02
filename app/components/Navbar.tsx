"use client";

import { useEffect, useState } from "react";
import { NAV_LINKS } from "../lib/site";
import BookDemoButton from "./ui/BookDemoButton";

/** Sticky top bar. `logo` is rendered on the server and passed in. */
export default function Navbar({ logo }: { logo: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled || open
          ? "border-b border-cream-line/80 bg-cream-light/85 shadow-[0_8px_30px_-18px_rgba(27,27,31,0.25)] backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center rounded-md focus-visible:outline-2 focus-visible:outline-gold-dark" aria-label="Skimmy home">
          {logo}
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="text-[14px] font-semibold text-ink-body transition-colors hover:text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <BookDemoButton className="btn-primary !px-4 !py-2.5 !text-[14px]" />
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-btn text-ink md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            <span className="relative block h-3 w-5" aria-hidden>
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-[1.5px] w-5 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-[1.5px] w-5 bg-current transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="flex flex-col gap-1 border-t border-cream-line px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-3 text-[16px] font-semibold text-ink">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
