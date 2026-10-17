import type { Metadata } from "next";
import TeamView from "@/components/views/TeamView";
import { TEAM_MEMBERS } from "@/lib/team-data";

export const metadata: Metadata = {
  title: "Our Team & Leadership | Zoenex Studios",
  description:
    "Meet the founders and engineers behind Zoenex Studios. Led by founder Moresh Mishra, we engineer bespoke Next.js websites and custom AI automation systems in Mumbai.",
  alternates: {
    canonical: "https://zoenexstudios.in/team",
  },
  openGraph: {
    title: "Our Team & Leadership | Zoenex Studios",
    description:
      "Meet the founders and engineers behind Zoenex Studios. Handcrafted web platforms, Next.js architecture, and custom AI automations.",
    url: "https://zoenexstudios.in/team",
    siteName: "Zoenex Studios",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zoenex Studios Leadership & Team",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team & Leadership | Zoenex Studios",
    description:
      "Meet the founders and engineers behind Zoenex Studios in Mumbai. Web development and AI automation.",
    images: ["/og-image.jpg"],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Home",
      item: "https://zoenexstudios.in",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Our Team",
      item: "https://zoenexstudios.in/team",
    },
  ],
};

const teamSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://zoenexstudios.in/team#webpage",
      url: "https://zoenexstudios.in/team",
      name: "Our Team & Leadership | Zoenex Studios",
      description:
        "Leadership and founding team of Zoenex Studios, a high-performance web development and AI automation studio in Mumbai, India.",
      isPartOf: {
        "@type": "WebSite",
        "@id": "https://zoenexstudios.in/#website",
        name: "Zoenex Studios",
        url: "https://zoenexstudios.in",
      },
      about: {
        "@type": "Organization",
        name: "Zoenex Studios",
        url: "https://zoenexstudios.in",
      },
    },
    ...TEAM_MEMBERS.map((member) => ({
      "@type": "Person",
      "@id": `https://zoenexstudios.in/team#${member.id}`,
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
      image: `https://zoenexstudios.in${member.image}`,
      worksFor: {
        "@type": "Organization",
        name: "Zoenex Studios",
        url: "https://zoenexstudios.in",
      },
      sameAs: [member.linkedin, member.github].filter(Boolean),
      knowsAbout: member.specialties,
    })),
  ],
};

export default function TeamPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(teamSchema) }}
      />
      <TeamView />
    </>
  );
}
