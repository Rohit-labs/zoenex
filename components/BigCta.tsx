import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";

type Props = {
  ghost: string;
  badge: string;
  titleTop: ReactNode;
  titleSwipe: string;
  lede: string;
  cta: string;
  reassure?: string[];
};

export default function BigCta({ ghost, badge, titleTop, titleSwipe, lede, cta, reassure }: Props) {
  return (
    <section className="sec on-night bigcta">
      <div className="bigcta-bg" aria-hidden="true">
        <div className="bigcta-glow" />
        <div className="bigcta-grid" />
        <div className="bigcta-ghost">{ghost}</div>
      </div>
      <div className="bigcta-frame" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
      </div>
      <div className="wrap">
        <span className="cta-badge rv">
          <i />
          {badge}
        </span>
        <h2 className="rv">
          {titleTop}
          <br />
          <span className="swipe">{titleSwipe}</span>
        </h2>
        <p className="lede rv" style={{ marginLeft: "auto", marginRight: "auto" }}>
          {lede}
        </p>
        <Link href="/contact" className="btn btn-fill rv" data-magnetic>
          {cta}
          <ArrowRight />
        </Link>
        {reassure && reassure.length > 0 && (
          <ul className="reassure rv">
            {reassure.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        )}
        <div className="cta-contact rv">
          <a className="cta-mail" href="mailto:hello@zoenex.studio">
            hello@zoenex.studio
          </a>
        </div>
      </div>
    </section>
  );
}
