'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRef } from 'react';

// Gallery images - using actual images from gallery folder (all 12 images)
const galleryImages = [
  { id: 1, src: '/images/gallery/gallary-1.webp', alt: 'GDG Event 1' },
  { id: 2, src: '/images/gallery/gallary-2.webp', alt: 'GDG Event 2' },
  { id: 3, src: '/images/gallery/gallary-3.webp', alt: 'GDG Event 3' },
  { id: 4, src: '/images/gallery/gallary-4.webp', alt: 'GDG Event 4' },
  { id: 5, src: '/images/gallery/gallary-5.webp', alt: 'GDG Event 5' },
  { id: 6, src: '/images/gallery/gallary-6.webp', alt: 'GDG Event 6' },
  { id: 7, src: '/images/gallery/gallary-7.webp', alt: 'GDG Event 7' },
  { id: 8, src: '/images/gallery/gallary-8.webp', alt: 'GDG Event 8' },
  { id: 9, src: '/images/gallery/gallary-9.webp', alt: 'GDG Event 9' },
  { id: 10, src: '/images/gallery/gallary-10.webp', alt: 'GDG Event 10' },
  { id: 11, src: '/images/gallery/gallery-11.webp', alt: 'GDG Event 11' },
  { id: 12, src: '/images/gallery/gallery-12.webp', alt: 'GDG Event 12' },
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

        {/* Responsive Gallery Grid - 12 images, no blank spaces */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
          {galleryImages.map((image, index) => {
            const gradients = [
              'linear-gradient(135deg, #4285f4, #ea4335, #f9ab00, #34a853)',
              'linear-gradient(135deg, #ea4335, #f9ab00)',
              'linear-gradient(135deg, #f9ab00, #34a853)',
              'linear-gradient(135deg, #34a853, #4285f4)',
              'linear-gradient(135deg, #4285f4, #ea4335)',
              'linear-gradient(135deg, #4285f4, #34a853)',
              'linear-gradient(135deg, #ea4335, #f9ab00)',
              'linear-gradient(135deg, #f9ab00, #4285f4)',
              'linear-gradient(135deg, #34a853, #ea4335)',
              'linear-gradient(135deg, #ea4335, #4285f4)',
              'linear-gradient(135deg, #f9ab00, #34a853)',
              'linear-gradient(135deg, #4285f4, #f9ab00)',
            ];

            return (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer aspect-square"
                style={{
                  border: '3px solid transparent',
                  background: `linear-gradient(white, white) padding-box, ${gradients[index]} border-box`
                }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    priority={index < 4}
                    loading={index < 4 ? 'eager' : 'lazy'}
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* View More Button - Bigger */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/gallery">
            <button className="px-10 py-5 bg-[#4285f4] text-white text-lg font-semibold rounded-full hover:bg-[#3367D6] hover:shadow-xl hover:shadow-[#4285f4]/30 transition-all duration-300 hover:-translate-y-1">
              <span className="flex items-center gap-2 justify-center">
                View All Photos
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </button>
          </Link>
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
