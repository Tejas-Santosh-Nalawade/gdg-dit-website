'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { stats } from '@/data/stats.json';

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
  const icons = ['🚀', '👥', '🎯', '⭐'];

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
                <div className="text-5xl md:text-6xl mb-4">
                  {icons[index]}
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
    </section>
  );
}
