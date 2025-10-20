'use client';

import { motion } from 'framer-motion';
import { domains } from '@/data/domains.json';

// SVG Icon Components
const AIMLIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="currentColor"/>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M8 10C8.55228 10 9 9.55228 9 9C9 8.44772 8.55228 8 8 8C7.44772 8 7 8.44772 7 9C7 9.55228 7.44772 10 8 10Z" fill="currentColor"/>
    <path d="M16 10C16.5523 10 17 9.55228 17 9C17 8.44772 16.5523 8 16 8C15.4477 8 15 8.44772 15 9C15 9.55228 15.4477 10 16 10Z" fill="currentColor"/>
  </svg>
);

const AppDevIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="5" y="4" width="14" height="16" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M9 19H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <rect x="7" y="6" width="10" height="10" rx="1" fill="currentColor" opacity="0.2"/>
    <path d="M10 9L12 11L10 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 13H15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const DSAIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" fill="none"/>
    <path d="M12 7V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M8 8L10 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <path d="M14 14L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

const CybersecurityIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6V11C4 16.55 7.84 21.74 13 23C18.16 21.74 22 16.55 22 11V6L12 2Z" stroke="currentColor" strokeWidth="2" fill="none"/>
    <rect x="10" y="10" width="4" height="5" rx="1" fill="currentColor"/>
    <circle cx="12" cy="8" r="1.5" fill="currentColor"/>
    <path d="M9 11V9C9 7.34315 10.3431 6 12 6C13.6569 6 15 7.34315 15 9V11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const iconComponents = {
  'AI/ML': AIMLIcon,
  'App Dev (Mobile + Web)': AppDevIcon,
  'DSA/CP': DSAIcon,
  'Cybersecurity': CybersecurityIcon,
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
          {domains.map((domain) => {
            const IconComponent = iconComponents[domain.name];
            return (
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
                    {IconComponent && (
                      <IconComponent 
                        className="w-12 h-12 md:w-14 md:h-14"
                        style={{ color: domainColors[domain.name] }}
                      />
                    )}
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
