'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BackgroundGradientAnimation } from '@/components/ui/background-gradient-animation';
import dynamic from 'next/dynamic';

// Dynamically import Globe3D to avoid SSR issues
const Globe3D = dynamic(() => import('./Globe3D'), { ssr: false });

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
    <section className="relative min-h-[85vh] flex items-center pt-8 pb-16 md:pt-12 md:pb-20 overflow-hidden">
      {/* Background Gradient Animation */}
      <div className="absolute inset-0 z-0">
        <BackgroundGradientAnimation
          gradientBackgroundStart="rgb(255, 255, 255)"
          gradientBackgroundEnd="rgb(245, 245, 245)"
          firstColor="66, 133, 244"
          secondColor="234, 67, 53"
          thirdColor="251, 188, 5"
          fourthColor="52, 168, 83"
          fifthColor="66, 133, 244"
          pointerColor="66, 133, 244"
          size="80%"
          blendingValue="soft-light"
          interactive={true}
          containerClassName="absolute inset-0"
        />
      </div>

      {/* Decorative Images - gt.webp and lt.webp */}
      <div className="absolute top-20 right-10 z-10 opacity-10 hidden lg:block">
        <Image
          src="/gt.webp"
          alt="Decorative"
          width={150}
          height={150}
          className="animate-pulse"
        />
      </div>
      <div className="absolute top-32 left-10 z-10 opacity-10 hidden lg:block">
        <Image
          src="/lt.webp"
          alt="Decorative"
          width={150}
          height={150}
          className="animate-pulse"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#f0f0f0] border border-[#1e1e1e]/8 mb-6"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#4285f4]" />
                <span className="w-2 h-2 rounded-full bg-[#ea4335]" />
                <span className="w-2 h-2 rounded-full bg-[#f9ab00]" />
                <span className="w-2 h-2 rounded-full bg-[#34a853]" />
              </div>
              <span className="text-[#1e1e1e]/70 text-base font-medium tracking-tight">
                Google Developer Groups - DIT
              </span>
            </motion.div>

            {/* Main Heading - Larger fonts */}
            <motion.h1
              variants={fadeInUp}
              className="text-4xl sm:text-3xl md:text-4xl lg:text-[6rem] xl:text-[6rem] font-bold text-[#1e1e1e] mb-5 leading-[1.05] tracking-[-0.03em]"
            >
              Building the Future
              <br />
              <span className="text-[#4285f4]">with Technology</span>
            </motion.h1>

            {/* Description - Slightly smaller font */}
            <motion.p
              variants={fadeInUp}
              className="text-lg md:text-xl text-[#1e1e1e]/60 mb-10 leading-relaxed"
            >
              Join a global network of developers and innovators, sharpen your skills, and work on real-world projects.
            </motion.p>

            {/* CTA Buttons - Slightly smaller */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row items-start gap-4"
            >
              <Link
                href="/join"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-[#4285f4] rounded-full overflow-hidden transition-all duration-300 hover:bg-[#3367D6] hover:shadow-xl hover:shadow-[#4285f4]/30 hover:-translate-y-1"
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
                className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-[#1e1e1e] bg-white border-2 border-[#1e1e1e]/10 rounded-full transition-all duration-300 hover:border-[#1e1e1e]/20 hover:bg-[#f0f0f0]/50 hover:-translate-y-1"
              >
                Explore Events
              </Link>
            </motion.div>

            {/* Social Proof - Slightly smaller */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-6 border-t border-[#1e1e1e]/8"
            >
              <div className="flex flex-wrap items-center gap-8 text-sm">
                <div className="flex items-center gap-2.5">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 rounded-full bg-[#4285f4] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#ea4335] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      B
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#f9ab00] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      C
                    </div>
                    <div className="w-9 h-9 rounded-full bg-[#34a853] border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      D
                    </div>
                  </div>
                  <span className="text-[#1e1e1e]/60">
                    <strong className="text-[#1e1e1e] font-semibold">500+</strong> active members
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <svg className="w-5 h-5 text-[#f9ab00]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-[#1e1e1e]/60">
                    <strong className="text-[#1e1e1e] font-semibold">50+</strong> successful events
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right - 3D Globe with Background Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center"
          >
            <div className="relative w-full max-w-[500px] aspect-square">
              <Globe3D />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
