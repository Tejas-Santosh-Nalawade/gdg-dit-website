'use client';

import { motion } from 'framer-motion';

export default function WhatWeDo() {
  const features = [
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: 'Workshops & Study Jams',
      description: 'Hands-on learning sessions on cutting-edge technologies',
      color: '#4285f4', // Blue
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: 'Hackathons',
      description: 'Build innovative solutions and compete with peers',
      color: '#ea4335', // Red
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      ),
      title: 'Tech Talks',
      description: 'Expert speakers sharing industry insights',
      color: '#f9ab00', // Yellow
    },
    {
      icon: (
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: 'Networking',
      description: 'Connect with like-minded developers and professionals',
      color: '#34a853', // Green
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="relative py-24 md:py-28 bg-[#f0f0f0] overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#1e1e1e]">
            What We Do
          </h2>
          <p className="text-xl md:text-2xl text-[#1e1e1e]/70 leading-relaxed">
            GDG-DIT is a community-driven platform where developers come together to learn about
            Google technologies, share knowledge, and build amazing projects.
          </p>
        </motion.div>

        {/* Feature Cards - Better alignment and design */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="relative group h-full"
            >
              <div className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-xl transition-all duration-300 border-2 border-[#1e1e1e]/5 hover:border-[#1e1e1e]/10 h-full flex flex-col">
                {/* Icon container with individual color */}
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${feature.color}15`,
                    color: feature.color
                  }}
                >
                  {feature.icon}
                </div>

                <h3 className="text-xl md:text-2xl font-bold text-[#1e1e1e] mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-[#1e1e1e]/70 leading-relaxed flex-grow">
                  {feature.description}
                </p>

                {/* Color accent bar at top */}
                <div
                  className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl transition-all duration-300"
                  style={{ backgroundColor: feature.color }}
                />
                
                {/* Hover effect - bottom accent */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-16 rounded-full transition-all duration-300"
                  style={{ backgroundColor: feature.color }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
