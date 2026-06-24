import type { Metadata } from "next";
import Link from "next/link";
import Logo from "./components/Logo";
import { createPageMetadata } from "./lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Page Not Found",
  description: "The page you are looking for could not be found on ThinkChains.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      <Logo variant="light" className="mb-8" imageClassName="h-10 w-auto sm:h-12" />
      <h1 className="text-5xl md:text-7xl font-reckoner font-bold text-[#ffcc00] mb-4">
        404
      </h1>
      <p className="text-white/70 text-lg md:text-xl max-w-md mb-8">
        This page doesn&apos;t exist or may have been moved.
      </p>
      <Link
        href="/"
        className="px-8 py-4 bg-[#ffcc00] text-black font-reckoner font-bold uppercase tracking-wider rounded-full hover:bg-[#ffd633] transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
}
