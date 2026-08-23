import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios

Zoenex Studios is a web development and AI automation studio based in Mumbai, India. We build high-performance business websites, custom web applications, AI-powered solutions, and workflow automations.

## Core Capabilities
- **Web Development**: High-performance websites, custom web apps, e-commerce, local SEO, and Core Web Vitals optimization.
- **AI & Business Automation**: Custom AI agents, lead management systems, CRM integration, workflow automation, and support concierges.

## Authoritative Resources
- **Sitemap**: [https://zoenexstudios.in/sitemap.xml](https://zoenexstudios.in/sitemap.xml)
- **Agent Instructions**: [https://zoenexstudios.in/llms.txt](https://zoenexstudios.in/llms.txt)
- **Portfolio**: [https://zoenexstudios.in/work](https://zoenexstudios.in/work)
- **Contact**: [https://zoenexstudios.in/contact](https://zoenexstudios.in/contact)
- **Websites Service**: [https://zoenexstudios.in/services/websites](https://zoenexstudios.in/services/websites)
- **AI Automation Service**: [https://zoenexstudios.in/services/ai-automation](https://zoenexstudios.in/services/ai-automation)
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
