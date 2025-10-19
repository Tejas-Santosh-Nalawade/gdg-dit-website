import HeroSection from '@/components/home/HeroSection';
import WhatWeDo from '@/components/home/WhatWeDo';
import UpcomingEvents from '@/components/home/UpcomingEvents';
import DomainsGrid from '@/components/home/DomainsGrid';
import StatsCounter from '@/components/home/StatsCounter';
import Gallery from '@/components/home/Gallery';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <WhatWeDo />
      <UpcomingEvents />
      <DomainsGrid />
      <StatsCounter />
      <Gallery />
    </main>
  );
}
