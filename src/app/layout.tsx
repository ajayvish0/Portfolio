import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { JsonLd } from "@/components/json-ld";
import { PERSON, SITE_URL, personId } from "@/lib/site";
import { DOMAINS } from "@/data/technical-expertise";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Ajay Vishwakarma — AI Full Stack Engineer",
    template: "%s — Ajay Vishwakarma",
  },
  description:
    "AI full stack engineer building real-time voice and SMS agents, LLM-powered products, and fast backend APIs with Node.js, FastAPI and React.",
  openGraph: {
    title: "Ajay Vishwakarma — AI Full Stack Engineer",
    description:
      "AI full stack engineer building real-time voice and SMS agents, LLM-powered products, and fast backend APIs with Node.js, FastAPI and React.",
    url: SITE_URL,
    siteName: "Ajay Vishwakarma Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ajay Vishwakarma — AI Full Stack Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ajay Vishwakarma — AI Full Stack Engineer",
    description:
      "AI full stack engineer building real-time voice and SMS agents, LLM-powered products, and fast backend APIs with Node.js, FastAPI and React.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const knowsAbout = Array.from(
  new Set(DOMAINS.flatMap((d) => d.techs.map((t) => t.label)))
);

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId(),
  name: PERSON.name,
  url: SITE_URL,
  email: `mailto:${PERSON.email}`,
  jobTitle: PERSON.jobTitle,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  sameAs: [PERSON.github, PERSON.linkedin, PERSON.x],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: PERSON.alumniOf,
  },
  knowsAbout,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes sets the theme class on <html> before React hydrates.
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd data={personJsonLd} />
      </head>
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased font-sans flex flex-col min-h-screen`}
      >
        {/* The homepage (app/page.tsx) brings its own header and footer; every
            other page gets the docs chrome from app/(site)/layout.tsx. */}
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
