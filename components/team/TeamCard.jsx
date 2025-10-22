'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TeamCard({ member }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="group"
    >
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border-4 border-white" style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.1)' }}>
        {/* Top corner decoration - Google colors gradient */}
        <div className="absolute top-0 left-0 right-0 h-2" style={{
          background: 'linear-gradient(to right, #4285f4 0%, #ea4335 33%, #f9ab00 66%, #34a853 100%)'
        }}/>
        
        {/* Image container with browser-like frame */}
        <div className="relative bg-gray-100">
          {/* Browser bar */}
          <div className="absolute top-0 left-0 right-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center gap-2 z-10">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"/>
              <div className="w-2.5 h-2.5 rounded-full bg-green-400"/>
            </div>
            <div className="flex-1 text-xs text-gray-400 text-center font-mono">
              @{member.social?.instagram || 'instagram'}
            </div>
          </div>

          {/* Photo */}
          <div className="aspect-square relative pt-10">
            {member.photo && typeof member.photo === 'string' && member.photo.startsWith('/') ? (
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #c3ecf6 0%, #ccf6c5 100%)'
              }}>
                <div className="text-6xl">{member.photo || '👤'}</div>
              </div>
            )}
          </div>
        </div>
        
        {/* Info section with badge */}
        <div className="p-6 relative">
          {/* Badge */}
          <div className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
            style={{
              backgroundColor: '#f9ab00',
              color: '#1e1e1e'
            }}
          >
            {member.role || member.team || 'Alumni 2025'}
          </div>

          {/* Name */}
          <h3 className="text-2xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {member.name}
          </h3>

          {/* Institution/Bio */}
          <div className="flex items-start gap-2 mb-4">
            <svg className="w-5 h-5 text-[#5f6368] mt-0.5 flex-shrink-0" viewBox="0 0 48 48" fill="none">
              <path d="M12 16L24 8L36 16L24 24L12 16Z" fill="#4285f4"/>
              <path d="M12 16L24 24V40L12 32V16Z" fill="#34a853"/>
              <path d="M36 16L24 24V40L36 32V16Z" fill="#ea4335"/>
            </svg>
            <p className="text-sm text-[#5f6368] leading-relaxed">
              {member.institution || member.bio || 'Google Developer Student Clubs\nArmy Institute of Technology, Pune'}
            </p>
          </div>

          {/* Social links - hidden by default, shown on hover */}
          <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {member.social?.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] hover:text-[#4285f4] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            )}
            {member.social?.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] hover:text-[#1DA1F2] transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            )}
            {member.social?.github && (
              <a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] hover:text-[#1e1e1e] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
