'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/sponsors', label: 'Sponsors' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-[#1e1e1e]/5">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Image
                src="/GDSC-logo.svg"
                alt="GDG Logo"
                width={48}
                height={48}
                className="w-12 h-12 transition-transform group-hover:scale-105"
              />
            </div>
            <span className="text-2xl md:text-3xl font-bold text-[#1e1e1e] tracking-tight">GDG-DIT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[#1e1e1e]/70 hover:text-[#4285f4] hover:bg-[#4285f4]/5 transition-all px-5 py-3 rounded-full font-semibold text-lg"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="ml-2 bg-[#4285f4] text-white px-8 py-3.5 rounded-full hover:bg-[#3367D6] hover:shadow-lg hover:shadow-[#4285f4]/25 transition-all font-bold text-lg"
            >
              Join Community
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1e1e1e] p-2 hover:bg-[#f0f0f0] rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-[#1e1e1e]/5 pt-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-[#1e1e1e]/70 hover:text-[#4285f4] hover:bg-[#4285f4]/5 transition-all font-semibold py-3.5 px-4 rounded-lg text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="block bg-[#4285f4] text-white px-6 py-4 rounded-full hover:bg-[#3367D6] transition-all font-bold text-center mt-4 text-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Community
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
