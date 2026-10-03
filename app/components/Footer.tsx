import { NAV_LINKS, SITE } from "../lib/site";
import Logo from "./ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-cream-line px-4 py-12 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo variant="full" height={48} />
          <a href={`mailto:${SITE.email}`} className="mt-3 inline-block text-[15px] font-semibold text-ink hover:text-gold-deep">
            {SITE.email}
          </a>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-[14px] font-medium text-ink-body hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-[13px] text-ink-muted">© {new Date().getFullYear()} Skimmy · Australia</p>
      </div>
    </footer>
  );
}
