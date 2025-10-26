'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import sponsorsData from '@/data/sponsors.json';

export default function SponsorsPage() {
  const [activePackage, setActivePackage] = useState(null);

  const iconMap = {
    visibility: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    talent: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    community: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    event: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    marketing: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
    ),
    network: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
  };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#4285f4] to-[#34a853] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {sponsorsData.hero.title}
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95 leading-relaxed">
            {sponsorsData.hero.subtitle}
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {sponsorsData.stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-[#4285f4] mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-[#5f6368] text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Sponsors Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Our Valued Sponsors
          </h2>
          <p className="text-center text-[#5f6368] mb-12 max-w-2xl mx-auto">
            We're grateful for the support of our sponsors who believe in our mission
          </p>

          <div className="space-y-12">
            {sponsorsData.tiers.map((tier, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-sm">
                <h3 className="text-2xl md:text-3xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {tier.name}
                </h3>
                <p className="text-[#5f6368] mb-6">{tier.description}</p>
                
                {tier.sponsors.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {tier.sponsors.map((sponsor, idx) => (
                      <div key={idx} className="flex items-center justify-center p-6 bg-[#f8f9fa] rounded-xl hover:shadow-md transition-all">
                        <Image
                          src={sponsor.logo}
                          alt={sponsor.name}
                          width={150}
                          height={80}
                          className="object-contain"
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-[#f8f9fa] rounded-xl">
                    <p className="text-[#5f6368] text-lg">Become our first {tier.name.toLowerCase()}!</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {sponsorsData.benefits.title}
          </h2>
          <p className="text-center text-[#5f6368] mb-12 max-w-2xl mx-auto">
            {sponsorsData.benefits.subtitle}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sponsorsData.benefits.items.map((benefit, index) => (
              <div 
                key={index} 
                className="bg-[#fafafa] rounded-2xl p-8 hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="w-16 h-16 bg-linear-to-r from-[#4285f4] to-[#34a853] rounded-2xl flex items-center justify-center text-white mb-6">
                  {iconMap[benefit.icon]}
                </div>
                <h3 className="text-xl font-bold mb-3 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {benefit.title}
                </h3>
                <p className="text-[#5f6368] leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship Packages */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Sponsorship Packages
          </h2>
          <p className="text-center text-[#5f6368] mb-12 max-w-2xl mx-auto">
            Choose the package that best fits your goals
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {sponsorsData.packages.map((pkg, index) => (
              <div 
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all cursor-pointer ${
                  activePackage === index ? 'ring-2 ring-[#4285f4]' : ''
                }`}
                onClick={() => setActivePackage(index)}
              >
                <div 
                  className="w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: pkg.color }}
                ></div>
                <h3 className="text-2xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {pkg.tier}
                </h3>
                <div className="text-3xl font-bold text-[#4285f4] mb-6" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {pkg.price}
                </div>
                <ul className="space-y-3">
                  {pkg.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-[#5f6368]">
                      <svg className="w-5 h-5 text-[#34a853] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-linear-to-r from-[#4285f4] to-[#34a853]">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {sponsorsData.cta.title}
          </h2>
          <p className="text-xl text-white/95 mb-8 leading-relaxed">
            {sponsorsData.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`mailto:${sponsorsData.cta.email}?subject=${encodeURIComponent(sponsorsData.cta.subject)}`}
              className="inline-block bg-white text-[#4285f4] px-8 py-4 rounded-full font-bold hover:bg-[#f0f0f0] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 text-lg"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Contact Us for Sponsorship
            </a>
            <Link
              href="/contact"
              className="inline-block bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold hover:bg-white hover:text-[#4285f4] transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div className="bg-[#fafafa] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                What are the sponsorship opportunities?
              </h3>
              <p className="text-[#5f6368] leading-relaxed">
                We offer multiple sponsorship tiers including Platinum, Gold, Silver, and Community Partner levels. Each tier comes with unique benefits tailored to your goals.
              </p>
            </div>

            <div className="bg-[#fafafa] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Can we customize our sponsorship package?
              </h3>
              <p className="text-[#5f6368] leading-relaxed">
                Absolutely! We're happy to create custom sponsorship packages that align with your specific objectives and budget. Contact us to discuss your needs.
              </p>
            </div>

            <div className="bg-[#fafafa] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                How will our brand be promoted?
              </h3>
              <p className="text-[#5f6368] leading-relaxed">
                Sponsors receive visibility through our website, social media channels, event materials, newsletters, and at physical events. The level of promotion depends on the sponsorship tier.
              </p>
            </div>

            <div className="bg-[#fafafa] rounded-2xl p-6">
              <h3 className="text-xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                What events do you organize?
              </h3>
              <p className="text-[#5f6368] leading-relaxed">
                We organize workshops, hackathons, tech talks, coding competitions, and networking events throughout the year, attracting hundreds of participants from various technical backgrounds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
