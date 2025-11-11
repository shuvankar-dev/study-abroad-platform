import { Helmet } from 'react-helmet-async'
import type { CityData } from '../data/cities'

interface SEOProps {
  city: CityData
  additionalKeywords?: string[]
}

const SEOComponent: React.FC<SEOProps> = ({ city, additionalKeywords = [] }) => {
  const allKeywords = [...city.localKeywords, ...additionalKeywords].join(', ')
  
  // Generate structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": `Codescholar Overseas - ${city.name}`,
    "description": `Leading study abroad consultants in ${city.name}. Expert guidance for overseas education, university admissions, and visa processing.`,
    "url": `https://codescholaroverseas.com/consultants/${city.slug}`,
    "telephone": "+91 87778 41275",
    "email": `${city.slug}@codescholaroverseas.com`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city.name,
      "addressRegion": city.state,
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": city.coordinates.lat,
      "longitude": city.coordinates.lng
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": city.coordinates.lat,
        "longitude": city.coordinates.lng
      },
      "geoRadius": "50000"
    },
    "services": [
      {
        "@type": "Service",
        "name": "Study Abroad Consultation",
        "description": "Expert guidance for international education"
      },
      {
        "@type": "Service", 
        "name": "University Application Assistance",
        "description": "Complete support for university admissions"
      },
      {
        "@type": "Service",
        "name": "Visa Processing Support", 
        "description": "End-to-end visa application assistance"
      },
      {
        "@type": "Service",
        "name": "IELTS/TOEFL Preparation",
        "description": "Test preparation and coaching services"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "500",
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": "$$",
    "openingHours": [
      "Mo-Fr 09:00-18:00",
      "Sa 10:00-16:00"
    ]
  }

  // Generate FAQ structured data
  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `What are the best study abroad consultants in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Codescholar Overseas is one of the leading study abroad consultants in ${city.name}, offering comprehensive guidance for international education with over 1000+ successful placements.`
        }
      },
      {
        "@type": "Question",
        "name": `How much do study abroad consultants charge in ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Study abroad consultation fees in ${city.name} vary based on services. Codescholar Overseas offers competitive pricing with transparent fee structure and value-added services.`
        }
      },
      {
        "@type": "Question",
        "name": `Which countries are popular for studies from ${city.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Popular study destinations from ${city.name} include USA, Canada, UK, Australia, Germany, and other European countries. We provide guidance for all major destinations.`
        }
      }
    ]
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{city.seoTitle}</title>
      <meta name="description" content={city.metaDescription} />
      <meta name="keywords" content={allKeywords} />
      
      {/* Open Graph Tags */}
      <meta property="og:title" content={city.seoTitle} />
      <meta property="og:description" content={city.metaDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://codescholaroverseas.com/consultants/${city.slug}`} />
      <meta property="og:image" content={`https://codescholaroverseas.com/images/cities/${city.slug}-study-abroad.jpg`} />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={city.seoTitle} />
      <meta name="twitter:description" content={city.metaDescription} />
      <meta name="twitter:image" content={`https://codescholaroverseas.com/images/cities/${city.slug}-study-abroad.jpg`} />
      
      {/* Additional SEO Tags */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" content={`https://codescholaroverseas.com/consultants/${city.slug}`} />
      
      {/* Local SEO Tags */}
      <meta name="geo.region" content={`IN-${city.state}`} />
      <meta name="geo.placename" content={city.name} />
      <meta name="geo.position" content={`${city.coordinates.lat};${city.coordinates.lng}`} />
      <meta name="ICBM" content={`${city.coordinates.lat}, ${city.coordinates.lng}`} />
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqData)}
      </script>
    </Helmet>
  )
}

export default SEOComponent