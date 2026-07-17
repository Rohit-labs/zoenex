import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import GlobalEffects from "@/components/GlobalEffects";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Zoenex Studios — AI Automation, Websites & Motion Design",
  description:
    "Zoenex Studios builds AI automation systems, high-performance websites and motion design for ambitious brands. Mumbai based, working worldwide.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
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
