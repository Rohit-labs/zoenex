import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios - Book an Audit

Get a practical review of your website, conversion experience, and opportunities for improvement.

## How It Works
1. Submit your website and tell us what you want to improve.
2. We examine conversion friction, performance bottlenecks, and technical architecture.
3. We follow up with practical findings and next steps.

## Audit Types
- **Website conversion audit**: Teardown of user journeys, drop-offs, and conversion barriers.
- **SEO and technical audit**: Core Web Vitals, crawlability, semantic markup, and indexation.
- **UX and design audit**: Visual hierarchy, mobile responsiveness, and design system quality.
- **AI automation opportunity audit**: Identification of repetitive manual operations to automate.
- **Comprehensive website audit**: Full-spectrum evaluation covering design, speed, code, and growth.

## Request Form
- Submit your request directly at: [https://zoenexstudios.in/audit](https://zoenexstudios.in/audit)

## General Enquiries
- For general questions or project briefs: [https://zoenexstudios.in/contact](https://zoenexstudios.in/contact)
- Email: zoenexstudios@gmail.com
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
