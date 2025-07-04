"use client"

interface StructuredDataProps {
  lang: string;
  title: string;
  description: string;
  url: string;
  region: string;
}

export default function StructuredData({ lang, title, description, url, region }: StructuredDataProps) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Nexogen AI",
    "description": description,
    "url": url,
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    },
    "provider": {
      "@type": "Organization",
      "name": "Nexogen",
      "url": "https://nexogen.app",
      "logo": "https://nexogen.app/logo.png"
    },
    "inLanguage": lang,
    "areaServed": {
      "@type": "Country",
      "name": region
    },
    "featureList": [
      "AI-powered transcription",
      "Speaker diarization",
      "Secure note-taking",
      "GDPR compliance",
      "HIPAA compliance",
      "End-to-end encryption",
      "100+ languages supported"
    ],
    "screenshot": "https://nexogen.com/screenshot.png",
    "softwareVersion": "1.0.0",
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData)
      }}
    />
  );
} 