'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

// Gallery images - you can add more images from public/images/gallery folder
const galleryImages = [
  { id: 1, src: '/images/gallery/event1.jpg', alt: 'DevFest 2024', title: 'DevFest 2024' },
  { id: 2, src: '/images/gallery/event2.jpg', alt: 'Android Workshop', title: 'Android Workshop' },
  { id: 3, src: '/images/gallery/event3.jpg', alt: 'Cloud Study Jam', title: 'Cloud Study Jam' },
  { id: 4, src: '/images/gallery/event4.jpg', alt: 'ML Workshop', title: 'ML Workshop' },
  { id: 5, src: '/images/gallery/event5.jpg', alt: 'Flutter Fest', title: 'Flutter Fest' },
  { id: 6, src: '/images/gallery/event6.jpg', alt: 'Web Dev Bootcamp', title: 'Web Dev Bootcamp' },
  { id: 7, src: '/images/gallery/event7.jpg', alt: 'Hackathon 2024', title: 'Hackathon 2024' },
  { id: 8, src: '/images/gallery/event8.jpg', alt: 'Tech Talk', title: 'Tech Talk' },
];

export default function Gallery() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 400;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="gallery" className="relative py-20 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Gallery
          </h2>
          <p className="text-lg text-[#1e1e1e]/70">
            Take a look at some of our biggest events and activities
          </p>
        </motion.div>

        {/* Masonry Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {/* Large image - Top Left */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="col-span-2 row-span-2 relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            style={{
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4285f4, #ea4335, #f9ab00, #34a853) border-box'
            }}
          >
            <div className="relative w-full h-full min-h-[400px] bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-20 h-20" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Top Right - Small Red */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            style={{
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #ea4335, #f9ab00) border-box'
            }}
          >
            <div className="relative w-full h-full min-h-[195px] bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#ea4335]/0 via-transparent to-transparent group-hover:from-[#ea4335]/10 transition-all duration-300" />
          </motion.div>

          {/* Top Right - Small Yellow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            style={{
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #f9ab00, #34a853) border-box'
            }}
          >
            <div className="relative w-full h-full min-h-[195px] bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#f9ab00]/0 via-transparent to-transparent group-hover:from-[#f9ab00]/10 transition-all duration-300" />
          </motion.div>

          {/* Middle Right - Small Green */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            style={{
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #34a853, #4285f4) border-box'
            }}
          >
            <div className="relative w-full h-full min-h-[195px] bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#34a853]/0 via-transparent to-transparent group-hover:from-[#34a853]/10 transition-all duration-300" />
          </motion.div>

          {/* Middle Right - Small Blue */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
            style={{
              border: '4px solid transparent',
              background: 'linear-gradient(white, white) padding-box, linear-gradient(135deg, #4285f4, #ea4335) border-box'
            }}
          >
            <div className="relative w-full h-full min-h-[195px] bg-white">
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#4285f4]/0 via-transparent to-transparent group-hover:from-[#4285f4]/10 transition-all duration-300" />
          </motion.div>

          {/* Bottom Row - 4 small images */}
          {[
            { gradient: 'linear-gradient(135deg, #4285f4, #34a853)', hoverColor: '#4285f4' },
            { gradient: 'linear-gradient(135deg, #ea4335, #f9ab00)', hoverColor: '#ea4335' },
            { gradient: 'linear-gradient(135deg, #f9ab00, #4285f4)', hoverColor: '#f9ab00' },
            { gradient: 'linear-gradient(135deg, #34a853, #ea4335)', hoverColor: '#34a853' }
          ].map((item, index) => (
            <motion.div
              key={`bottom-${index}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.05 }}
              className="relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
              style={{
                border: '4px solid transparent',
                background: `linear-gradient(white, white) padding-box, ${item.gradient} border-box`
              }}
            >
              <div className="relative w-full h-full min-h-[195px] bg-white">
                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                  <svg className="w-16 h-16" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button - Bigger */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button className="px-10 py-5 bg-[#4285f4] text-white text-lg font-semibold rounded-full hover:bg-[#3367D6] hover:shadow-xl hover:shadow-[#4285f4]/30 transition-all duration-300 hover:-translate-y-1">
            <span className="flex items-center gap-2 justify-center">
              View All Photos
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </motion.div>
      </div>

      {/* Hide scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Decorative bottom border with Google colors */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>
    </section>
  );
}
