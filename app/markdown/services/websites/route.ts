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

## Selected Projects & Live Builds
1. **LICOSASH — Influencer Desk**
   - **Category**: Influencer Marketing
   - **Link**: [https://licosash.com](https://licosash.com)
   - **Description**: A conversion-focused, high-performance website built for Licosash, a premium celebrity and influencer marketing agency, streamlining campaign inquiries and talent onboarding.
   - **Result**: Live client website.

2. **VIBRANT ACADEMY — Education & Admissions**
   - **Category**: Education
   - **Link**: [https://vibrant-academy.in](https://vibrant-academy.in)
   - **Description**: A modern educational platform and student onboarding portal for Vibrant Academy.
   - **Result**: Live client website.

3. **DR. JHA PHYSIO — Healthcare & Clinic**
   - **Category**: Healthcare
   - **Link**: [https://drjhaphysio.in](https://drjhaphysio.in)
   - **Description**: A clean, patient-centric clinic website and consultation appointment system.
   - **Result**: Live client website.

4. **AERUM — Modular Real Estate**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/aerum/index.html](https://zoenexstudios.in/demos/aerum/index.html)
   - **Description**: An interactive, scroll-driven showcase for a modular housing manufacturer.
   - **Result**: Live design sample.

5. **DINERLY — Fine-Casual Dining**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/dinerly/index.html](https://zoenexstudios.in/demos/dinerly/index.html)
   - **Description**: A sophisticated restaurant website featuring menu categorization and reservation forms.
   - **Result**: Live design sample.

6. **ASTRONOMIA — Luxury Horology**
   - **Category**: Web Design & Development
   - **Link**: [https://astronomia-navy.vercel.app](https://astronomia-navy.vercel.app)
   - **Description**: An immersive digital exhibition for a high-end watchmaker.
   - **Result**: Live design sample.

7. **Dental — Modern Dentistry**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/dental/index.html](https://zoenexstudios.in/demos/dental/index.html)
   - **Description**: Clean, modern dental clinic landing page with online appointment booking.
   - **Result**: Live design sample.

## Back to Home
- [https://zoenexstudios.in](https://zoenexstudios.in)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
