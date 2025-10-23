<<<<<<< HEAD
"use client"
import React, { useState, useEffect } from "react";
import Card from './Card'


// Helper function to generate initials from a full name.
const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/).filter(Boolean); // Filter empty strings
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    // Takes the first letter of the first and last non-empty word
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

/**
 * Social Icons (using inline SVG for self-contained component)
 */
const Github = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.803 8.207 11.385.6.115.82-.248.82-.553 0-.271-.01-1.111-.01-2.023-3.337.724-4.042-1.61-4.042-1.61-.542-1.365-1.323-1.731-1.323-1.731-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.778.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.004.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.772.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.894-.015 3.287 0 .308.216.678.823.553 4.771-1.581 8.203-6.082 8.203-11.385.001-6.627-5.372-12-12-12z" /></svg>
);

const Linkedin = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.13-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.76 7 2.457v6.778z" /></svg>
);


/**
 * Component to display individual team member details with a GDG-style card design.
 * @param {object} props
 * @param {object} props.member - Team member data object.
 */
const TeamCard = ({ member, isCore = false }) => {
    
    const colorClasses = member.colorClass ? member.colorClass.split(' ') : [];
    
    // Extract base classes for dynamic styling
    const textColor = colorClasses.find(c => c.startsWith('text-')) || 'text-gray-600';
    const baseBorderClass = colorClasses.find(c => c.startsWith('border-')) || 'border-gray-500';
    
    // Create the solid background class for the strip by converting 'border-' to 'bg-'
    const solidHeaderColorClass = baseBorderClass.replace('border-', 'bg-'); 

    // Image URL Construction (Updated to use the required path)
    const imageBaseUrl = "images/team/";
    const imageUrl = `${imageBaseUrl}${member.photo}`;
    const initials = getInitials(member.name);
    
    // State for image loading/error fallback
    const [imageError, setImageError] = useState(false);
    
    useEffect(() => {
        // Reset state when member changes
        setImageError(false);
    }, [member.photo]);

    // Array of colors for the four dots (GDG/Google Brand Colors)
    const dotColors = ['bg-blue-600', 'bg-red-600', 'bg-yellow-500', 'bg-green-600'];

    return (
        <Card className={`overflow-hidden flex flex-col justify-between`}>
            
            {/* Solid Color Header Strip */}
            <div className={`h-2.5 w-full ${solidHeaderColorClass}`}></div>

            {/* 1. Image Area - Aspect ratio [4/3] provides a good rectangular space for the image */}
            <div className="w-full h-52 relative">
                <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-100">
                    
                    {/* Image with object-cover and error handling */}
                    {!imageError ? (
                        <img 
                            src={imageUrl} 
                            alt={member.name} 
                            // object-cover ensures the picture fits the frame size
                            className="w-full h-full object-cover object-top" 
                            onError={() => {
                                // On error, switch to showing initials in the placeholder div
                                setImageError(true);
                            }}
                            loading="lazy"
                        />
                    ) : (
                        /* Fallback: If image fails to load, show initials */
                        <div className={`absolute inset-0 flex items-center justify-center text-4xl font-extrabold text-gray-500 bg-gray-200`}>
                            {initials}
                        </div>
                    )}
                </div>
            </div>

            {/* 2. Text Content Area - Centered and padded */}
            <div className="flex flex-col items-center p-4 pt-6 text-center flex-grow">
                
                {/* Name */}
                <h3 className="text-xl font-extrabold text-gray-800 leading-tight mb-1">
                    {member.name}
                </h3>
                
                {/* Role Text */}
                <p className={`text-sm font-semibold ${textColor} tracking-wide mb-2`}>
                    {member.role}
                </p>

                {/* Core Member Bio (New Addition) */}
                {isCore && member.bio && (
                    <p className="text-gray-500 text-xs italic mb-4 px-2 max-w-xs">
                        {member.bio}
                    </p>
                )}

                {/* Color Dots for Branding */}
                <div className="flex justify-center space-x-1 mb-4">
                    {dotColors.map((dotClass, i) => (
                        <span key={i} className={`w-2 h-2 rounded-full ${dotClass}`}></span>
                    ))}
                </div>

                {/* Social Links - ONLY FOR CORE MEMBERS */}
                {isCore && (member.social?.linkedin || member.social?.github) && (
                    <div className="flex space-x-4 mt-2 mb-2">
                        {/* LinkedIn */}
                        {member.social.linkedin && (
                            <a
                                href={member.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-blue-600 transition duration-150 p-1"
                                title={`LinkedIn of ${member.name}`}
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        )}
                        
                        {/* GitHub */}
                        {member.social.github && (
                            <a
                                href={member.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-gray-800 transition duration-150 p-1"
                                title={`GitHub of ${member.name}`}
                            >
                                <Github className="w-5 h-5" />
                            </a>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
};


export default TeamCard;
=======
'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

export default function TeamCard({ member }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -12, scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group"
    >
      <div className="relative bg-white dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500">
        {/* Top corner decoration - Google colors gradient */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-2 z-20" 
          style={{
            background: 'linear-gradient(to right, #4285f4 0%, #ea4335 33%, #f9ab00 66%, #34a853 100%)'
          }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
        {/* Image container with browser-like frame */}
        <div className="relative bg-gray-100 dark:bg-gray-700">
          {/* Browser bar */}
          <motion.div 
            className="absolute top-0 left-0 right-0 bg-white dark:bg-gray-600 border-b border-gray-200 dark:border-gray-500 px-4 py-2 flex items-center gap-2 z-10"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex gap-1.5">
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-red-400"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-yellow-400"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-green-400"
                whileHover={{ scale: 1.3 }}
                transition={{ duration: 0.2 }}
              />
            </div>
            <div className="flex-1 text-xs text-gray-400 dark:text-gray-500 text-center font-mono">
              @{member.social?.instagram || 'gdg.dit'}
            </div>
          </motion.div>

          {/* Photo */}
          <div className="aspect-square relative pt-10 bg-gray-50 dark:bg-gray-700 overflow-hidden">
            {member.photo && typeof member.photo === 'string' && member.photo.startsWith('/') ? (
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 20%' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </motion.div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-600">
                <motion.div 
                  className="text-6xl"
                  animate={{ 
                    rotate: isHovered ? 360 : 0,
                    scale: isHovered ? 1.2 : 1
                  }}
                  transition={{ duration: 0.6 }}
                >
                  {member.photo || '👤'}
                </motion.div>
              </div>
            )}
          </div>
        </div>
        
        {/* Info section with badge */}
        <div className="p-6 relative bg-white dark:bg-gray-800">
          {/* Badge */}
          <motion.div 
            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4 bg-[#f9ab00] text-[#1e1e1e]"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            {member.role || member.team || 'Member'}
          </motion.div>

          {/* Name */}
          <h3 
            className="text-2xl font-bold mb-2 text-[#1e1e1e] dark:text-white" 
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            {member.name}
          </h3>

          {/* Institution/Bio */}
          <div className="flex items-start gap-2 mb-4">
            <svg 
              className="w-5 h-5 text-[#5f6368] dark:text-gray-400 mt-0.5 flex-shrink-0" 
              viewBox="0 0 48 48" 
              fill="none"
            >
              <path d="M12 16L24 8L36 16L24 24L12 16Z" fill="#4285f4"/>
              <path d="M12 16L24 24V40L12 32V16Z" fill="#34a853"/>
              <path d="M36 16L24 24V40L36 32V16Z" fill="#ea4335"/>
            </svg>
            <p className="text-sm text-[#5f6368] dark:text-gray-400 leading-relaxed">
              {member.institution || member.bio || 'Google Developer Groups\nDIT, Pune'}
            </p>
          </div>

          {/* Social links - shown on hover */}
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10
            }}
            transition={{ duration: 0.3 }}
          >
            {member.social?.linkedin && (
              <motion.a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] dark:text-gray-400 hover:text-[#4285f4] transition-colors"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </motion.a>
            )}
            {member.social?.twitter && (
              <motion.a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] dark:text-gray-400 hover:text-[#1DA1F2] transition-colors"
                aria-label="Twitter"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </motion.a>
            )}
            {member.social?.github && (
              <motion.a
                href={member.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5f6368] dark:text-gray-400 hover:text-[#1e1e1e] dark:hover:text-white transition-colors"
                aria-label="GitHub"
                whileHover={{ scale: 1.2, y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                </svg>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
>>>>>>> ca65d316b4859e25824c37f37821f1489324d0a5
