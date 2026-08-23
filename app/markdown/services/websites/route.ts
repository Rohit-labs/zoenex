import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios - Web Development & Websites

We build high-performance custom websites and web applications designed around business goals, optimized for performance, local SEO, and usability.

## Capabilities
- Custom business websites & landing pages
- E-commerce platforms
- Custom web applications
- Local SEO and schema markup integration
- Performance tuning (Core Web Vitals & Lighthouse)

## Workflow
1. **Strategy & Scope**: We establish goals, pages, and key metrics.
2. **Interactive Prototypes**: Clickable, high-fidelity designs (never static decks).
3. **Optimized Development**: Clean Next.js/React code, responsive layout, semantic HTML.
4. **Launch & Handover**: Analytics tracking, speed tests, and system training.

## Back to Home
- [https://zoenexstudios.in/](https://zoenexstudios.in/)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
