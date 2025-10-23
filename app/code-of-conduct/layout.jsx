import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Code of Conduct | Community Guidelines",
  description: "GDG-DIT Code of Conduct. Our commitment to creating a safe, welcoming, and inclusive tech community. Learn about expected behavior, reporting guidelines, and community standards.",
  keywords: [
    "Code of Conduct",
    "Community Guidelines",
    "Inclusive Tech Community",
    "Safe Space",
    "Community Standards"
  ],
  path: "/code-of-conduct"
});

export default function CodeOfConductLayout({ children }) {
  return children;
}
