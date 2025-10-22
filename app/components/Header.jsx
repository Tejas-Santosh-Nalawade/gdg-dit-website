'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/team', label: 'Team' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
              background: 'linear-gradient(to right, #4285f4, #ea4335, #f9ab00, #34a853)'
            }}>
              <span className="text-white font-bold text-xl" style={{ fontFamily: 'Google Sans, sans-serif' }}>GDG</span>
            </div>
            <span className="text-xl font-bold" style={{ color: '#1e1e1e', fontFamily: 'Google Sans, sans-serif' }}>GDG-DIT</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:opacity-70 transition-opacity font-medium"
                style={{ color: '#5f6368' }}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="text-white px-6 py-2 rounded-full transition-all duration-300 hover:shadow-lg font-medium"
              style={{ backgroundColor: '#4285f4', fontFamily: 'Google Sans, sans-serif' }}
            >
              Join Community
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
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
          <div className="md:hidden mt-4 pb-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block hover:opacity-70 transition-opacity font-medium py-2"
                style={{ color: '#5f6368' }}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/join"
              className="block text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 font-medium text-center"
              style={{ backgroundColor: '#4285f4', fontFamily: 'Google Sans, sans-serif' }}
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
