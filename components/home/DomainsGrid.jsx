'use client';

import { motion } from 'framer-motion';
import { domains } from '@/data/domains.json';

// SVG Icons for each domain
const DomainIcon = ({ name, color }) => {
  const icons = {
    'AI/ML': (
      <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        <circle cx="12" cy="9" r="2" fill={color} />
      </svg>
    ),
    'App Dev (Mobile + Web)': (
      <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6M9 11h6" stroke={color} />
      </svg>
    ),
    'DSA/CP': (
      <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" fill={color} opacity="0.2" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    'Cybersecurity': (
      <svg className="w-12 h-12 md:w-14 md:h-14" fill="none" stroke={color} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        <circle cx="12" cy="15" r="1" fill={color} />
      </svg>
    ),
  };
  
  return icons[name] || icons['AI/ML'];
};

export default function DomainsGrid() {
  const domainColors = {
    'AI/ML': '#ea4335',   // Red
    'App Dev (Mobile + Web)': '#4285f4',   // Blue
    'DSA/CP': '#f9ab00', // Yellow
    'Cybersecurity': '#34a853'   // Green
  };

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
    <section className="relative py-24 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        {/* Section Header - Bigger fonts */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1e1e1e] mb-5">
            Our Tech Domains
          </h2>
          <p className="text-xl md:text-2xl text-[#1e1e1e]/70 max-w-3xl mx-auto">
            Explore various technologies and find your passion
          </p>
        </motion.div>

        {/* Domains Grid - 2x2 for 4 domains */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {domains.map((domain) => (
            <motion.div
              key={domain.name}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              {/* Card - Larger */}
              <div className="relative bg-white rounded-3xl p-8 md:p-10 hover:shadow-xl transition-all duration-300 border-2 border-[#1e1e1e]/5 hover:border-[#1e1e1e]/10">
                {/* Icon with domain color - Larger */}
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-3xl flex items-center justify-center mb-6"
                  style={{
                    backgroundColor: `${domainColors[domain.name]}15`,
                  }}
                >
                  <DomainIcon name={domain.name} color={domainColors[domain.name]} />
                </div>

                {/* Domain Title - Bigger */}
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#1e1e1e]">
                  {domain.name}
                </h3>

                {/* Description - Bigger */}
                <p className="text-base md:text-lg text-[#1e1e1e]/70 leading-relaxed">
                  {domain.description}
                </p>

                {/* Color accent indicator - Larger */}
                <div
                  className="absolute top-6 right-6 w-4 h-4 rounded-full"
                  style={{ backgroundColor: domainColors[domain.name] }}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
