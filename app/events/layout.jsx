import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Events & Workshops",
  description: "Attend GDG-DIT events, workshops, hackathons, and study jams. Learn Android, Cloud Computing, AI/ML, Flutter, Web Development. Join Google Cloud Study Jams, HackBit 2025, and more tech events in Pune.",
  keywords: [
    "GDG Events Pune",
    "Tech Workshops DIT",
    "Google Cloud Study Jam Pune",
    "Hackathon Pune",
    "Android Workshop",
    "AI ML Workshop",
    "Developer Meetups Pune",
    "Tech Events DIT",
    "Student Tech Events",
    "Coding Workshops Pune"
  ],
  path: "/events"
});

export default function EventsLayout({ children }) {
  return children;
}
