import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import GuiddeApp from "@/src/marketing/guidde/GuiddeApp";

// Guidde sets everything in DM Sans (read live off guidde.com: "Dmsans,
// sans-serif" on body and headings, headings at weight 400 with tight
// tracking). One family, three weights, exposed as --font-gd for guidde.css.
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-gd",
  display: "swap",
});

// Ad-hoc, personalized application page for Bar Moshe's "Full Stack Engineer"
// application to Guidde (Tel Aviv, hybrid). Built in Guidde's own visual
// language, read live off guidde.com: white surface, DM Sans, giant weight-400
// headlines with colored highlight words, blue #0062FF CTAs, pastel rounded
// cards, scroll fade-ups, and a guidde-style step walkthrough as the
// centerpiece. Noindex, a private shareable link for the Guidde team.
const ogTitle = "Bar Moshe × Guidde — Full Stack Engineer";
const ogDescription =
  "Bar Moshe, a full-stack engineer in Tel Aviv. React, Node, TypeScript; event-driven pipelines on Temporal (Code Exchange featured); open-source tooling on npm with an MCP server; inside a cloud video editor every day.";

// noindex (private, shareable link) but a rich share card still renders for
// direct shares (email / DM / LinkedIn); og:image comes from the colocated
// opengraph-image.tsx.
export const metadata: Metadata = {
  title: ogTitle,
  description: ogDescription,
  robots: { index: false, follow: false },
  openGraph: {
    type: "website",
    siteName: "Bar Moshe",
    title: ogTitle,
    description: ogDescription,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@barmoshe1",
    creator: "@barmoshe1",
    title: ogTitle,
    description: ogDescription,
  },
};

export default function GuiddePage() {
  return (
    <div className={dmSans.variable}>
      <GuiddeApp />
    </div>
  );
}
