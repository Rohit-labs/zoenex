export interface LocationData {
  slug: string;
  name: string;
  country: string;
  region: "India" | "Middle East" | "United Kingdom" | "North America" | "Asia-Pacific";
  type: "Domestic Hub" | "International Delivery";
  heroTag: string;
  heroHeadline: string;
  heroHighlight: string;
  heroDescription: string;
  marketContext: string;
  whyChooseUs: {
    title: string;
    description: string;
  }[];
  timezone: string;
  deliveryGuarantee: string;
  coordinates: {
    latitude: string;
    longitude: string;
  };
  metaTitle: string;
  metaDescription: string;
}

export const LOCATIONS: LocationData[] = [
  // --- DOMESTIC HUBS (INDIA) ---
  {
    slug: "mumbai",
    name: "Mumbai",
    country: "India",
    region: "India",
    type: "Domestic Hub",
    heroTag: "Studio Headquarters · Mumbai, India",
    heroHeadline: "Web developers in Mumbai",
    heroHighlight: "built to convert",
    heroDescription:
      "Zoenex Studios is headquartered in Mumbai, engineering high-performance Next.js websites, custom web applications, and autonomous AI workflows for modern commercial brands.",
    marketContext:
      "As Mumbai's commercial landscape accelerates, businesses can no longer afford sluggish WordPress templates. We engineer bespoke web properties that achieve sub-second load times and turn visitors into qualified clients.",
    whyChooseUs: [
      {
        title: "Same-Day In-Person or Remote Alignment",
        description: "Direct collaboration with Mumbai-based engineers, available for strategy sessions across BKC, Lower Parel, Andheri, and South Mumbai."
      },
      {
        title: "Sub-Second LCP & Core Web Vitals 98+",
        description: "Engineered specifically to outrank local competitors with edge caching, clean semantic markup, and zero bloated plugins."
      },
      {
        title: "Full-Stack AI & Workflow Automation",
        description: "We don't just build websites — we connect autonomous lead capture, CRM pipelines, and n8n automations that put your pipeline on autopilot."
      }
    ],
    timezone: "IST (UTC+5:30)",
    deliveryGuarantee: "Replies within 1 business day · 2–4 week project sprints",
    coordinates: {
      latitude: "19.0760",
      longitude: "72.8777"
    },
    metaTitle: "Web Developers in Mumbai | Custom Websites & AI",
    metaDescription: "Looking for top web developers in Mumbai? Zoenex Studios builds fast Next.js websites, web apps, and AI workflows. Get an audit proposal today."
  },
  {
    slug: "bangalore",
    name: "Bengaluru",
    country: "India",
    region: "India",
    type: "Domestic Hub",
    heroTag: "Tech & Startup Hub · Bengaluru, India",
    heroHeadline: "Web developers for Bengaluru",
    heroHighlight: "tech & SaaS scale",
    heroDescription:
      "Engineering application-grade Next.js platforms, interactive product experiences, and intelligent business automations for high-growth tech firms in Bengaluru.",
    marketContext:
      "In India's Silicon Valley, tech founders and B2B leaders need digital experiences that reflect product-grade sophistication. We replace generic agency fluff with senior full-stack engineering.",
    whyChooseUs: [
      {
        title: "Product-Grade Next.js 15 & React Architecture",
        description: "Built using modern React Server Components, Tailwind CSS, TypeScript, and edge serverless infrastructure tailored for SaaS."
      },
      {
        title: "Self-Hosted AI & Internal Tool Workflows",
        description: "Custom LangChain agents, n8n integrations, and database copilots designed for tech teams scaling past manual ops."
      },
      {
        title: "Design Engineering & Micro-Interactions",
        description: "Linear and Apple-grade interactive motion, GSAP animations, and dark-mode aesthetics that impress venture investors and enterprise buyers."
      }
    ],
    timezone: "IST (UTC+5:30)",
    deliveryGuarantee: "Replies within 1 business day · Rapid 2–3 week MVP sprints",
    coordinates: {
      latitude: "12.9716",
      longitude: "77.5946"
    },
    metaTitle: "Web Developers in Bengaluru | Custom Web & AI Studio",
    metaDescription: "Zoenex Studios builds high-performance Next.js websites and AI workflows for Bengaluru startups and enterprises. Request a technical audit."
  },
  {
    slug: "delhi-ncr",
    name: "Delhi NCR",
    country: "India",
    region: "India",
    type: "Domestic Hub",
    heroTag: "Enterprise & Corporate Hub · Delhi NCR",
    heroHeadline: "Web developers for Delhi NCR",
    heroHighlight: "market authority",
    heroDescription:
      "Delivering high-converting enterprise websites, institutional web platforms, and automated operations for leading corporate brands across Gurgaon, Noida, and Delhi.",
    marketContext:
      "High-ticket B2B businesses in Gurgaon and Delhi require authoritative digital presence that builds instant credibility, accelerates procurement cycles, and commands market leadership.",
    whyChooseUs: [
      {
        title: "High-Ticket B2B Conversion Architecture",
        description: "Value-first visual hierarchy, frictionless lead capture forms, and structured case studies engineered to close enterprise contracts."
      },
      {
        title: "Enterprise Security & Compliance",
        description: "Zero WordPress vulnerabilities, static edge generation, and secure self-hosted automation infrastructure with SOC2 compliance in mind."
      },
      {
        title: "Dedicated Strategic Account Ownership",
        description: "No junior agency handoffs. Senior architects lead your project from initial teardown through launch day and post-cutover growth."
      }
    ],
    timezone: "IST (UTC+5:30)",
    deliveryGuarantee: "Replies within 1 business day · NDA on request",
    coordinates: {
      latitude: "28.6139",
      longitude: "77.2090"
    },
    metaTitle: "Web Developers in Delhi NCR | Enterprise Web & AI",
    metaDescription: "Enterprise web development and AI automation for Delhi NCR, Gurgaon, and Noida brands. High speed, zero templates, sub-second performance."
  },
  {
    slug: "pune",
    name: "Pune",
    country: "India",
    region: "India",
    type: "Domestic Hub",
    heroTag: "Engineering & IT Capital · Pune, India",
    heroHeadline: "Web developers in Pune",
    heroHighlight: "precision engineered",
    heroDescription:
      "High-performance website development, portal engineering, and AI automation for Pune's manufacturing, automotive, and IT service leaders.",
    marketContext:
      "Pune is home to world-class engineering and IT institutions. We build digital assets that match that engineering standard: clean code, sub-second load times, and reliable workflow automations.",
    whyChooseUs: [
      {
        title: "Close Geographic Proximity to Mumbai HQ",
        description: "Seamless travel and communication between Pune and our Mumbai studio for on-site reviews and strategic discovery."
      },
      {
        title: "B2B Manufacturing & Industrial Portals",
        description: "Interactive product catalogs, inquiry calculators, and multi-tier partner portals built for industrial and tech leaders."
      },
      {
        title: "Unmetered Workflow Automation",
        description: "Automate repetitive quoting, ERP synchronizations, customer support tickets, and email follow-ups via private n8n setups."
      }
    ],
    timezone: "IST (UTC+5:30)",
    deliveryGuarantee: "Replies within 1 business day · Fixed-scope milestones",
    coordinates: {
      latitude: "18.5204",
      longitude: "73.8567"
    },
    metaTitle: "Web Developers in Pune | Fast Websites & AI Systems",
    metaDescription: "Zoenex Studios provides custom web development and business automation for Pune companies. Core Web Vitals 95+, modern stack, fast delivery."
  },
  {
    slug: "hyderabad",
    name: "Hyderabad",
    country: "India",
    region: "India",
    type: "Domestic Hub",
    heroTag: "Pharma & Tech Hub · Hyderabad, India",
    heroHeadline: "Web developers in Hyderabad",
    heroHighlight: "scalable platforms",
    heroDescription:
      "Building high-speed web platforms, healthcare interfaces, and enterprise workflow automations for Hyderabad's technology and pharma giants.",
    marketContext:
      "From HITEC City to Genome Valley, Hyderabad demands world-class digital platforms. We build accessible, compliant, and lightning-fast web solutions that scale globally.",
    whyChooseUs: [
      {
        title: "HIPAA & Healthcare Compliant Portals",
        description: "Secure, compliant web design with structured clinic appointment systems and zero-leakage patient communication channels."
      },
      {
        title: "Lighthouse 98+ Speed Engineering",
        description: "Edge-hosted React Server Components ensuring instant page transitions even on constrained mobile connections."
      },
      {
        title: "Intelligent Document & Data Automation",
        description: "Automate reporting, PDF generation, customer onboarding, and CRM synchronization with custom AI pipelines."
      }
    ],
    timezone: "IST (UTC+5:30)",
    deliveryGuarantee: "Replies within 1 business day · Transparent timelines",
    coordinates: {
      latitude: "17.3850",
      longitude: "78.4867"
    },
    metaTitle: "Web Developers in Hyderabad | Custom Next.js & AI",
    metaDescription: "Professional web development and AI automation for Hyderabad businesses. High-speed custom web apps and automated workflows by Zoenex."
  },

  // --- INTERNATIONAL HUBS (PREMIER CLIENT TARGETS) ---
  {
    slug: "dubai",
    name: "Dubai",
    country: "United Arab Emirates",
    region: "Middle East",
    type: "International Delivery",
    heroTag: "Global Hub · Dubai & UAE Delivery",
    heroHeadline: "Web developers for Dubai",
    heroHighlight: "luxury & speed",
    heroDescription:
      "Bespoke luxury web design, high-converting commercial portals, and autonomous AI solutions for ambitious businesses and agencies in Dubai and the UAE.",
    marketContext:
      "Dubai demands digital excellence. Our studio builds cinematic, ultra-polished web properties with smooth motion and sub-second load times that stand out in the Gulf's most competitive markets.",
    whyChooseUs: [
      {
        title: "Near-Zero Timezone Friction (GMT+4)",
        description: "Dubai is only 1.5 hours behind our Mumbai engineering headquarters. Full daily overlap, instant WhatsApp/Slack comms, and agile turnaround."
      },
      {
        title: "World-Class Quality at Competitive Value",
        description: "Receive the high-craft design and custom Next.js engineering of top global studios at a fraction of local Dubai agency retainers."
      },
      {
        title: "Luxury Motion, 3D & Interactive Storytelling",
        description: "Custom horology, real estate, and hospitality showcases that captivate high-net-worth audiences across the Emirates."
      }
    ],
    timezone: "GST (UTC+4:00)",
    deliveryGuarantee: "Replies within 1 business day · Seamless UAE billing & wire support",
    coordinates: {
      latitude: "25.2048",
      longitude: "55.2708"
    },
    metaTitle: "Web Developers in Dubai | Custom Luxury Websites & AI",
    metaDescription: "Zoenex Studios crafts high-performance Next.js websites and AI automation for Dubai & UAE businesses. World-class craft, GMT+4 alignment."
  },
  {
    slug: "london",
    name: "London",
    country: "United Kingdom",
    region: "United Kingdom",
    type: "International Delivery",
    heroTag: "UK & European Delivery · London",
    heroHeadline: "Web developers for London",
    heroHighlight: "agency craft, direct speed",
    heroDescription:
      "Delivering boutique Next.js web applications, e-commerce platforms, and automated operations for modern brands, consultancies, and startups across London.",
    marketContext:
      "London businesses pay £10,000–£30,000 for slow, bureaucratic agency cycles. Zoenex Studios provides direct access to senior full-stack engineers who ship in weeks, not months.",
    whyChooseUs: [
      {
        title: "5 Hours Daily UK Working Hours Overlap",
        description: "Our afternoons match your morning standups. Active video check-ins, asynchronous Loom updates, and transparent GitHub repositories."
      },
      {
        title: "No Agency Overhead or Junior Bloat",
        description: "Work directly with senior engineers and UI designers who build and ship your codebase, eliminating expensive account manager bloat."
      },
      {
        title: "Strict Performance Budgets & Core Web Vitals",
        description: "We enforce sub-1.2s LCP and flawless accessibility standards so your UK campaigns achieve optimal organic and paid conversion."
      }
    ],
    timezone: "GMT / BST (UTC+1:00)",
    deliveryGuarantee: "Replies within 1 business day · Fixed-scope GBP quotes",
    coordinates: {
      latitude: "51.5074",
      longitude: "-0.1278"
    },
    metaTitle: "Web Developers in London | Custom Next.js Web Studio",
    metaDescription: "Custom Next.js web development and AI automation for London and UK businesses. High-speed engineering, boutique craft, rapid 2-4 week delivery."
  },
  {
    slug: "new-york",
    name: "New York",
    country: "United States",
    region: "North America",
    type: "International Delivery",
    heroTag: "North American Delivery · New York",
    heroHeadline: "Web developers for New York",
    heroHighlight: "built for high velocity",
    heroDescription:
      "Bespoke B2B websites, financial consulting platforms, and AI-powered operational workflows for high-growth enterprises and founders in New York.",
    marketContext:
      "In NYC, speed is currency. If your website takes more than 2 seconds to load, enterprise buyers and investors have already clicked away. We engineer sub-second web platforms that convert.",
    whyChooseUs: [
      {
        title: "Overnight Development Velocity",
        description: "Our team builds while your East Coast office sleeps. Request features at 5 PM EST and review working demos in your inbox by 9 AM EST."
      },
      {
        title: "Enterprise Revenue-Focused Web Architecture",
        description: "Engineered specifically to support high-ticket sales pipelines, clear commercial messaging, and seamless HubSpot/Salesforce CRM sync."
      },
      {
        title: "Zero Technical Debt & Clean React/Next.js Code",
        description: "No locked-in proprietary builders. You receive 100% clean, standard, TypeScript-powered code that your in-house team can easily scale."
      }
    ],
    timezone: "EST / EDT (UTC-5:00)",
    deliveryGuarantee: "Replies within 1 business day · USD invoicing & contracts",
    coordinates: {
      latitude: "40.7128",
      longitude: "-74.0060"
    },
    metaTitle: "Web Developers in New York | Custom Web & AI Studio",
    metaDescription: "Bespoke Next.js web development and AI automation for NYC brands and B2B firms. High-performance speed, overnight velocity, fixed quotes."
  },
  {
    slug: "san-francisco",
    name: "San Francisco",
    country: "United States",
    region: "North America",
    type: "International Delivery",
    heroTag: "Silicon Valley Delivery · San Francisco",
    heroHeadline: "Web developers for SF Bay Area",
    heroHighlight: "modern stack, zero lag",
    heroDescription:
      "Modern React Server Component architectures, interactive web showcases, and autonomous AI agents for tech startups and venture-backed founders in the Bay Area.",
    marketContext:
      "Silicon Valley has the highest technical standards on Earth. We build with the modern stack founders love: Next.js 15, TypeScript, Tailwind, GSAP, and self-hosted n8n/Python AI pipelines.",
    whyChooseUs: [
      {
        title: "Full-Stack AI Engineering & Integrations",
        description: "Connect LLMs, vector search, webhooks, and multi-agent systems directly into your web applications and operational tools."
      },
      {
        title: "Fast Launch Cycles for Tech Startups",
        description: "From product wireframes to production deployment on Vercel or AWS in under 3 weeks. Ready for Product Hunt and Seed/Series A demos."
      },
      {
        title: "Flawless Performance & Lighthouse Scores",
        description: "Zero bloat, instant hydration, and optimal Core Web Vitals to satisfy the most demanding engineering teams and users."
      }
    ],
    timezone: "PST / PDT (UTC-8:00)",
    deliveryGuarantee: "Replies within 1 business day · Fast asynchronous check-ins",
    coordinates: {
      latitude: "37.7749",
      longitude: "-122.4194"
    },
    metaTitle: "Web Developers in San Francisco | Next.js & AI Studio",
    metaDescription: "Next.js web development and AI workflow engineering for San Francisco and Bay Area startups. Fast turnaround, modern stack, sub-second speed."
  },
  {
    slug: "singapore",
    name: "Singapore",
    country: "Singapore",
    region: "Asia-Pacific",
    type: "International Delivery",
    heroTag: "APAC Regional Hub · Singapore Delivery",
    heroHeadline: "Web developers for Singapore",
    heroHighlight: "fintech-grade reliability",
    heroDescription:
      "High-speed websites, international corporate platforms, and automated workflow pipelines for enterprises, funds, and tech brands across Singapore and Southeast Asia.",
    marketContext:
      "Singapore is the financial gateway of Asia. We provide high-security, ultra-fast web development with seamless communication across the APAC timezone.",
    whyChooseUs: [
      {
        title: "Prime APAC Timezone Alignment (SGT / UTC+8)",
        description: "Just 2.5 hours ahead of Mumbai. Complete workday overlap for real-time chat, sprint planning, and emergency deployments."
      },
      {
        title: "Corporate & Fintech-Grade Security Standards",
        description: "Static edge prerendering and secure database integrations with no exposed CMS backdoors or plugin vulnerabilities."
      },
      {
        title: "Multi-Region CDN Performance",
        description: "Edge-cached delivery across Singapore, Tokyo, and Sydney ensuring sub-200ms latency across the entire Asia-Pacific region."
      }
    ],
    timezone: "SGT (UTC+8:00)",
    deliveryGuarantee: "Replies within 1 business day · APAC commercial agreements",
    coordinates: {
      latitude: "1.3521",
      longitude: "103.8198"
    },
    metaTitle: "Web Developers in Singapore | High-Performance Studio",
    metaDescription: "Custom Next.js web development and AI automation for Singapore and APAC businesses. High security, sub-second speed, 2.5h timezone overlap."
  }
];

export function getAllLocations(): LocationData[] {
  return LOCATIONS;
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  return LOCATIONS.find((loc) => loc.slug === slug);
}
