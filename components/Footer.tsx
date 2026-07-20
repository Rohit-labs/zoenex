import Link from "next/link";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-mark" aria-hidden="true">
          Zoenex
        </div>
        <div className="foot-grid">
          <div>
            <Link className="logo" href="/" style={{ color: "var(--paper-on-night)" }}>
              <span className="logo-mark" aria-hidden="true">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/zoenex-mark.png" alt="" draggable={false} />
              </span>
              <span className="logo-word">
                ZOENEX
                <em>STUDIOS</em>
              </span>
            </Link>
            <p className="foot-blurb">AI automation, web and motion studio. Mumbai based, working worldwide.</p>
            <span className="mono-tag" style={{ marginTop: "16px", display: "inline-block" }}>EST. 2026</span>
          </div>
          <div>
            <h4>Studio</h4>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/#services">Services</Link>
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
                <div className="social-chips" aria-label="Social links — coming soon">
                  <i>LinkedIn</i>
                  <i>Instagram</i>
                  <i>X / Twitter</i>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <span>© 2026 Zoenex Studios. All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
}
