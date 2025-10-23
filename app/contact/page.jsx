'use client';

import ContactForm from '@/components/contact/ContactForm';
import SponsorUs from '@/components/contact/SponsorUs';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/utils/constants';

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#34a853] to-[#4285f4] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Contact Us
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95">
            Get in touch with us for general inquiries or sponsorship opportunities
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                Get In Touch
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#e8f0fe] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#4285f4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e1e1e] mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Email</h3>
                    <a href="mailto:contact@gdgdit.com" className="text-[#4285f4] hover:text-[#3367D6]">
                      contact@gdgdit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#fce8e6] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#ea4335]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e1e1e] mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Location</h3>
                    <p className="text-[#5f6368]">
                      Dr. D. Y. Patil Institute of Technology<br />
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-[#e6f4ea] rounded-2xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-7 h-7 text-[#34a853]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1e1e1e] mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>Social Media</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="https://linkedin.com/company/gdg-dit" target="_blank" rel="noopener noreferrer" className="text-[#4285f4] hover:text-[#3367D6] font-medium">
                        LinkedIn
                      </a>
                      <span className="text-[#5f6368]">•</span>
                      <a href="https://twitter.com/gdgdit" target="_blank" rel="noopener noreferrer" className="text-[#4285f4] hover:text-[#3367D6] font-medium">
                        Twitter
                      </a>
                      <span className="text-[#5f6368]">•</span>
                      <a href="https://instagram.com/gdgdit" target="_blank" rel="noopener noreferrer" className="text-[#4285f4] hover:text-[#3367D6] font-medium">
                        Instagram
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sponsor Us Section */}
              <SponsorUs />
            </div>

            {/* Contact Form */}
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
