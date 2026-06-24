import Link from "next/link";
import Logo from "./Logo";

type SiteNavProps = {
  backHref?: string;
  backLabel?: string;
  logoVariant?: "light" | "dark" | "auto";
};

export default function SiteNav({
  backHref = "/",
  backLabel = "Back to Home",
  logoVariant = "light",
}: SiteNavProps) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
      aria-label="Primary"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-4">
        <Logo variant={logoVariant} priority />
        <Link
          href={backHref}
          className="group flex items-center gap-2 text-white/70 hover:text-[#ffcc00] transition-colors text-xs sm:text-sm uppercase tracking-wider shrink-0"
        >
          <svg
            className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLabel}
        </Link>
      </div>
    </nav>
  );
}
