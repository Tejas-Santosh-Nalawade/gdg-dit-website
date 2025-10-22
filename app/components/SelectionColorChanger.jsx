'use client';

import { useEffect, useState } from 'react';

export default function SelectionColorChanger() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Set Google Blue as the only selection color
    document.documentElement.style.setProperty('--selection-color', '#4285f4');
  }, []);

  // Don't render anything on server
  if (!mounted) return null;

  return null; // This component doesn't render anything
}
