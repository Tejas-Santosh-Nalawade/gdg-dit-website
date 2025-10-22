import { siteConfig } from '@/lib/seo';

export default function sitemap() {
  const routes = [
    '',
    '/events',
    '/team',
    '/contact',
    '/join',
    '/code-of-conduct'
  ].map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: route === '' ? 'daily' : route === '/events' ? 'daily' : 'monthly',
    priority: route === '' ? 1 : route === '/events' ? 0.9 : 0.8
  }));

  return routes;
}
