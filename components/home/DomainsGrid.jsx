'use client';

import { motion } from 'framer-motion';
import domainsData from '@/data/domains.json';

const domains = domainsData.domains;

export default function DomainsGrid() {
  const domainStyles = {
    'AI/ML': { 
      bg: 'rgba(234, 67, 53, 0.15)', 
      text: '#ea4335', 
      border: '#ea4335',
      accentBg: 'rgba(234, 67, 53, 0.6)'
    },
    'App Dev (Mobile + Web)': { 
      bg: 'rgba(66, 133, 244, 0.15)', 
      text: '#4285f4', 
      border: '#4285f4',
      accentBg: 'rgba(66, 133, 244, 0.7)'
    },
    'DSA/CP': { 
      bg: 'rgba(249, 171, 0, 0.15)', 
      text: '#f9ab00', 
      border: '#f9ab00',
      accentBg: 'rgba(249, 171, 0, 0.7)'
    },
    'Cybersecurity': { 
      bg: 'rgba(52, 168, 83, 0.15)', 
      text: '#34a853', 
      border: '#34a853',
      accentBg: 'rgba(52, 168, 83, 0.6)'
    }
  };

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section className="relative py-20 md:py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Tech Domains
          </h2>
          <p className="text-lg md:text-xl text-[#5f6368] leading-relaxed">
            Explore diverse technologies and find your area of expertise
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {domains.map((domain) => {
            const style = domainStyles[domain.name];
            return (
              <motion.div
                key={domain.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.3 },
                }}
                className="relative group cursor-pointer"
              >
                <div
                  className="relative rounded-3xl overflow-hidden aspect-[4/5] border-4 border-white shadow-lg"
                  style={{
                    backgroundColor: style.accentBg,
                    boxShadow: '0 8px 24px rgba(0,0,0,0.12)'
                  }}
                >
                  {/* Background pattern */}
                  <div className="absolute inset-0">
                    <div 
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `
                          repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px),
                          repeating-linear-gradient(-45deg, transparent, transparent 10px, rgba(0,0,0,0.05) 10px, rgba(0,0,0,0.05) 20px)
                        `,
                      }}
                    />
                    <div 
                      className="absolute inset-0" 
                      style={{
                        background: `linear-gradient(135deg, ${style.accentBg}, transparent 60%, ${style.accentBg})`
                      }}
                    />
                  </div>

                  {/* Decorative icons at top */}
                  <div className="absolute top-6 left-0 right-0 flex justify-center gap-4 opacity-70">
                    <svg className="w-8 h-8" viewBox="0 0 48 48" fill="none">
                      <path d="M12 16L24 8L36 16L24 24L12 16Z" fill="#4285f4"/>
                      <path d="M12 16L24 24V40L12 32V16Z" fill="#34a853"/>
                      <path d="M36 16L24 24V40L36 32V16Z" fill="#ea4335"/>
                    </svg>
                    <div className="w-6 h-6 text-gray-700">✦</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-700"/>
                    <div className="w-6 h-6 text-gray-700">~</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-700"/>
                    <div className="w-6 h-6 text-gray-700">✦</div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {/* Icon badge */}
                    <div 
                      className="inline-block p-3 rounded-2xl mb-4"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        color: style.text
                      }}
                    >
                      <svg className="w-10 h-10" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        {domain.name === 'AI/ML' && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        )}
                        {domain.name === 'App Dev (Mobile + Web)' && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        )}
                        {domain.name === 'DSA/CP' && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        )}
                        {domain.name === 'Cybersecurity' && (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                      </svg>
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3 leading-tight drop-shadow-sm"
                      style={{ 
                        fontFamily: 'Google Sans, sans-serif',
                        color: '#ffffff',
                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                      }}
                    >
                      {domain.name}
                    </h3>

                    {/* Description */}
                    <p 
                      className="text-sm leading-relaxed drop-shadow-sm"
                      style={{ 
                        color: '#ffffff',
                        textShadow: '1px 1px 2px rgba(0,0,0,0.3)'
                      }}
                    >
                      {domain.description}
                    </p>
                  </div>

                  {/* Corner decorations */}
                  <div className="absolute top-2 left-2 w-4 h-4 border-l-4 border-t-4 border-white rounded-tl-lg"/>
                  <div className="absolute top-2 right-2 w-4 h-4 border-r-4 border-t-4 border-white rounded-tr-lg"/>
                  <div className="absolute bottom-2 left-2 w-4 h-4 border-l-4 border-b-4 border-white rounded-bl-lg"/>
                  <div className="absolute bottom-2 right-2 w-4 h-4 border-r-4 border-b-4 border-white rounded-br-lg"/>
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
