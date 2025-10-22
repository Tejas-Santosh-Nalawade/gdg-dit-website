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
    },
    {
      icon: CodeIcon,
      title: 'Hands-on Workshops',
      description: 'Interactive workshops to develop practical skills',
      color: '#ea4335', // Red
    },
    {
      icon: NetworkIcon,
      title: 'Networking',
      description: 'Connect with speakers from Google and the dev community',
      color: '#f9ab00', // Yellow
    },
    {
      icon: GiftIcon,
      title: 'Surprises',
      description: 'Swag, gadgets, and plenty of community-driven activities',
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
    <section id="what-we-do" className="relative py-20 md:py-24 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}/>
      </div>

      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            What We Do
          </h2>
          <p className="text-lg md:text-xl text-[#5f6368] leading-relaxed">
            Empowering developers through hands-on learning and community collaboration
          </p>
        </motion.div>

        {/* Feature Cards - Matching screenshot style */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
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
                  y: -8,
                  transition: { duration: 0.3 },
                }}
                className="relative group"
              >
                <div 
                  className="bg-white rounded-3xl p-8 text-center shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full flex flex-col items-center"
                  style={{
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
                  }}
                >
                  {/* Icon with Google color */}
                  <div
                    className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                    style={{ 
                      backgroundColor: `${feature.color}15`,
                      color: feature.color
                    }}
                  >
                    <IconComponent className="w-10 h-10" />
                  </div>

                  <h3 className="text-xl font-bold text-[#1e1e1e] mb-3 leading-tight" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {feature.title}
                  </h3>
                  <p className="text-sm text-[#5f6368] leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Hover glow effect */}
                  <div
                    className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at 50% 0%, ${feature.color}10, transparent 70%)`
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
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
