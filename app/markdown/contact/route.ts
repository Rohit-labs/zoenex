import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios - Contact & FAQs

Get in touch to build a high-performance website or automate business workflows.

## Contact Information
- **Email**: zoenexstudios@gmail.com
- **Response Time**: Within 1 business day
- **Location**: Mumbai, India (serving teams worldwide)

## FAQs
1. **What services do you offer?**
   We offer high-performance web development and custom AI automation solutions.
2. **Where are you based?**
   We are located in Mumbai, India, and work with clients globally (US, UK, UAE, India).
3. **How long does a website rebuild take?**
   Typically 3 to 6 weeks depending on scale, including prototyping and development.
4. **What tools do you build automations with?**
   We build custom Node.js/Python connections, n8n, Make, and API integrations.
5. **Do you write NDAs?**
   Yes, we sign NDAs upon request before scoping detailed projects.

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
