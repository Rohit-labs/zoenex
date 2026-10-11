import { NextResponse } from "next/server";

export async function GET() {
  const content = `# 404 - Page Not Found

The path you requested does not exist on Zoenex Studios.

## Recovery Guide
Please refer to the following valid paths to locate what you are looking for:

- **Homepage**: [https://zoenexstudios.in](https://zoenexstudios.in)
- **Sitemap XML**: [https://zoenexstudios.in/sitemap.xml](https://zoenexstudios.in/sitemap.xml)
- **Agent Instructions (llms.txt)**: [https://zoenexstudios.in/llms.txt](https://zoenexstudios.in/llms.txt)
- **Web Development & Portfolio**: [https://zoenexstudios.in/services/websites](https://zoenexstudios.in/services/websites)
- **AI Automation Services**: [https://zoenexstudios.in/services/ai-automation](https://zoenexstudios.in/services/ai-automation)
- **Website Development Services**: [https://zoenexstudios.in/services/websites](https://zoenexstudios.in/services/websites)
- **Book an Audit**: [https://zoenexstudios.in/audit](https://zoenexstudios.in/audit)
- **Contact & Inquiries**: [https://zoenexstudios.in/contact](https://zoenexstudios.in/contact)
`;

  return new NextResponse(content, {
    status: 404,
    statusText: "Not Found",
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
    },
  });
}
