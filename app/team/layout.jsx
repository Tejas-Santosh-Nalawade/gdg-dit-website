import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Our Team | GDG Organizers & Volunteers",
  description: "Meet the GDG-DIT organizing team and volunteers. Passionate students and professionals dedicated to building a vibrant developer community at Dr. D. Y. Patil Institute of Technology.",
  keywords: [
    "GDG Team",
    "Community Organizers",
    "Tech Community Leaders",
    "Student Developers",
    "GDG Volunteers",
    "Developer Community Leaders Pune"
  ],
  path: "/team"
});

export default function TeamLayout({ children }) {
  return children;
}
