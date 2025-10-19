'use client';

import ContactForm from '@/components/contact/ContactForm';
import SponsorUs from '@/components/contact/SponsorUs';
import { SOCIAL_LINKS, CONTACT_INFO } from '@/utils/constants';

export default function ContactPage() {

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Contact Us
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Get in touch with us for general inquiries or sponsorship opportunities
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                Get In Touch
              </h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📧
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                    <a href="mailto:contact@gdgdit.com" className="text-blue-600 hover:text-blue-800">
                      contact@gdgdit.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    📍
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Location</h3>
                    <p className="text-gray-600">
                      Dr. D. Y. Patil Institute of Technology<br />
                      Pune, Maharashtra, India
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                    🌐
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-1">Social Media</h3>
                    <div className="flex gap-3 mt-2">
                      <a href="https://linkedin.com/company/gdg-dit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        LinkedIn
                      </a>
                      <span className="text-gray-400">•</span>
                      <a href="https://twitter.com/gdgdit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        Twitter
                      </a>
                      <span className="text-gray-400">•</span>
                      <a href="https://instagram.com/gdgdit" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
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
