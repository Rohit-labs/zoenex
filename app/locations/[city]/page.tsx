import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LocationView from "@/components/views/LocationView";
import { getAllLocations, getLocationBySlug } from "@/lib/locations-data";

interface Props {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  const locations = getAllLocations();
  return locations.map((loc) => ({
    city: loc.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const url = `https://zoenexstudios.in/locations/${location.slug}`;

  return {
    title: `Web Developers in ${location.name}`,
    description: location.metaDescription,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `Web Developers in ${location.name} | Zoenex Studios`,
      description: location.metaDescription,
      url,
      type: "website",
      siteName: "Zoenex Studios",
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `Zoenex Studios - Web Developers in ${location.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `Web Developers in ${location.name} | Zoenex Studios`,
      description: location.metaDescription,
      images: ["/og-image.jpg"],
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { city } = await params;
  const location = getLocationBySlug(city);

  if (!location) {
    notFound();
  }

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
        name: "Locations",
        item: "https://zoenexstudios.in/locations",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: location.name,
        item: `https://zoenexstudios.in/locations/${location.slug}`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `Zoenex Studios - ${location.name}`,
    description: location.metaDescription,
    url: `https://zoenexstudios.in/locations/${location.slug}`,
    image: "https://zoenexstudios.in/icon.png",
    email: "zoenexstudios@gmail.com",
    telephone: ["+91 7021453048", "+91 8591494402"],
    priceRange: "$$$",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: location.name,
      },
      {
        "@type": "Country",
        name: location.country,
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressLocality: location.name,
      addressCountry: location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.coordinates.latitude,
      longitude: location.coordinates.longitude,
    },
    sameAs: ["https://www.instagram.com/madebyzoenex"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <LocationView location={location} />
    </>
  );
}
