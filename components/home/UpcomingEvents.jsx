'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import eventsData from '@/data/events.json';

export default function UpcomingEvents() {
  const upcomingEvents = eventsData.upcomingEvents || [];
  const displayEvents = upcomingEvents.slice(0, 4);

  const getEventColor = (type) => {
    const colors = {
      'Workshop': { bg: 'rgba(66, 133, 244, 0.15)', text: '#4285f4', border: '#4285f4' },
      'Study Jam': { bg: 'rgba(255, 241, 179, 0.7)', text: '#f57f17', border: '#ffd54f' },
      'Hackathon': { bg: 'rgba(178, 235, 202, 0.6)', text: '#388e3c', border: '#81c784' },
      'Conference': { bg: 'rgba(187, 222, 251, 0.7)', text: '#1976d2', border: '#90caf9' },
      'Seminar': { bg: 'rgba(255, 204, 188, 0.6)', text: '#e64a19', border: '#ff8a65' },
    };
    return colors[type] || colors['Workshop'];
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
    <section id="upcoming-events" className="relative py-20 md:py-24 bg-[#fafafa] overflow-hidden">
      {/* Decorative top border with Google colors */}
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
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
            Upcoming Events
          </h2>
          <p className="text-lg md:text-xl text-[#5f6368] leading-relaxed">
            Join us for amazing learning experiences and networking opportunities
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayEvents.map((event) => {
            // Special color for Machine Learning Workshop
            const colors = event.title === 'Machine Learning Workshop' 
              ? { bg: 'rgba(234, 67, 53, 0.15)', text: '#ea4335', border: '#ea4335' }
              : getEventColor(event.type);
            return (
              <motion.div
                key={event.id}
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
                    backgroundColor: colors.bg,
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
                        background: `linear-gradient(135deg, ${colors.bg}, transparent 60%, ${colors.bg})`
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
                    <div className="w-6 h-6 text-gray-600">✦</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-600"/>
                    <div className="w-6 h-6 text-gray-600">~</div>
                    <div className="w-8 h-8 rounded-full border-2 border-gray-600"/>
                    <div className="w-6 h-6 text-gray-600">✦</div>
                  </div>

                  {/* Content */}
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    {/* Badge */}
                    <div className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
                      style={{
                        backgroundColor: colors.text,
                        color: '#ffffff'
                      }}
                    >
                      {event.type}
                    </div>

                    {/* Title */}
                    <h3 
                      className="text-2xl md:text-3xl font-bold mb-3 leading-tight drop-shadow-sm"
                      style={{ 
                        fontFamily: 'Google Sans, sans-serif',
                        color: colors.text,
                        textShadow: '2px 2px 4px rgba(255,255,255,0.8)'
                      }}
                    >
                      {event.title}
                    </h3>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm font-medium" style={{ color: colors.text }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span className="drop-shadow-sm" style={{ textShadow: '1px 1px 2px rgba(255,255,255,0.8)' }}>
                        {event.date}
                      </span>
                    </div>
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

        {/* View All Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/events">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#4285f4] text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              View All Events →
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
