'use client';

import { useEffect, useState } from 'react';

export default function ScrollbarColorChanger() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Define section colors - each major section gets a Google color
    const sectionColors = {
      hero: '#4285f4',        // Blue
      'what-we-do': '#ea4335',    // Red
      'core-team': '#f9ab00',     // Yellow
      'upcoming-events': '#34a853', // Green
      domains: '#4285f4',         // Blue
      stats: '#ea4335',           // Red
      gallery: '#f9ab00',         // Yellow
      default: '#4285f4'          // Blue as default
    };

    const updateScrollbarColor = () => {
      const sections = document.querySelectorAll('section[id], main > div[id]');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      let currentColor = sectionColors.default;

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
          const sectionId = section.id;
          currentColor = sectionColors[sectionId] || sectionColors.default;
        }
      });

      // Update CSS custom property for scrollbar color
      document.documentElement.style.setProperty('--scrollbar-color', currentColor);
    };

    // Initial update
    updateScrollbarColor();

    // Update on scroll
    window.addEventListener('scroll', updateScrollbarColor, { passive: true });

    return () => {
      window.removeEventListener('scroll', updateScrollbarColor);
    };
  }, []);

  // Don't render anything on server
  if (!mounted) return null;

  return null; // This component doesn't render anything
}
