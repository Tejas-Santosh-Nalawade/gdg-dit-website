import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Contact Us | Get in Touch",
  description: "Contact GDG-DIT for event inquiries, sponsorship opportunities, or general questions. Connect via email, LinkedIn, Twitter, or Instagram. Located at Dr. D. Y. Patil Institute of Technology, Pune.",
  keywords: [
    "Contact GDG DIT",
    "GDG Email",
    "Sponsorship Opportunities",
    "Tech Community Contact Pune",
    "Event Inquiries",
    "Developer Community Contact"
  ],
  path: "/contact"
});

export default function ContactLayout({ children }) {
  return children;
}
