import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios - Selected Work

We focus on high-performance websites and custom web products. Here are our selected live interactive website projects:

1. **LICOSASH — Influencer Desk**
   - **Category**: Influencer Marketing
   - **Link**: [https://licosash.com](https://licosash.com)
   - **Description**: A conversion-focused, high-performance website built for Licosash, a premium celebrity and influencer marketing agency, streamlining campaign inquiries and talent onboarding.
   - **Result**: Live client website.

2. **AERUM — Modular Real Estate**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/aerum/index.html](https://zoenexstudios.in/demos/aerum/index.html)
   - **Description**: An interactive, scroll-driven showcase for a modular housing manufacturer. Smooth transitions, responsive grids, and clean typographic details.
   - **Result**: Live design sample.

3. **DINERLY — Fine-Casual Dining**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/dinerly/index.html](https://zoenexstudios.in/demos/dinerly/index.html)
   - **Description**: A sophisticated restaurant website featuring menu categorization, clean dark-mode visuals, responsive grid layouts, and reservation forms.
   - **Result**: Live design sample.

4. **ASTRONOMIA — Luxury Horology**
   - **Category**: Web Design & Development
   - **Link**: [https://astronomia-navy.vercel.app](https://astronomia-navy.vercel.app)
   - **Description**: An immersive digital exhibition for a high-end watchmaker. Includes dynamic tourbillon rotations, interactive technical specs, and a premium catalog.
   - **Result**: Live design sample.

5. **Dental — Modern Dentistry**
   - **Category**: Web Design & Development
   - **Link**: [https://zoenexstudios.in/demos/dental/index.html](https://zoenexstudios.in/demos/dental/index.html)
   - **Description**: A clean, modern dental clinic landing page featuring service pills, doctor cards, patient testimonials, a latest articles grid, and an appointment booking form.
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
