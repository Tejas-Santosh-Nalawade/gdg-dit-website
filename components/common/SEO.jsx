import Head from 'next/head';

export default function SEO({ 
  title = 'GDG-DIT | Google Developer Groups',
  description = 'Join GDG-DIT community. Learn, Build, and Grow Together with fellow developers.',
  image = '/images/og-image.png',
  url = 'https://gdgdit.com',
  type = 'website'
}) {
  const fullTitle = title.includes('GDG-DIT') ? title : `${title} | GDG-DIT`;
  
  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GDG-DIT" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional */}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
    </Head>
  );
}
