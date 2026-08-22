import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

const SITE_URL = "https://zoenexstudios.in";

export const metadata: Metadata = {
  title: "Zoenex Studios | Web Development & AI Automation Mumbai",
  description:
    "Zoenex Studios is a web development and AI automation studio based in Mumbai, India. We build high-performance business websites, custom web apps, and automated workflows. Book a call today.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-T126TLF41Q"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-T126TLF41Q');
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Zoenex Studios",
              "image": "https://zoenexstudios.in/icon.png",
              "url": "https://zoenexstudios.in",
              "email": "zoenexstudios@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Mumbai",
                "addressRegion": "Maharashtra",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "19.0760",
                "longitude": "72.8777"
              },
              "sameAs": [
                "https://linkedin.com/company/zoenex-studios"
              ],
              "areaServed": [
                {
                  "@type": "AdministrativeArea",
                  "name": "Mumbai"
                },
                {
                  "@type": "Country",
                  "name": "India"
                }
              ]
            }),
          }}
        />
      </head>
      <body className="loading">
        {/* the loader's hero image must be ready before first paint */}
        <link rel="preload" as="image" href="/zoenex-logo.jpg" fetchPriority="high" />
        {/* fonts load via hoisted links (parallel with CSS) instead of @import (serialized after it) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@500,700,800&f[]=satoshi@400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <div className="grain" aria-hidden="true" />
        <GlobalEffects />
        <Loader />
        <Cursor />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
