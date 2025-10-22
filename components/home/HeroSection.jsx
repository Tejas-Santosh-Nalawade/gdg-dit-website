'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';

export default function HeroSection() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="hero" className="relative min-h-[85vh] flex items-center pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">
      {/* Enhanced Background Gradient Animation */}
      <div className="absolute inset-0 z-0 opacity-50">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255, 255, 255)"
          gradientBackgroundEnd="rgb(245, 245, 250)"
          firstColor="66, 133, 244"
          secondColor="234, 67, 53"
          thirdColor="251, 188, 5"
          fourthColor="52, 168, 83"
          fifthColor="66, 133, 244"
          pointerColor="66, 133, 244"
          size="70%"
          blendingValue="soft-light"
          interactive={true}
          containerClassName="absolute inset-0"
        />
      </div>

      {/* White overlay for better text visibility */}
      <div className="absolute inset-0 z-[1] bg-white/20 backdrop-blur-[0.5px]"></div>

      {/* Google Developer Groups Logo with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-[15%] right-[10%] z-10 hidden lg:block"
      >
        <div className="relative w-48 h-48">
          <Image
            src="/globe.gif"
            alt="Google Developers"
            fill
            className="object-contain opacity-80 drop-shadow-lg"
            priority
            unoptimized
          />
        </div>
      </motion.div>

      {/* Student Developer Icon with Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="absolute bottom-[15%] left-[8%] z-10 hidden lg:block"
      >
        <div className="flex flex-col items-center gap-3 p-6 bg-white/80 backdrop-blur-md rounded-3xl shadow-lg border border-gray-200/50">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#4285f4] animate-pulse" />
            <span className="w-3 h-3 rounded-full bg-[#ea4335] animate-pulse" style={{ animationDelay: '0.2s' }} />
            <span className="w-3 h-3 rounded-full bg-[#f9ab00] animate-pulse" style={{ animationDelay: '0.4s' }} />
            <span className="w-3 h-3 rounded-full bg-[#34a853] animate-pulse" style={{ animationDelay: '0.6s' }} />
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-gray-800">500+</p>
            <p className="text-sm text-gray-600 font-medium">Developers</p>
          </div>
        </div>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="flex flex-col items-center text-center">
          {/* Content - Centered */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl"
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

            {/* Main Heading - Larger and bolder */}
            <motion.h1
              variants={fadeInUp}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-[#1e1e1e] mb-6 leading-[1.05] tracking-[-0.03em]"
              style={{ textShadow: '0 2px 10px rgba(255,255,255,0.5)' }}
            >
              Building the Future
              <br />
              <span className="text-[#4285f4]">with Technology</span>
            </motion.h1>

            {/* Description - Clearer and more visible */}
            <motion.p
              variants={fadeInUp}
              className="text-xl md:text-2xl text-[#1e1e1e] font-medium mb-10 leading-relaxed max-w-3xl mx-auto"
              style={{ textShadow: '0 1px 5px rgba(255,255,255,0.8)' }}
            >
              Join a global network of developers and innovators, sharpen your skills, and work on real-world projects.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="/join"
                className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-white bg-[#4285f4] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#3367D6] hover:shadow-2xl hover:shadow-[#4285f4]/40 hover:-translate-y-1 hover:scale-105"
              >
                <span className="relative z-10">Join Our Community</span>
                <svg
                  className="relative z-10 ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>

              <Link
                href="/events"
                className="inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-[#1e1e1e] bg-white border-2 border-[#1e1e1e]/20 rounded-full transition-all duration-300 hover:border-[#1e1e1e]/30 hover:bg-[#f8f8f8] hover:-translate-y-1 hover:scale-105 shadow-lg"
              >
                Explore Events
              </Link>
            </motion.div>

            {/* Social Proof - More visible */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-[#1e1e1e]/10"
            >
              <div className="flex flex-wrap items-center justify-center gap-8 text-base">
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm border border-gray-200/50">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-[#4285f4] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
                      G
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#ea4335] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
                      D
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#f9ab00] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
                      G
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#34a853] border-2 border-white flex items-center justify-center text-white text-sm font-bold shadow-md">
                      +
                    </div>
                  </div>
                  <span className="text-[#1e1e1e] font-medium">
                    <strong className="text-[#1e1e1e] font-bold">500+</strong> active members
                  </span>
                </div>
                <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-5 py-3 rounded-full shadow-sm border border-gray-200/50">
                  <svg className="w-6 h-6 text-[#f9ab00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[#1e1e1e] font-medium">
                    <strong className="text-[#1e1e1e] font-bold">50+</strong> successful events
                  </span>
                </div>
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
