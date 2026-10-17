export interface TeamMember {
  id: string;
  name: string;
  role: string;
  tagline: string;
  bio: string;
  detailedBio: string[];
  image: string;
  location: string;
  linkedin: string;
  github?: string;
  twitter?: string;
  email?: string;
  specialties: string[];
  isFounder: boolean;
  order: number;
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "moresh-mishra",
    name: "Moresh Mishra",
    role: "Founder & Technical Lead",
    tagline: "Full-Stack System Architect & AI Automation Specialist",
    bio: "Founder of Zoenex Studios. Moresh leads technical strategy, web architecture, and autonomous AI systems, building high-conversion digital experiences that run themselves.",
    detailedBio: [
      "With deep expertise spanning full-stack web engineering, Next.js architecture, and applied artificial intelligence, Moresh founded Zoenex Studios to deliver websites and automated workflows that function as real growth assets.",
      "He leads end-to-end technical execution across enterprise web applications, intelligent AI agents, RAG workflows, and business automation pipelines — ensuring every build pairs pristine visual craftsmanship with sub-second performance.",
    ],
    image: "/team/moresh-mishra.jpg",
    location: "Mumbai, India",
    linkedin: "https://www.linkedin.com/in/moreshmishra",
    email: "zoenexstudios@gmail.com",
    specialties: [
      "Full-Stack Web Architecture",
      "Next.js 15 & React 19",
      "AI Workflow Automation",
      "Custom AI Agents & RAG",
      "Performance & Core Web Vitals",
      "Conversion Engineering",
    ],
    isFounder: true,
    order: 1,
  },
  {
    id: "rohit-maurya",
    name: "Rohit Maurya",
    role: "Co-Founder & Systems Engineer",
    tagline: "Software Architect & Intelligent Systems Engineer",
    bio: "Co-Founder of Zoenex Studios. Rohit directs systems architecture, cloud infrastructure, and AI workflow integration, building high-resilience digital foundations for growing businesses.",
    detailedBio: [
      "As a founding partner at Zoenex Studios, Rohit spearheads backend systems, cloud deployments, and resilient data infrastructure designed to power high-scale web platforms and automations.",
      "Working closely across full-stack engineering, API orchestration, and intelligent agent pipelines, he ensures every Zoenex build is fast, securely architected, and engineered for long-term operational scale.",
    ],
    image: "/team/rohit-maurya.jpg",
    location: "Mumbai, India",
    linkedin: "https://www.linkedin.com/in/rohit-maurya-labs",
    email: "zoenexstudios@gmail.com",
    specialties: [
      "Backend & Systems Architecture",
      "Cloud & API Infrastructure",
      "AI Workflow Integration",
      "Next.js & Full-Stack Systems",
      "Data Pipelines & Automations",
      "Scalability & Performance",
    ],
    isFounder: true,
    order: 2,
  },
];

export const FOUNDERS = TEAM_MEMBERS.filter((m) => m.isFounder);
