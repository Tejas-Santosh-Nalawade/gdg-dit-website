'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const coordinators = [
  {
    id: 1,
    name: 'Dr. Dheeraj Agrawal',
    role: 'Faculty Coordinator',
    image: '/images/team/Dheeraj-Agrawal.webp',
    color: '#4285f4',
  },
  {
    id: 2,
    name: 'Payal Wankhade',
    role: 'Faculty Coordinator',
    image: '/images/team/Payal-Wankhade.png',
    color: '#ea4335',
  },
];

export default function FacultyCoordinators() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const headerVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="faculty-coordinators" className="relative py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={headerVariants}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Faculty Coordinators
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Guiding and mentoring the GDG-DIT community with expertise and dedication
          </p>
        </motion.div>

        {/* Coordinators Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto"
        >
          {coordinators.map((coordinator, index) => (
            <motion.div
              key={coordinator.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                scale: 1.03,
                transition: { duration: 0.3, ease: "easeOut" },
              }}
              className="group"
            >
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100">
                {/* Colored top border */}
                <motion.div
                  className="h-1.5 w-full"
                  style={{ backgroundColor: coordinator.color }}
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.15 + 0.4 }}
                />

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <motion.div
                    initial={{ scale: 1.2, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                  >
                    <Image
                      src={coordinator.image}
                      alt={coordinator.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </motion.div>
                </div>

                {/* Info Section */}
                <div className="p-5 text-center">
                  <h3
                    className="text-lg font-bold text-gray-900 mb-1.5"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {coordinator.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{ color: coordinator.color }}
                  >
                    {coordinator.role}
                  </p>

                  {/* Decorative element */}
                  <div className="flex items-center justify-center gap-1">
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-blue-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.6 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-red-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.7 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-yellow-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.8 }}
                    />
                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-green-500"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.15 + 0.9 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

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
