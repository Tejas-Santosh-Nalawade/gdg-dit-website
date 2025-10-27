'use client';
import React, { useState } from 'react';
import joinData from '@/data/join.json';

// --- Icon Component ---
// Centralized Icon component handling all needed SVG icons
const Icon = ({ name, color }) => {
  let Component;
  switch (name) {
    // Icons for the existing Communities section
    case 'Flutter':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <path fill="#02539A" d="M15.383 18.316l3.361-3.274H8.279L1.653 8.284 18.744.001l7.912 7.912z"/>
          <path fill="#04599C" d="M4.466 25.467l4.107-4.107 3.274 3.274-3.274 3.274z"/>
          <path fill="#03A9F4" d="M11.847 18.279l3.36 3.36-3.36 3.36-3.36-3.36z"/>
          <path fill="#0D47A1" d="M18.744 15.006l7.912 7.912-7.912 7.912-4.106-4.106 3.274-3.274-3.274-3.274z"/>
        </svg>
      );
      break;
    case 'Android':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <path fill="#3DDC84" d="M2.5 13.5v7c0 1.1.9 2 2 2h1v5.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V22.5h3v5.5c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5V22.5h1c1.1 0 2-.9 2-2v-7h-19z"/>
          <path fill="#3DDC84" d="M21 7.5c-.8-1.5-2.3-2.5-4-2.5h-.5V4c0-.6-.4-1-1-1s-1 .4-1 1v1H12V4c0-.6-.4-1-1-1s-1 .4-1 1v1h-.5c-1.7 0-3.2 1-4 2.5L21 7.5z"/>
          <circle fill="#3DDC84" cx="13" cy="9.5" r="1"/>
          <circle fill="#3DDC84" cx="19" cy="9.5" r="1"/>
          <path fill="#3DDC84" d="M25 13.5v7c0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5v-7c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5zm-21 0v7c0 1.4-1.1 2.5-2.5 2.5S-1 21.9-1 20.5v-7C-1 12.1.1 11 1.5 11S4 12.1 4 13.5z"/>
        </svg>
      );
      break;
    case 'Competitive Programming':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <path fill="#F9AB00" d="M16 2L3 28h26z" opacity="0.2"/>
          <path fill="#F9AB00" d="M8 10l4 4-4 4M16 18h8"/>
          <rect fill="none" stroke="#F9AB00" strokeWidth="2" x="2" y="2" width="28" height="28" rx="2"/>
          <polyline fill="none" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="12 8 8 12 12 16"/>
          <polyline fill="none" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points="20 8 24 12 20 16"/>
          <line fill="none" stroke="#F9AB00" strokeWidth="2.5" strokeLinecap="round" x1="16" y1="6" x2="14" y2="18"/>
        </svg>
      );
      break;
    case 'Cloud Computing':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <path fill="#EA4335" d="M22 14c0-3.3-2.7-6-6-6-2.2 0-4.1 1.2-5.2 3-.4-.1-.8-.2-1.2-.2-2.8 0-5 2.2-5 5s2.2 5 5 5h11.5c2.5 0 4.5-2 4.5-4.5 0-2.3-1.8-4.2-4-4.3z"/>
          <path fill="#4285F4" d="M16 8c-2.2 0-4.1 1.2-5.2 3-.4-.1-.8-.2-1.2-.2-2.8 0-5 2.2-5 5 0 .3 0 .5.1.8-1.2.9-2 2.4-2 4 0 2.8 2.2 5 5 5h13c3.3 0 6-2.7 6-6s-2.7-6-6-6c-.3 0-.5 0-.8.1-.2-3.1-2.8-5.7-5.9-5.7z"/>
          <path fill="none" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" d="M16 24v-8m-4 4l4 4 4-4"/>
        </svg>
      );
      break;
    case 'AI/ML':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <circle fill="#34A853" cx="16" cy="16" r="3"/>
          <circle fill="none" stroke="#34A853" strokeWidth="2" cx="16" cy="16" r="10"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="16" cy="5" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="16" cy="27" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="5" cy="16" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="27" cy="16" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="9" cy="9" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="23" cy="23" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="9" cy="23" r="1.5"/>
          <circle fill="none" stroke="#34A853" strokeWidth="1.5" cx="23" cy="9" r="1.5"/>
          <path fill="none" stroke="#34A853" strokeWidth="1.5" d="M16 6v4m0 12v4M6 16h4m12 0h4m-20-6l3 3m12 12l3 3m-18 0l3-3m12-12l3-3"/>
        </svg>
      );
      break;
    case 'UI/UX':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" className={`${color} h-8 w-8`}>
          <rect fill="#4285F4" x="2" y="2" width="28" height="28" rx="2" opacity="0.1"/>
          <rect fill="none" stroke="#4285F4" strokeWidth="2" x="2" y="2" width="28" height="28" rx="2"/>
          <path fill="none" stroke="#4285F4" strokeWidth="2" d="M2 10h28M10 2v28"/>
          <circle fill="#EA4335" cx="7" cy="6" r="1.5"/>
          <circle fill="#FBBC04" cx="11" cy="6" r="1.5"/>
          <circle fill="#34A853" cx="15" cy="6" r="1.5"/>
          <path fill="none" stroke="#4285F4" strokeWidth="1.5" strokeLinecap="round" d="M14 16h12M14 20h8M14 24h10"/>
        </svg>
      );
      break;
    // Icons for the Platform links section
    case 'Discord':
      Component = () => (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="currentColor" // Changed from 'none' to 'currentColor' for solid icon
          stroke="none"      // Removed stroke since the Discord logo is typically a solid shape
          className="text-white"
        >
          {/* Discord Icon Path (simplified version) */}
          <path d="M20.2 6.6c-.9-.4-1.8-.8-2.8-1.1s-2.1-.4-3.3-.4c-.1 0-.2 0-.3 0-.1 0-.3 0-.4 0-.1 0-.2 0-.3 0-.1 0-.3 0-.4 0-.1 0-.2 0-.3 0-.1 0-.3 0-.4 0-.1 0-.2 0-.3 0-.1 0-.2 0-.3 0-.1 0-.2 0-.3 0s-.2 0-.3 0c-1.2 0-2.4.1-3.3.4s-1.9.7-2.8 1.1c-1.2.6-2.1 1.4-2.8 2.3-.7.9-1.2 2-1.4 3.1-.2 1.2-.2 2.4 0 3.5.2 1.2.7 2.3 1.4 3.1.7.9 1.6 1.7 2.8 2.3.9.4 1.8.8 2.8 1.1s2.1.4 3.3.4c1.2 0 2.4-.1 3.3-.4s1.9-.7 2.8-1.1c1.2-.6 2.1-1.4 2.8-2.3.7-.9 1.2-2 1.4-3.1.2-1.2.2-2.4 0-3.5-.2-1.2-.7-2.3-1.4-3.1-.7-.9-1.6-1.7-2.8-2.3zM8.8 14.8c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5zm6.4 0c-.8 0-1.5-.7-1.5-1.5s.7-1.5 1.5-1.5c.8 0 1.5.7 1.5 1.5s-.7 1.5-1.5 1.5z"/>
        </svg>
      );
      break;
    case 'WhatsApp':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
        </svg>
      );
      break;
    case 'LinkedIn':
      Component = () => (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="32" 
          height="32" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          stroke="none"      
          className="text-white"
        >
          {/* LinkedIn Icon Path (Standard 'L' shape) */}
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2a2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM4 21h4V9H4v12zM6 7a3 3 0 1 0 0-6a3 3 0 0 0 0 6z"/>
        </svg>
      );
      break;
    case 'Meetup':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
          <line x1="16" x2="16" y1="2" y2="6"/>
          <line x1="8" x2="8" y1="2" y2="6"/>
          <line x1="3" x2="21" y1="10" y2="10"/>
        </svg>
      );
      break;
    // Icons for the Benefits section
    case 'BookOpen':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      );
      break;
    case 'Heart':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3.51.57-4.5 2-1-.9-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.51 4.05 3 5.5l7 7Z"/>
        </svg>
      );
      break;
    case 'Award':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M11 16h2"/>
            <path d="M8 12h8"/>
            <path d="M11 8h2"/>
            <circle cx="12" cy="12" r="10"/>
        </svg>
      );
      break;
    case 'Briefcase':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
            <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        </svg>
      );
      break;
    case 'Rocket':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M4.5 16.5c-1.5 1.5-3 3-3 6.5s2-1 6.5-3c1.5 1.5 3 3 6.5 3s1-2 3-6.5c-1.5-1.5-3-3-6.5-3s-2 1-3 6.5Z"/>
            <path d="M15 13l4-4M9 15l4-4M17 7l-4 4"/>
        </svg>
      );
      break;
    case 'Gift':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M12 11h.01"/>
            <path d="M12 15h.01"/>
            <rect width="20" height="16" x="2" y="4" rx="2"/>
            <path d="M8 12h8"/>
        </svg>
      );
      break;
    case 'Sun': // Light mode icon
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-5 w-5`}>
            <circle cx="12" cy="12" r="4"/>
            <path d="M12 2v2"/>
            <path d="M12 20v2"/>
            <path d="m4.93 4.93 1.44 1.44"/>
            <path d="m17.67 17.67 1.44 1.44"/>
            <path d="M2 12h2"/>
            <path d="M20 12h2"/>
            <path d="m6.34 17.66-1.44 1.44"/>
            <path d="m19.07 4.93-1.44 1.44"/>
        </svg>
      );
      break;
    case 'Moon': // Dark mode icon
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-5 w-5`}>
            <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
      );
      break;
    default:
      Component = () => <div className={`${color} text-xl`}>G</div>; // Generic placeholder
  }
  return <Component />;
};

