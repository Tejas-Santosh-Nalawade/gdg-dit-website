'use client';

import { motion } from 'framer-motion';
import { MonitorIcon, CodeIcon, NetworkIcon, GiftIcon } from '@/components/icons/TechIcons';

export default function WhatWeDo() {
  const features = [
    {
      icon: MonitorIcon,
      title: 'Tech Talks',
      description: 'Engaging sessions on web, mobile, AI, cloud, and more',
      color: '#4285f4', // Blue
      gradient: 'from-blue-50 to-blue-100',
    },
    {
      icon: CodeIcon,
      title: 'Hands-on Workshops',
      description: 'Interactive workshops to develop practical skills',
      color: '#ea4335', // Red
      gradient: 'from-red-50 to-red-100',
    },
    {
      icon: NetworkIcon,
      title: 'Networking',
      description: 'Connect with speakers from Google and the dev community',
      color: '#f9ab00', // Yellow
      gradient: 'from-yellow-50 to-yellow-100',
    },
    {
      icon: GiftIcon,
      title: 'Surprises',
      description: 'Swag, gadgets, and plenty of community-driven activities',
      color: '#34a853', // Green
      gradient: 'from-green-50 to-green-100',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
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

  return (
    <section id="what-we-do" className="relative py-20 md:py-24 bg-white">
      {/* Google Colors Line at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            What We Do
          </h2>
          
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            Empowering developers through hands-on learning and community collaboration
          </p>
        </motion.div>

        {/* Feature Cards - Clean Professional Design */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { duration: 0.2 },
                }}
                className="group bg-white rounded-lg p-6 border-2 border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-5">
                  <div
                    className="inline-flex items-center justify-center w-14 h-14 rounded-lg"
                    style={{ backgroundColor: feature.color }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold mb-3 text-gray-900" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Bottom Accent Line */}
                <div 
                  className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                  style={{ backgroundColor: feature.color }}
                ></div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
