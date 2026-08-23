import { NextResponse } from "next/server";

export async function GET() {
  const content = `# Zoenex Studios - AI & Business Automation

We build intelligent systems and custom workflows that eliminate manual operations, connect existing tools, and automate customer pipelines.

## Capabilities
- Custom AI agents & chat assistants
- Automated lead management and CRM integration
- Automated email sequences & database synchronization
- Customer support triage agents
- Data processing and report automation

## Workflow
1. **Systems Audit**: We map out current business workflows and bottlenecks.
2. **Design Blueprint**: We architect the automation pipeline and tool integrations.
3. **Build & Integrate**: We deploy automated connections (n8n, Make, Custom Node.js/Python).
4. **Maintenance & Handover**: Live monitoring, performance tuning, and updates.

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