// Extract data from imported JSON
const { benefits, communities, platforms, steps } = joinData;


// --- Components for New Sections ---

// Component for the "What Happens After You Join?" steps
const StepItem = ({ step, title, description }) => (
    <div className="flex items-start py-4 border-neutral-200">
        {/* Step Number Circle */}
        <div className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 bg-[#4285f4] text-white">
            {step}
        </div>
        
        {/* Step Content */}
        <div>
            <h3 className="font-semibold mb-1 text-[#1e1e1e]">{title}</h3>
            <p className="text-sm text-[#1e1e1e]/70">{description}</p>
        </div>
    </div>
);

// Component for the "Why Join" section
const BenefitCard = ({ benefit }) => {
  const colors = ['#4285f4', '#ea4335', '#f9ab00', '#34a853'];
  const bgColors = ['bg-blue-50', 'bg-red-50', 'bg-yellow-50', 'bg-green-50'];
  const colorIndex = benefit.id % 4;
  
  return (
    <div className={`p-8 rounded-2xl transition-all duration-500 h-full flex flex-col bg-white dark:bg-gray-800 border-2 hover:shadow-2xl hover:-translate-y-2`} 
      style={{ borderColor: colors[colorIndex] }}>
        {/* Icon wrapper */}
        <div className={`p-4 rounded-xl inline-flex mb-6 ${bgColors[colorIndex]}`}>
            <Icon name={benefit.iconName} color={benefit.color} />
        </div>
        
        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            {benefit.title}
        </h3>
        
        {/* Description */}
        <p className="text-base grow text-[#5f6368] dark:text-gray-300 leading-relaxed">
            {benefit.description}
        </p>
    </div>
  );
};


// --- Updated Platform Card Component ---
const PlatformCard = ({ platform }) => {
  const googleColors = {
    'Discord': { bg: 'bg-[#5865F2]', hover: 'hover:bg-[#4752C4]' },
    'WhatsApp': { bg: 'bg-[#25D366]', hover: 'hover:bg-[#128C7E]' },
    'LinkedIn': { bg: 'bg-[#0A66C2]', hover: 'hover:bg-[#004182]' },
    'Meetup': { bg: 'bg-[#ED1C40]', hover: 'hover:bg-[#C4162F]' }
  };

  const colorConfig = googleColors[platform.name] || { bg: 'bg-[#4285f4]', hover: 'hover:bg-[#3367D6]' };

  return (
    <a
      href={platform.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-3xl shadow-lg overflow-hidden transition-all duration-500 transform bg-white dark:bg-gray-800 hover:shadow-2xl hover:-translate-y-3 group"
    >
      {/* Header with icon */}
      <div className={`relative h-40 flex items-center justify-center ${colorConfig.bg} transition-all duration-500`}>
        <div className="relative z-10 p-6 rounded-2xl bg-white/20 backdrop-blur-md group-hover:scale-110 transition-transform duration-500">
          <Icon name={platform.iconName} color="text-white" />
        </div>
        
        {/* Decorative circles */}
        <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl" />
        <div className="absolute bottom-4 left-4 w-16 h-16 bg-white/10 rounded-full blur-lg" />
      </div>
      
      {/* Body Content */}
      <div className="p-6 text-[#1e1e1e] dark:text-white">
        <h3 className="text-2xl font-bold mb-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>{platform.name}</h3>
        <p className="text-sm mb-6 text-[#5f6368] dark:text-gray-400 leading-relaxed">{platform.description}</p>
        
        {/* Button */}
        <div className={`w-full text-center py-4 rounded-xl font-bold transition-all duration-300 ${colorConfig.bg} ${colorConfig.hover} text-white shadow-md group-hover:shadow-xl`} style={{ fontFamily: 'Google Sans, sans-serif' }}>
          Join Now →
        </div>
      </div>
    </a>
  );
};


// --- Main Application Component ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Simple filtering based on search term
  const filteredCommunities = communities.filter(community =>
    community.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CommunityItem = ({ community }) => {
    // Map each domain to specific Google colors
    const getDomainColors = (title) => {
      const colorMap = {
        'Flutter': { bg: 'bg-blue-50', text: 'text-[#02539A]', border: 'border-[#02539A]' },
        'Android': { bg: 'bg-green-50', text: 'text-[#3DDC84]', border: 'border-[#3DDC84]' },
        'Competitive Programming': { bg: 'bg-yellow-50', text: 'text-[#F9AB00]', border: 'border-[#F9AB00]' },
        'Cloud Computing': { bg: 'bg-red-50', text: 'text-[#EA4335]', border: 'border-[#EA4335]' },
        'AI/ML': { bg: 'bg-green-50', text: 'text-[#34A853]', border: 'border-[#34A853]' },
        'UI/UX': { bg: 'bg-blue-50', text: 'text-[#4285F4]', border: 'border-[#4285F4]' }
      };
      return colorMap[title] || { bg: 'bg-blue-50', text: 'text-[#4285f4]', border: 'border-[#4285f4]' };
    };

    const colors = getDomainColors(community.title);
    
    return (
      <a href={community.link} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-300 cursor-pointer hover:shadow-lg border-2 ${colors.border} bg-white dark:bg-gray-800 hover:scale-[1.02]`}>
        <div className={`p-3 rounded-xl ${colors.bg} shrink-0`}>
          <Icon name={community.iconName} color={colors.text} />
        </div>
        <div className="grow">
          <h3 className="font-bold text-[#1e1e1e] dark:text-white mb-1" style={{ fontFamily: 'Google Sans, sans-serif' }}>{community.title}</h3>
          <p className="text-sm text-[#5f6368] dark:text-gray-400">{community.description}</p>
        </div>
        <span className="text-xs px-3 py-1.5 rounded-full font-semibold bg-green-100 text-green-700 shrink-0">Active</span>
      </a>
    );
  };
  
  // Base classes for the application container
  const appBaseClasses = "min-h-screen p-0 sm:p-0 font-sans bg-[#f0f0f0] text-[#1e1e1e]";

  // Classes for the main two-column content block
  const mainContentClasses = "max-w-7xl mx-auto rounded-xl overflow-hidden md:grid md:grid-cols-3 mt-4 sm:mt-8 shadow-xl";
  
  // Classes for the left sidebar
  const sidebarClasses = "md:col-span-1 flex flex-col h-full min-h-screen md:min-h-0 bg-white border-r border-[#1e1e1e]/10";
  
  // Classes for the right hero section
  const heroClasses = "md:col-span-2 p-8 md:p-12 flex items-center justify-center min-h-[50vh] md:min-h-full bg-white";
  
  // Classes for the Hero text and button
  const heroTitleClass = "text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight text-[#1e1e1e]";
  const heroPClass = "text-lg mb-8 text-[#1e1e1e]/70";

  return (
    <div className={appBaseClasses}>
      
      {/* 4 Color Stripe at Top */}
      <div className="fixed top-0 left-0 right-0 h-1 flex z-50">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[#fafafa] dark:bg-gray-800">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 py-2 px-4 rounded-full text-sm font-semibold mb-8 bg-[#4285f4] text-white shadow-lg" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              <span role="img" aria-label="members">✨</span> 
              <span>500+ active members</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Join <span className="text-[#4285f4]">GDG-DIT</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-[#5f6368] dark:text-gray-300 mb-12 leading-relaxed">
              Become part of a vibrant community of developers, learners, and innovators. 
              Connect, learn, and grow together!
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="#community-links"
                className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-[#4285f4] text-white hover:bg-[#3367D6] shadow-lg hover:shadow-xl hover:scale-105"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Get Started
              </a>
              <a
                href="#why-join"
                className="px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 bg-white text-[#1e1e1e] hover:bg-gray-50 shadow-lg hover:shadow-xl border-2 border-gray-200"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* SECTION 1: Why Join GDG-DIT */}
      <section id="why-join" className="py-20 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      Why Join GDG-DIT?
                  </h2>
                  <p className="text-xl text-[#5f6368] dark:text-gray-300">
                      Unlock amazing opportunities and grow your tech career
                  </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {benefits.map((benefit) => (
                      <BenefitCard key={benefit.id} benefit={benefit} />
                  ))}
              </div>
          </div>
      </section>
      {/* END SECTION 1 */}


      {/* SECTION 2: Main Content Block */}
      <div className={mainContentClasses}>
        
        {/* Left Column: Communities List Sidebar */}
        <aside className={sidebarClasses}>
          <div className="p-6 flex items-center justify-between border-b-2 border-[#4285f4]">
            <h2 className="text-2xl font-bold text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>Tech Domains</h2>
            <div className="flex items-center space-x-2 text-[#5f6368]">
              <span className="px-3 py-1 bg-blue-50 text-[#4285f4] rounded-full text-sm font-semibold">{communities.length}</span>
            </div>
          </div>
          
          <div className="p-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search domains..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285f4] bg-[#fafafa] dark:bg-gray-700 text-[#1e1e1e] dark:text-white placeholder-[#5f6368] border-2 border-gray-200 dark:border-gray-600"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              />
              <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#5f6368]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>

          {/* List of Communities */}
          <div className="grow overflow-y-auto px-4 pb-6 space-y-3">
            {filteredCommunities.map((community) => (
              <CommunityItem key={community.id} community={community} />
            ))}
            {filteredCommunities.length === 0 && (
                <p className="text-center pt-8 text-[#5f6368] dark:text-gray-400">No domains found.</p>
            )}
          </div>
        </aside>

        {/* Right Column: Hero/Promotion Area */}
        <main className={heroClasses}>
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Join our <span className="text-[#25D366]">WhatsApp</span> communities now!
            </h1>
            <p className="text-lg mb-8 text-[#5f6368] dark:text-gray-300 leading-relaxed">
              Connect with fellow developers, share knowledge, and stay updated on the latest in tech. Our GDG communities are the perfect place to grow your skills and network with like-minded individuals.
            </p>
            
            <a
              href="#community-links"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              style={{ fontFamily: 'Google Sans, sans-serif' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Explore All Communities
            </a>
          </div>
        </main>
      </div>
      {/* END SECTION 2 */}
      
      {/* SECTION 3: Choose Your Platform */}
      <section className="py-24 bg-[#fafafa] dark:bg-gray-800" id="community-links">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
              Choose Your Platform
            </h2>
            <p className="text-xl text-[#5f6368] dark:text-gray-300 max-w-2xl mx-auto">
              Connect with us on your preferred platform and join thousands of developers
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {platforms.map((platform) => (
              <PlatformCard key={platform.id} platform={platform} />
            ))}
          </div>
        </div>
      </section>
      {/* END SECTION 3 */}

      {/* SECTION 4: What Happens After You Join? */}
      <section className="py-24 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      What Happens After You Join?
                  </h2>
                  <p className="text-xl text-[#5f6368] dark:text-gray-300">
                      Your journey with GDG-DIT in simple steps
                  </p>
              </div>
              
              <div className="max-w-4xl mx-auto space-y-8">
                  {steps.map((step, index) => {
                    const googleColors = ['#4285f4', '#ea4335', '#f9ab00', '#34a853'];
                    const stepColor = googleColors[index % 4];
                    
                    return (
                      <div 
                        key={step.id} 
                        className="flex gap-6 p-8 rounded-2xl bg-white dark:bg-gray-800 border-2 hover:shadow-xl transition-all duration-300"
                        style={{ borderColor: stepColor }}
                      >
                        {/* Step Number Circle */}
                        <div 
                          className="shrink-0 w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg"
                          style={{ backgroundColor: stepColor, fontFamily: 'Google Sans, sans-serif' }}
                        >
                          {step.number}
                        </div>
                        
                        {/* Step Content */}
                        <div className="flex-1">
                          <h3 className="text-2xl font-bold mb-3 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                            {step.title}
                          </h3>
                          <p className="text-lg text-[#5f6368] dark:text-gray-400 leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
              </div>
          </div>
      </section>
      {/* END SECTION 4 */}
      
      {/* SECTION 5: Ready to Get Started? CTA */}
      <section className="py-24 bg-[#fafafa] dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* New CTA Card Design */}
              <div className="max-w-4xl mx-auto p-12 md:p-16 rounded-3xl text-center shadow-xl transition-all duration-500 bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-700 hover:shadow-2xl hover:scale-[1.02]">
                  {/* Google Colors Decoration */}
                  <div className="flex justify-center gap-3 mb-8">
                    <div className="w-3 h-3 rounded-full bg-[#4285f4]" />
                    <div className="w-3 h-3 rounded-full bg-[#ea4335]" />
                    <div className="w-3 h-3 rounded-full bg-[#f9ab00]" />
                    <div className="w-3 h-3 rounded-full bg-[#34a853]" />
                  </div>
                  
                  <h2 className="text-4xl md:text-5xl font-bold mb-6 text-[#1e1e1e] dark:text-white" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                      Ready to Get Started?
                  </h2>
                  <p className="text-xl mb-10 text-[#5f6368] dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                      Pick a platform above and join thousands of developers in our community today! Start learning, building, and growing with us.
                  </p>
                  
                  <div className="flex flex-wrap gap-4 justify-center">
                    <a
                        href="#community-links"
                        className="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg bg-[#4285f4] text-white hover:bg-[#3367D6] hover:shadow-xl hover:scale-105"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                        Join a Platform
                    </a>
                    <a
                        href="/events"
                        className="inline-block px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 shadow-lg bg-white text-[#1e1e1e] hover:bg-gray-50 border-2 border-gray-200 hover:shadow-xl hover:scale-105"
                        style={{ fontFamily: 'Google Sans, sans-serif' }}
                    >
                        View Events
                    </a>
                  </div>
              </div>
          </div>
      </section>
      {/* END SECTION 5 */}
      
    </div>
  );
}
