'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

// All 12 gallery images
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

const gradients = [
  'linear-gradient(135deg, #4285f4, #ea4335)',
  'linear-gradient(135deg, #ea4335, #f9ab00)',
  'linear-gradient(135deg, #f9ab00, #34a853)',
  'linear-gradient(135deg, #34a853, #4285f4)',
  'linear-gradient(135deg, #4285f4, #f9ab00)',
  'linear-gradient(135deg, #ea4335, #34a853)',
];

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16 shadow-sm">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1e1e1e] mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Our <span className="text-[#4285f4]">Gallery</span>
            </h1>
            <p className="text-lg text-[#1e1e1e]/70 max-w-2xl mx-auto">
              Capturing moments from our events, workshops, and community activities
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {galleryImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="relative rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer aspect-square"
                style={{
                  border: '4px solid transparent',
                  background: `linear-gradient(white, white) padding-box, ${gradients[index % gradients.length]} border-box`
                }}
                onClick={() => setSelectedImage(image)}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    loading={index < 4 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="relative max-w-6xl max-h-[90vh] w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={selectedImage.src}
              alt={selectedImage.alt}
              fill
              className="object-contain"
              sizes="90vw"
            />
          </motion.div>
        </motion.div>
      )}

      {/* Decorative bottom border with Google colors */}
      <div className="fixed bottom-0 left-0 right-0 h-1 flex z-10">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>
    </main>
  );
}
