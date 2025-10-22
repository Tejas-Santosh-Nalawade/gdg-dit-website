import HeroSection from '@/components/home/HeroSection';
import WhatWeDo from '@/components/home/WhatWeDo';
import CoreTeamSectionSimple from '@/components/home/CoreTeamSectionSimple';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import DomainsGrid from '@/components/home/DomainsGrid';
import StatsCounter from '@/components/home/StatsCounter';
import Gallery from '@/components/home/Gallery';
import { generatePageMetadata, generateWebPageSchema } from '@/lib/seo';
import Script from 'next/script';

export const metadata = generatePageMetadata({
  title: "Home",
  description: "GDG-DIT is a vibrant Google Developer Groups community at Dr. D. Y. Patil Institute of Technology, Pune. Join 500+ developers learning AI/ML, Cloud Computing, Android, Flutter, Web Development. Attend workshops, hackathons, study jams & tech talks.",
  keywords: [
    "GDG DIT Pune",
    "Tech Community DIT",
    "Student Developer Group",
    "Google Developer Community Pune",
    "Tech Events DIT",
    "Developer Workshops Pune",
    "Coding Community DIT"
  ],
  path: ""
});

export default function Home() {
  const webPageSchema = generateWebPageSchema({
    title: "GDG-DIT | Google Developer Groups at DIT Pune",
    description: "Join GDG-DIT community. Learn, Build, and Grow Together with fellow developers.",
    path: ""
  });

  return (
    <>
      <Script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageSchema)
        }}
      />
      <main>
        <HeroSection />
        <WhatWeDo />
        <CoreTeamSectionSimple />
        <UpcomingEvents />
        <DomainsGrid />
        <StatsCounter />
        <Gallery />
      </main>
    </>
  );
}
