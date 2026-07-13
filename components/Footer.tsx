import Link from "next/link";
import Clock from "./Clock";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          Zoenex®
        </div>
        <div className="foot-grid">
          <div>
            <Link className="logo" href="/" style={{ color: "var(--paper-on-night)" }}>
              <i />
              ZOENEX
            </Link>
            <p className="foot-blurb">AI automation, web and motion studio. Mumbai based, working worldwide.</p>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/work">Work</Link>
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
                <Link href="/services/websites">Websites &amp; Product</Link>
              </li>
              <li>
                <Link href="/services/motion-design">Motion Design</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="mailto:hello@zoenex.studio">hello@zoenex.studio</a>
              </li>
              <li>
                <a href="#" rel="noopener">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#" rel="noopener">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" rel="noopener">
                  X / Twitter
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
