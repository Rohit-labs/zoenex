"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "./icons";
import { trackEvent } from "@/lib/analytics";

type Props = {
  ghost: string;
  badge: string;
  titleTop: ReactNode;
  titleSwipe: string;
  lede: string;
  cta: string;
  href?: string;
  reassure?: string[];
};

export default function BigCta({ ghost, badge, titleTop, titleSwipe, lede, cta, href, reassure }: Props) {
  const targetHref = href || (cta === "Book an Audit" ? "/audit" : "/contact");
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
        <Link
          href={targetHref}
          className="btn btn-fill rv"
          data-magnetic
          onClick={() => trackEvent("audit_cta_click", { location: "big_cta", cta })}
        >
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
          <a className="cta-mail" href="mailto:zoenexstudios@gmail.com">
            zoenexstudios@gmail.com
          </a>
        </div>
      </div>
    </section>
  );
}
