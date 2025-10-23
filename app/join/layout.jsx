import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Join GDG-DIT Community",
  description: "Join GDG-DIT on Discord, WhatsApp, LinkedIn & Meetup. Connect with 500+ developers, attend workshops, earn certifications, and grow your tech skills. Access exclusive learning resources and networking opportunities.",
  keywords: [
    "Join GDG DIT",
    "Developer Community Membership",
    "Discord Developer Community",
    "WhatsApp Tech Group",
    "Join Google Developer Group",
    "Student Tech Community",
    "Tech Networking Pune",
    "Free Developer Resources"
  ],
  path: "/join"
});

export default function JoinLayout({ children }) {
  return children;
}
