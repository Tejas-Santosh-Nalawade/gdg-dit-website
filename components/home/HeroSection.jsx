'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import { useState, useEffect } from 'react';

function Counter({ value, suffix = '' }) {
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
    <>
      {displayValue}
      {suffix}
    </>
  );
}

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex items-center pt-16 pb-20 md:pt-20 md:pb-24 overflow-hidden">
      {/* Enhanced Background Gradient Animation - Lighter */}
      <div className="absolute inset-0 z-0 opacity-30">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255, 255, 255)"
          gradientBackgroundEnd="rgb(250, 250, 252)"
          firstColor="66, 133, 244"
          secondColor="234, 67, 53"
          thirdColor="251, 188, 5"
          fourthColor="52, 168, 83"
          fifthColor="66, 133, 244"
          pointerColor="66, 133, 244"
          size="60%"
          blendingValue="soft-light"
          interactive={true}
          containerClassName="absolute inset-0"
        />
      </div>

      {/* White overlay for better text visibility */}
      <div className="absolute inset-0 z-1 bg-white/40 backdrop-blur-[0.5px]"></div>

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 z-1 overflow-hidden pointer-events-none">
        {/* Blue Circle */}
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] left-[10%] w-32 h-32 rounded-full bg-[#4285f4]/10 blur-2xl"
        />
        
        {/* Red Square */}
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[60%] right-[15%] w-24 h-24 bg-[#ea4335]/10 blur-xl"
        />

        {/* Yellow Circle */}
        <motion.div
          animate={{
            x: [0, -60, 0],
            y: [0, 80, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[30%] left-[20%] w-40 h-40 rounded-full bg-[#f9ab00]/10 blur-3xl"
        />

        {/* Green Triangle */}
        <motion.div
          animate={{
            x: [0, 90, 0],
            y: [0, -70, 0],
            rotate: [0, -180, -360]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[40%] right-[25%] w-28 h-28 rounded-full bg-[#34a853]/10 blur-2xl"
        />

        {/* Small floating dots */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
            className="absolute w-3 h-3 rounded-full"
            style={{
              left: `${15 + i * 10}%`,
              top: `${20 + (i % 3) * 20}%`,
              backgroundColor: ['#4285f4', '#ea4335', '#f9ab00', '#34a853'][i % 4],
              opacity: 0.4
            }}
          />
        ))}
      </div>

      {/* Google Developer Groups Logo with Animation - Top Right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[8%] right-[6%] z-10 hidden xl:block"
      >
        <motion.div
          animate={{ 
            y: [0, -15, 0],
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-56 h-56 2xl:w-64 2xl:h-64"
        >
          <Image
            src="/globe.gif"
            alt="Google Developers"
            fill
            className="object-contain opacity-90 drop-shadow-2xl"
            priority
            unoptimized
          />
        </motion.div>
      </motion.div>

      {/* 3D Google Text - Top Left */}
      <motion.div
        initial={{ opacity: 0, x: -100, rotateY: -45 }}
        animate={{ opacity: 1, x: 0, rotateY: 0 }}
        transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[8%] left-[4%] z-10 hidden xl:block"
      >
        <motion.div
          animate={{ 
            rotateY: [0, 5, 0, -5, 0],
            rotateX: [0, 2, 0, -2, 0]
          }}
          transition={{ 
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ perspective: 1000 }}
          className="relative"
        >
          {/* 3D Google Text with individual colored letters */}
          <div className="text-6xl 2xl:text-7xl font-black tracking-tight" style={{ fontFamily: 'Google Sans, sans-serif', textShadow: '4px 4px 0px rgba(0,0,0,0.1), 8px 8px 0px rgba(0,0,0,0.05)' }}>
            <motion.span 
              className="inline-block"
              style={{ color: '#4285f4' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            >
              G
            </motion.span>
            <motion.span 
              className="inline-block"
              style={{ color: '#ea4335' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.2 }}
            >
              o
            </motion.span>
            <motion.span 
              className="inline-block"
              style={{ color: '#f9ab00' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.4 }}
            >
              o
            </motion.span>
            <motion.span 
              className="inline-block"
              style={{ color: '#4285f4' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            >
              g
            </motion.span>
            <motion.span 
              className="inline-block"
              style={{ color: '#34a853' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.8 }}
            >
              l
            </motion.span>
            <motion.span 
              className="inline-block"
              style={{ color: '#ea4335' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            >
              e
            </motion.span>
          </div>
          
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="mt-1 text-xs font-semibold text-gray-600 tracking-wider"
          >
            DEVELOPER GROUPS
          </motion.div>

          {/* Decorative elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-3 -right-3 w-10 h-10 rounded-full border-4 border-[#4285f4] opacity-30"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-3 -left-3 w-12 h-12 rounded-full border-4 border-[#ea4335] opacity-20"
          />
        </motion.div>
      </motion.div>

      {/* Student Developer Icon with Animation - Bottom Left */}
      {/* Removed - no longer needed */}

      {/* Enhanced Events Badge - Bottom Right */}
      {/* Removed - no longer needed */}

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Content - Centered */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#1e1e1e]/10 mb-6 shadow-sm"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4285f4]" />
                <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
                <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
                <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              </div>
              <span className="text-[#1e1e1e] text-base font-semibold tracking-tight">
                Google Developer Groups - DIT
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black text-[#1e1e1e] mb-6 leading-[1.05] tracking-[-0.03em]"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.5)' }}
            >
              Building the Future
              <br />
              <span className="text-[#4285f4]">with Technology</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl lg:text-2xl text-[#1e1e1e] font-medium mb-10 leading-relaxed max-w-3xl mx-auto px-4"
              style={{ textShadow: '0 1px 5px rgba(255,255,255,0.8)' }}
            >
              Join a global network of developers and innovators, sharpen your skills, and work on real-world projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/join"
                  className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#4285f4] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#3367D6] hover:shadow-2xl hover:shadow-[#4285f4]/40"
                >
                  <motion.span
                    className="absolute inset-0 bg-linear-to-r from-[#4285f4] to-[#3367D6]"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10">Join Our Community</span>
                  <motion.svg
                    className="relative z-10 ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </motion.svg>
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href="/events"
                  className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-[#1e1e1e] bg-white border-2 border-[#1e1e1e]/20 rounded-full transition-all duration-300 hover:border-[#1e1e1e]/30 hover:bg-[#f8f8f8] shadow-lg"
                >
                  Explore Events
                </Link>
              </motion.div>
            </motion.div>

            {/* Social Proof - More visible */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-[#1e1e1e]/10"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-base">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm border border-gray-200/50"
                >
                  <div className="flex -space-x-2">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.2 }}
                      className="w-10 h-10 rounded-full bg-[#4285f4] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md"
                    >
                      G
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.3 }}
                      className="w-10 h-10 rounded-full bg-[#ea4335] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md"
                    >
                      D
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.4 }}
                      className="w-10 h-10 rounded-full bg-[#f9ab00] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md"
                    >
                      G
                    </motion.div>
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.5, delay: 1.5 }}
                      className="w-10 h-10 rounded-full bg-[#34a853] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md"
                    >
                      +
                    </motion.div>
                  </div>
                  <span className="text-[#1e1e1e] font-medium">
                    <strong className="text-[#1e1e1e] font-bold">500+</strong> active members
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm border border-gray-200/50"
                >
                  <motion.svg
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 1.6 }}
                    className="w-6 h-6 text-[#f9ab00]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                  <span className="text-[#1e1e1e] font-medium">
                    <strong className="text-[#1e1e1e] font-bold">50+</strong> successful events
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
