import { COMMUNITY_INFO } from './constants';

/**
 * Generate SEO metadata for pages
 * @param {Object} options - SEO options
 * @returns {Object} Metadata object
 */
export function generateSEOMeta({
  title = '',
  description = '',
  keywords = [],
  ogImage = '/og-image.png',
  ogType = 'website',
}) {
  const fullTitle = title
    ? `${title} | ${COMMUNITY_INFO.name}`
    : `${COMMUNITY_INFO.name} - ${COMMUNITY_INFO.fullName}`;

  const defaultDescription =
    'Join GDG-DIT to learn, connect, and grow in the world of technology. Workshops, events, and community-driven learning.';

  const defaultKeywords = [
    'GDG',
    'Google Developer Groups',
    'DIT',
    'Dehradun',
    'Technology',
    'Events',
    'Workshops',
    'Community',
  ];

  return {
    title: fullTitle,
    description: description || defaultDescription,
    keywords: [...defaultKeywords, ...keywords].join(', '),
    openGraph: {
      title: fullTitle,
      description: description || defaultDescription,
      type: ogType,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title || COMMUNITY_INFO.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: description || defaultDescription,
      images: [ogImage],
    },
  };
}
