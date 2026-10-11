"use client";

import Link from "next/link";
import Clock from "./Clock";
import { trackEvent } from "@/lib/analytics";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <Link className="logo" href="/" style={{ color: "var(--paper-on-night)" }}>
              <i />
              <span className="logo-word">
                ZOENEX
                <em>STUDIOS</em>
              </span>
            </Link>
            <p className="foot-blurb">
              Websites that convert and run themselves — web development and AI automation in one studio. Mumbai based, working with teams in the
              US, UK, UAE & India. Replies within one business day.
            </p>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/audit" onClick={() => trackEvent("audit_cta_click", { location: "footer" })}>
                  Book an Audit
                </Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Services</h4>
            <ul>
              <li>
                <Link href="/services/ai-automation">AI Automation</Link>
              </li>
              <li>
                <Link href="/services/websites">Websites & Product</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="mailto:zoenexstudios@gmail.com">zoenexstudios@gmail.com</a>
              </li>
              <li>
                <a href="tel:+917021453048">+91 7021453048</a>
              </li>
              <li>
                <a href="tel:+918591494402">+91 8591494402</a>
              </li>
              <li>
                <a href="https://www.instagram.com/madebyzoenex" target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Zoenex Studios. All rights reserved.</span>
          <span className="mono-tag">
            Mumbai — <Clock /> IST
          </span>
        </div>
      </div>
    </footer>
  );
}
