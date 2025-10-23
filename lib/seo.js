// SEO Configuration for GDG-DIT Website

export const siteConfig = {
  name: "GDG-DIT",
  title: "GDG-DIT | Google Developer Groups at DIT Pune",
  description: "Join GDG-DIT (Google Developer Groups) at Dr. D. Y. Patil Institute of Technology, Pune. Learn cutting-edge technologies, attend workshops, hackathons, and connect with developers. Explore AI/ML, Cloud Computing, Android, Flutter, Web Development & more.",
  url: "https://gdg-dit.vercel.app",
  ogImage: "https://gdg-dit.vercel.app/images/home/banner.webp",
  keywords: [
    "GDG DIT",
    "Google Developer Groups DIT",
    "GDSC DIT",
    "Tech Community Pune",
    "Developer Community Pune",
    "DY Patil Institute Technology",
    "Google Cloud Study Jam",
    "Android Development Workshop",
    "Web Development Community",
    "AI ML Workshop Pune",
    "Flutter Development",
    "Hackathon Pune",
    "Tech Events Pune",
    "Student Developer Community",
    "Google Technologies",
    "Cloud Computing Workshop",
    "Competitive Programming",
    "DSA Community",
    "Tech Meetups Pune",
    "Developer Events India"
  ],
  authors: [
    {
      name: "GDG-DIT Team",
      url: "https://gdg-dit.vercel.app/team"
    }
  ],
  creator: "GDG-DIT",
  publisher: "GDG-DIT",
  category: "Technology",
  locale: "en_US",
  type: "website",
  twitter: {
    card: "summary_large_image",
    site: "@gdgdit",
    creator: "@gdgdit"
  },
  verification: {
    google: "", // Add Google Search Console verification code
    yandex: "",
    yahoo: "",
    bing: ""
  },
  alternates: {
    canonical: "https://gdg-dit.vercel.app"
  }
};

// Generate metadata for pages
export function generatePageMetadata({
  title,
  description,
  keywords = [],
  ogImage,
  path = "",
  noindex = false
}) {
  const pageUrl = `${siteConfig.url}${path}`;
  const pageTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.title;
  const pageDescription = description || siteConfig.description;
  const pageImage = ogImage || siteConfig.ogImage;
  const allKeywords = [...siteConfig.keywords, ...keywords].join(", ");

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: allKeywords,
    authors: siteConfig.authors,
    creator: siteConfig.creator,
    publisher: siteConfig.publisher,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: pageUrl
    },
    openGraph: {
      type: siteConfig.type,
      locale: siteConfig.locale,
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle
        }
      ]
    },
    twitter: {
      card: siteConfig.twitter.card,
      site: siteConfig.twitter.site,
      creator: siteConfig.twitter.creator,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage]
    },
    robots: {
      index: !noindex,
      follow: !noindex,
      googleBot: {
        index: !noindex,
        follow: !noindex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1
      }
    },
    verification: siteConfig.verification,
    category: siteConfig.category
  };
}

// Structured Data (JSON-LD) helpers
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GDG-DIT",
    alternateName: "Google Developer Groups DIT",
    url: siteConfig.url,
    logo: `${siteConfig.url}/GDSC-logo.svg`,
    description: siteConfig.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Dr. D. Y. Patil Institute of Technology",
      addressLocality: "Pune",
      addressRegion: "Maharashtra",
      addressCountry: "IN"
    },
    sameAs: [
      "https://linkedin.com/company/gdg-dit",
      "https://twitter.com/gdgdit",
      "https://instagram.com/gdgdit",
      "https://discord.gg/gdgdit"
    ],
    contactPoint: {
      "@type": "ContactPoint",
      email: "contact@gdgdit.com",
      contactType: "General Inquiries"
    }
  };
}

export function generateEventSchema(event) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.date,
    location: {
      "@type": "Place",
      name: event.venue,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN"
      }
    },
    organizer: {
      "@type": "Organization",
      name: "GDG-DIT",
      url: siteConfig.url
    },
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode"
  };
}

export function generateBreadcrumbSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`
    }))
  };
}

export function generateArticleSchema(article) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    author: {
      "@type": "Person",
      name: article.author
    },
    publisher: {
      "@type": "Organization",
      name: "GDG-DIT",
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/GDSC-logo.svg`
      }
    },
    datePublished: article.date,
    dateModified: article.date
  };
}

export function generateWebPageSchema(page) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: `${siteConfig.url}${page.path}`,
    publisher: {
      "@type": "Organization",
      name: "GDG-DIT"
    }
  };
}
