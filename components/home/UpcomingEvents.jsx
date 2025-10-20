'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import eventsData from '@/data/events.json';

export default function UpcomingEvents() {
  const upcomingEvents = eventsData.upcomingEvents || [];
  const displayEvents = upcomingEvents.slice(0, 3);

  const getDomainColor = (domain) => {
    const colors = {
      'Android': '#34a853',
      'Cloud': '#4285f4',
      'Web': '#4285f4',
      'AI/ML': '#ea4335',
      'Flutter': '#57caff',
      'DevOps': '#f9ab00'
    };
    return colors[domain] || '#4285f4';
  };

  const getDomainIcon = (domain) => {
    const icons = {
      'Cloud': (
        <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        </svg>
      ),
      'AI/ML': (
        <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
      ),
      'Web': (
        <svg className="w-24 h-24" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      ),
    };
    return icons[domain] || icons['Cloud'];
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
            Upcoming Events
          </h2>
          <p className="text-xl md:text-2xl text-[#1e1e1e]/70 max-w-3xl mx-auto">
            Don't miss out on these exciting learning opportunities
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {displayEvents.map((event) => (
            <motion.div
              key={event.id}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-[#1e1e1e]/5">
                {/* Event Icon/Banner */}
                <div 
                  className="relative h-56 flex items-center justify-center"
                  style={{ 
                    backgroundColor: `${getDomainColor(event.domain)}10`,
                    color: getDomainColor(event.domain)
                  }}
                >
                  {getDomainIcon(event.domain)}
                  {/* Color accent */}
                  <div
                    className="absolute top-0 left-0 w-full h-2"
                    style={{ backgroundColor: getDomainColor(event.domain) }}
                  />
                </div>

                {/* Event Content */}
                <div className="p-6">
                  {/* Tags */}
                  <div className="flex gap-2 mb-4">
                    <span className="inline-flex items-center px-3 py-1.5 text-sm font-medium bg-[#f0f0f0] text-[#1e1e1e] rounded-full">
                      {event.type}
                    </span>
                    <span
                      className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full text-white"
                      style={{ backgroundColor: getDomainColor(event.domain) }}
                    >
                      {event.domain}
                    </span>
                  </div>

                  {/* Title - Bigger */}
                  <h3 className="text-xl md:text-2xl font-bold text-[#1e1e1e] mb-4 leading-tight">
                    {event.title}
                  </h3>

                  {/* Event Details - With SVG icons instead of emojis */}
                  <div className="space-y-3 mb-4 text-sm text-[#1e1e1e]/70">
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      <span>{event.venue}</span>
                    </div>
                  </div>

                  {/* Description - Bigger */}
                  <p className="text-base text-[#1e1e1e]/60 line-clamp-2">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button - Bigger */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/events"
            className="inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-[#4285f4] rounded-full hover:bg-[#3367D6] hover:shadow-xl hover:shadow-[#4285f4]/30 transition-all duration-300 hover:-translate-y-1"
          >
            View All Events
            <svg className="ml-2 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
