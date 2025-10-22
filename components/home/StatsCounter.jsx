'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import statsData from '@/data/stats.json';

const stats = statsData.stats;

function Counter({ value, suffix }) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const animation = animate(count, value, {
      duration: 2,
      ease: 'easeOut',
    });

    const unsubscribe = rounded.on('change', (latest) => {
      setDisplayValue(latest);
    });

    return () => {
      animation.stop();
      unsubscribe();
    };
  }, [value, count, rounded]);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('stats-section');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [hasAnimated]);

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

  // Individual Google colors for each stat
  const colors = ['#4285f4', '#ea4335', '#f9ab00', '#34a853'];
  
  // SVG icons for each stat
  const getIcon = (index) => {
    const iconPaths = [
      // Rocket
      <path key="rocket" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      // Users
      <path key="users" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
      // Target
      <path key="target" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />,
      // Star
      <path key="star" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    ];
    return iconPaths[index];
  };

  return (
    <section
      id="stats-section"
      className="relative py-24 md:py-28 bg-[#f0f0f0] overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-6 md:px-8 max-w-7xl relative z-10"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.3 },
              }}
              className="relative group"
            >
              {/* Card - Bigger */}
              <div className="relative text-center p-8 rounded-3xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-[#1e1e1e]/5">
                {/* Icon - Bigger */}
                <div className="mb-4 flex justify-center">
                  <svg 
                    className="w-14 h-14 md:w-16 md:h-16" 
                    fill="none" 
                    stroke={colors[index]}
                    viewBox="0 0 24 24"
                  >
                    {getIcon(index)}
                  </svg>
                </div>

                {/* Stat Value with individual color - Bigger */}
                <div
                  className="text-5xl md:text-6xl lg:text-7xl font-bold mb-3"
                  style={{ color: colors[index] }}
                >
                  {isVisible && <Counter value={stat.value} suffix={stat.suffix} />}
                </div>

                {/* Stat Label - Bigger */}
                <div className="text-base md:text-lg text-[#1e1e1e]/70 font-medium">
                  {stat.label}
                </div>

                {/* Color indicator - Bigger */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1.5 w-16 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

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
