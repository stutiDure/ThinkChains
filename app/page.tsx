import type { Metadata } from "next";
import HomePage from "./components/HomePage";
import { absoluteUrl } from "./lib/seo";

export const metadata: Metadata = {
  alternates: {
    canonical: absoluteUrl("/"),
  },
  openGraph: {
    url: absoluteUrl("/"),
  },
};

export default function Home() {
  return <HomePage />;
}
