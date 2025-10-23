'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

// Gallery images - using actual images from gallery folder
const galleryImages = [
  { id: 1, src: '/images/gallery/gallery-1.jpg', alt: 'GDG Event 1' },
  { id: 2, src: '/images/gallery/gallery-2.jpg', alt: 'GDG Event 2' },
  { id: 3, src: '/images/gallery/gallery-3.jpg', alt: 'GDG Event 3' },
  { id: 4, src: '/images/gallery/gallery-4.jpg', alt: 'GDG Event 4' },
  { id: 5, src: '/images/gallery/gallery-5.jpg', alt: 'GDG Event 5' },
  { id: 6, src: '/images/gallery/gallery-6.jpg', alt: 'GDG Event 6' },
  { id: 7, src: '/images/gallery/gallery-7.jpg', alt: 'GDG Event 7' },
  { id: 8, src: '/images/gallery/gallery-8.jpg', alt: 'GDG Event 8' },
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
          {/* Large image - Top Left - Gallery 1 */}
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
            <div className="relative w-full h-full min-h-[400px]">
              <Image
                src={galleryImages[0].src}
                alt={galleryImages[0].alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </motion.div>

          {/* Top Right - Gallery 2 */}
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
            <div className="relative w-full h-full min-h-[195px]">
              <Image
                src={galleryImages[1].src}
                alt={galleryImages[1].alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#ea4335]/0 via-transparent to-transparent group-hover:from-[#ea4335]/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Top Right - Gallery 3 */}
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
            <div className="relative w-full h-full min-h-[195px]">
              <Image
                src={galleryImages[2].src}
                alt={galleryImages[2].alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#f9ab00]/0 via-transparent to-transparent group-hover:from-[#f9ab00]/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Middle Right - Gallery 4 */}
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
            <div className="relative w-full h-full min-h-[195px]">
              <Image
                src={galleryImages[3].src}
                alt={galleryImages[3].alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#34a853]/0 via-transparent to-transparent group-hover:from-[#34a853]/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Middle Right - Gallery 5 */}
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
            <div className="relative w-full h-full min-h-[195px]">
              <Image
                src={galleryImages[4].src}
                alt={galleryImages[4].alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-linear-to-br from-[#4285f4]/0 via-transparent to-transparent group-hover:from-[#4285f4]/10 transition-all duration-300" />
            </div>
          </motion.div>

          {/* Bottom Row - Gallery 6, 7, 8 */}
          {[
            { gradient: 'linear-gradient(135deg, #4285f4, #34a853)', imageIndex: 5 },
            { gradient: 'linear-gradient(135deg, #ea4335, #f9ab00)', imageIndex: 6 },
            { gradient: 'linear-gradient(135deg, #f9ab00, #4285f4)', imageIndex: 7 }
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
              <div className="relative w-full h-full min-h-[195px]">
                <Image
                  src={galleryImages[item.imageIndex].src}
                  alt={galleryImages[item.imageIndex].alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
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
