import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://zoenexstudios.in";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Zoenex Studios | Web Development & AI Automation Mumbai",
  description:
    "Zoenex Studios is a web development and AI automation studio based in Mumbai, India. We build high-performance business websites, custom web apps, and automated workflows.",
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="sitemap" type="application/xml" title="Sitemap" href="/sitemap.xml" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" href="/icon.png" />
        <link rel="apple-touch-icon" href="/icon.png" />
        {/* Microsoft Clarity */}
        <Script
          id="microsoft-clarity"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                  c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                  t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                  y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "yc1rwd61f2");
            `,
          }}
        />
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-T126TLF41Q"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
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
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Zoenex Studios",
                "description": "Zoenex Studios is a high-performance web development and custom AI business automation studio based in Mumbai, India, serving clients globally.",
                "url": "https://zoenexstudios.in",
                "logo": "https://zoenexstudios.in/icon.png",
                "email": "zoenexstudios@gmail.com",
                "contactPoint": {
                  "@type": "ContactPoint",
                  "email": "zoenexstudios@gmail.com",
                  "contactType": "customer support",
                  "availableLanguage": "English"
                },
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Mumbai",
                  "addressRegion": "Maharashtra",
                  "addressCountry": "IN"
                },
                "sameAs": [
                  "https://linkedin.com/company/zoenex-studios",
                  "https://www.instagram.com/madebyzoenex"
                ]
              },
              {
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
                  "https://linkedin.com/company/zoenex-studios",
                  "https://www.instagram.com/madebyzoenex"
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
              }
            ]),
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
