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
    <section className="relative py-24 md:py-28 bg-[#f0f0f0] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        {/* Section Header - Bigger, more attractive */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e1e1e] mb-5"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Photo Gallery
          </motion.h2>
          <p className="text-xl md:text-2xl text-[#1e1e1e]/70 max-w-3xl mx-auto">
            Curated images from past events
          </p>
        </motion.div>

        {/* Slider Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Scroll left"
          >
            <svg className="w-6 h-6 text-[#1e1e1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm hover:bg-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 hidden md:block"
            aria-label="Scroll right"
          >
            <svg className="w-6 h-6 text-[#1e1e1e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Scrollable Gallery */}
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
            }}
          >
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative flex-shrink-0 group cursor-pointer"
              >
                {/* Image Card */}
                <div className="relative w-[320px] h-[400px] md:w-[380px] md:h-[480px] rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group-hover:scale-105">
                  {/* Placeholder with gradient for now - replace with actual images */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br flex items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(135deg, 
                        ${['#4285f4', '#ea4335', '#f9ab00', '#34a853'][index % 4]}30, 
                        ${['#4285f4', '#ea4335', '#f9ab00', '#34a853'][index % 4]}10)`,
                    }}
                  >
                    {/* Add Image component when real images are available */}
                    {/* <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    /> */}
                    
                    {/* Placeholder icon instead of emoji */}
                    <div className="flex flex-col items-center justify-center">
                      <svg 
                        className="w-24 h-24 mb-4" 
                        fill="none" 
                        stroke={['#4285f4', '#ea4335', '#f9ab00', '#34a853'][index % 4]}
                        strokeWidth={1.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                      </svg>
                      <span className="text-white/60 text-sm font-medium">Add Event Photo</span>
                    </div>
                  </div>

                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e]/80 via-[#1e1e1e]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="text-white text-xl md:text-2xl font-bold mb-2">
                        {image.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        View full gallery
                      </p>
                    </div>
                  </div>

                  {/* Decorative corner */}
                  <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full"
                    style={{
                      backgroundColor: ['#4285f4', '#ea4335', '#f9ab00', '#34a853'][index % 4],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
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
    </section>
  );
}
