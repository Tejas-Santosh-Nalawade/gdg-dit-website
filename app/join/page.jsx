'use client'
import React, { useState, useEffect } from 'react';
// Assuming Tailwind CSS is configured for the environment

// --- Icon Component ---
// Centralized Icon component handling all needed SVG icons
const Icon = ({ name, color }) => {
  let Component;
  switch (name) {
    // Icons for the existing Communities section
    case 'Flutter':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="m15 13-3 3-3-3m3-10v16"/>
        </svg>
      );
      break;
    case 'Android':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <circle cx="12" cy="5" r="3"/>
            <path d="M18.8 13.8c.8-.8 1.2-1.8 1.2-2.8V6.3c0-1.8-1.5-3.3-3.3-3.3h-1.4c-1.8 0-3.3 1.5-3.3 3.3v4.7c0 1-.4 2-1.2 2.8L12 17l-1.5-1.5c-.8-.8-1.2-1.8-1.2-2.8V6.3c0-1.8-1.5-3.3-3.3-3.3H5.2c-1.8 0-3.3 1.5-3.3 3.3v4.7c0 1 .4 2 1.2 2.8L5 17l-1.5 1.5c-.8.8-1.2 1.8-1.2 2.8V23h19v-4.7c0-1-.4-2-1.2-2.8L19 17l-1.5-1.5Z"/>
        </svg>
      );
      break;
    case 'Competitive Programming':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
        </svg>
      );
      break;
    case 'Cloud Computing':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242M16 19h6"/>
            <path d="M16 22l3-3-3-3"/>
        </svg>
      );
      break;
    case 'AI/ML':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <path d="M12 10V4"/>
            <path d="M19 18a7.7 7.7 0 0 0 .04-2.5 7 7 0 0 0-4-6.32c-.5-.73-1-1.35-1.7-1.72s-1.44-.45-2.2-.45c-.75 0-1.48.15-2.2.45s-1.2.98-1.7 1.72a7 7 0 0 0-4 6.32 7.7 7.7 0 0 0 .04 2.5"/>
            <path d="M16 21.5c-2-.5-2.5-1.5-2.5-2.5"/>
            <path d="M8 21.5c2-.5 2.5-1.5 2.5-2.5"/>
            <path d="M19 18H5"/>
        </svg>
      );
      break;
    case 'UI/UX':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${color} h-6 w-6`}>
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <line x1="3" y1="9" x2="21" y2="9"/>
            <line x1="9" y1="3" x2="9" y2="21"/>
        </svg>
      );
      break;
    // Icons for the Platform links section
    case 'Discord':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          <path d="M8 12h.01"/>
          <path d="M12 12h.01"/>
          <path d="M16 12h.01"/>
        </svg>
      );
      break;
    case 'WhatsApp':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.08 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      );
      break;
    case 'LinkedIn':
      Component = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
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

// --- Data Structures ---

// Data for the new "What Happens After You Join?" section
const stepsData = [
  {
    step: 1,
    title: 'Welcome Message',
    description: 'Receive a warm welcome from our team and get introduced to the community.',
  },
  {
    step: 2,
    title: 'Event Notifications',
    description: 'Stay updated about upcoming workshops, study jams, and tech talks.',
  },
  {
    step: 3,
    title: 'Start Learning',
    description: 'Access resources, join discussions, and start your learning journey with us.',
  },
];

// Data for the "Why Join" section
const benefitsData = [
    {
      title: 'Learn New Technologies',
      description: 'Access workshops, study jams, and tech talks on cutting-edge technologies.',
      iconName: 'BookOpen',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Network with Developers',
      description: 'Connect with like-minded students, professionals, and industry experts.',
      iconName: 'Heart',
      color: 'text-amber-600', // Using amber for yellow/gold theme
      bgColor: 'bg-amber-50'
    },
    {
      title: 'Earn Certifications',
      description: 'Complete study jams and earn Google Cloud badges and certifications.',
      iconName: 'Award',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Career Opportunities',
      description: 'Get access to job opportunities, internships, and mentorship programs.',
      iconName: 'Briefcase',
      color: 'text-red-600',
      bgColor: 'bg-red-50'
    },
    {
      title: 'Build Projects',
      description: 'Work on real-world projects and showcase your skills to the community.',
      iconName: 'Rocket',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Exclusive Swag & Perks',
      description: 'Get GDG merchandise, access to Google resources, and event perks.',
      iconName: 'Gift',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50'
    },
];

// Data for the existing Communities List
const communitiesData = [
  {
    title: 'Flutter',
    description: 'Connect with Flutter developers!',
    iconName: 'Flutter',
    color: 'text-sky-400',
    link: '#flutter'
  },
  {
    title: 'Android',
    description: 'Join our Android development community!',
    iconName: 'Android',
    color: 'text-green-500',
    link: '#android'
  },
  {
    title: 'Competitive Programming',
    description: 'Sharpen your coding skills with us!',
    iconName: 'Competitive Programming',
    color: 'text-red-500',
    link: '#cp'
  },
  {
    title: 'Cloud Computing',
    description: 'Join our cloud computing discussions!',
    iconName: 'Cloud Computing',
    color: 'text-blue-400',
    link: '#cloud'
  },
  {
    title: 'AI/ML',
    description: 'Explore AI and ML topics with us!',
    iconName: 'AI/ML',
    color: 'text-purple-400',
    link: '#aiml'
  },
  {
    title: 'UI/UX',
    description: 'Join our UI/UX design community!',
    iconName: 'UI/UX',
    color: 'text-pink-400',
    link: '#uiux'
  },
];

// Data for the existing Platform links section (UPDATED COLORS)
const communityPlatforms = [
  {
    name: 'Discord',
    description: 'Join our Discord server for real-time discussions and tech support.',
    iconName: 'Discord',
    link: 'https://discord.gg/gdg',
    gradient: 'from-indigo-600 to-indigo-800',
    buttonColor: 'bg-indigo-500 hover:bg-indigo-600',
    iconTextColor: 'text-indigo-200'
  },
  {
    name: 'WhatsApp',
    description: 'Get event updates and announcements on our WhatsApp community.',
    iconName: 'WhatsApp',
    link: 'https://chat.whatsapp.com/gdg',
    gradient: 'from-green-600 to-emerald-800',
    buttonColor: 'bg-green-500 hover:bg-green-600',
    iconTextColor: 'text-green-200'
  },
  {
    name: 'LinkedIn',
    description: 'Follow us on LinkedIn for professional networking and updates.',
    iconName: 'LinkedIn',
    link: 'https://linkedin.com/company/gdg',
    gradient: 'from-blue-600 to-sky-800',
    buttonColor: 'bg-blue-500 hover:bg-blue-600',
    iconTextColor: 'text-blue-200'
  },
  {
    name: 'Meetup',
    description: 'RSVP to our events and stay updated on upcoming meetups.',
    iconName: 'Meetup',
    link: 'https://meetup.com/gdg',
    gradient: 'from-red-600 to-red-800',
    buttonColor: 'bg-red-500 hover:bg-red-600',
    iconTextColor: 'text-red-200'
  },
];


// --- Components for New Sections ---

// Component for the "What Happens After You Join?" steps
const StepItem = ({ step, title, description }) => (
    <div className="flex items-start py-4 border-neutral-200">
        {/* Step Number Circle */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mr-4 bg-[#4285f4] text-white">
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
const BenefitCard = ({ benefit }) => (
    <div className="p-6 rounded-xl shadow-lg transition-all duration-300 h-full flex flex-col bg-white border border-[#1e1e1e]/5 hover:shadow-xl">
        {/* Icon wrapper */}
        <div className={`p-3 rounded-xl inline-flex mb-4 ${benefit.bgColor}`}>
            <Icon name={benefit.iconName} color={benefit.color} />
        </div>
        
        {/* Title */}
        <h3 className="text-lg font-bold mb-2 text-[#1e1e1e]">
            {benefit.title}
        </h3>
        
        {/* Description */}
        <p className="text-sm flex-grow text-[#1e1e1e]/70">
            {benefit.description}
        </p>
    </div>
);


// --- Updated Platform Card Component ---
const PlatformCard = ({ platform }) => (
  <a
    href={platform.link}
    target="_blank"
    rel="noopener noreferrer"
    className="block rounded-2xl shadow-xl overflow-hidden transition-all duration-300 transform bg-white hover:shadow-2xl hover:-translate-y-1 group border border-[#1e1e1e]/5"
  >
    {/* Header with gradient and icon */}
    <div className={`relative h-28 flex items-center justify-center bg-gradient-to-br ${platform.gradient}`}>
      <div className="absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 p-4 rounded-full bg-white/10 backdrop-blur-sm">
        <Icon name={platform.iconName} color={platform.iconTextColor} />
      </div>
    </div>
    
    {/* Body Content */}
    <div className="p-6 text-[#1e1e1e]">
      <h3 className="text-xl font-extrabold mb-2">{platform.name}</h3>
      <p className="text-sm mb-6 text-[#1e1e1e]/70">{platform.description}</p>
      
      {/* Dynamic Button */}
      <div
        className={`w-full text-center py-3 rounded-lg font-semibold transition-all duration-300 ${platform.buttonColor} text-white shadow-md group-hover:shadow-lg`}
      >
        Join on {platform.name}
      </div>
    </div>
  </a>
);


// --- Main Application Component ---

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');

  // Simple filtering based on search term
  const filteredCommunities = communitiesData.filter(community =>
    community.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const CommunityItem = ({ community }) => (
    <a
      href={community.link}
      className="flex items-center gap-4 p-3 rounded-lg transition-colors duration-150 cursor-pointer hover:bg-[#f0f0f0]"
    >
      <div className="p-2 rounded-full bg-[#f0f0f0]">
        <Icon name={community.iconName} color={community.color} />
      </div>
      <div className="flex-grow">
        <h3 className="font-semibold text-[#1e1e1e]">{community.title}</h3>
        <p className="text-sm text-[#1e1e1e]/70">{community.description}</p>
      </div>
      <span className="text-xs text-[#1e1e1e]/50">Now</span>
    </a>
  );
  
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
      {/* Global Style Adjustment */}
      <style>{`
        body {
          background-color: #f5f5f5;
          font-family: 'Inter', sans-serif;
        }
      `}</style>
      
      {/* SECTION 1: Why Join GDG-DIT */}
      <section className="pt-16 pb-12 sm:pt-20 sm:pb-16 font-sans bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <div className="inline-flex items-center space-x-2 py-1 px-3 rounded-full text-sm font-medium mb-8 shadow-md bg-[#4285f4]/10 text-[#4285f4]">
                      <span role="img" aria-label="members">✨</span> 
                      <span>500+ members already part of our community!</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extrabold mb-2 text-[#1e1e1e]">
                      Why Join GDG-DIT?
                  </h2>
                  <p className="text-lg text-[#1e1e1e]/70">
                      Become part of a vibrant community of developers, learners, and innovators.
                  </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefitsData.map((benefit, index) => (
                      <BenefitCard key={index} benefit={benefit} />
                  ))}
              </div>
          </div>
      </section>
      {/* END SECTION 1 */}


      {/* SECTION 2: Main Content Block */}
      <div className={mainContentClasses}>
        
        {/* Left Column: Communities List Sidebar */}
        <aside className={sidebarClasses}>
          <div className="p-4 flex items-center justify-between border-b border-[#1e1e1e]/10">
            <h2 className="text-xl font-bold text-[#1e1e1e]">Communities</h2>
            <div className="flex items-center space-x-2 text-[#1e1e1e]/50">
              <button className="p-1 hover:text-[#1e1e1e] transition-colors" aria-label="Add Community">+</button>
              <button className="p-1 hover:text-[#1e1e1e] transition-colors" aria-label="More Options">⋮</button>
            </div>
          </div>
          
          <div className="p-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4285f4] bg-[#f0f0f0] text-[#1e1e1e] placeholder-[#1e1e1e]/50 border border-[#1e1e1e]/10"
              />
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#1e1e1e]/50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </div>

          {/* List of Communities */}
          <div className="flex-grow overflow-y-auto px-4 pb-4 space-y-2">
            {filteredCommunities.map((community, index) => (
              <CommunityItem key={index} community={community} />
            ))}
            {filteredCommunities.length === 0 && (
                <p className="text-center pt-4 text-[#1e1e1e]/50">No communities found.</p>
            )}
          </div>
        </aside>

        {/* Right Column: Hero/Promotion Area */}
        <main className={heroClasses}>
          <div className="max-w-2xl">
            <h1 className={heroTitleClass}>
              Join our WhatsApp communities now!
            </h1>
            <p className={heroPClass}>
              Connect with fellow developers, share knowledge, and stay updated on the latest in tech. Our GDG/GDSC communities are the perfect place to grow your skills and network with like-minded individuals.
            </p>
            
            <a
              href="#community-links"
              className="inline-block bg-[#25D366] text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-[#128C7E] transition-colors shadow-lg shadow-[#25D366]/30"
            >
              Explore All Communities
            </a>
          </div>
        </main>
      </div>
      {/* END SECTION 2 */}
      
      {/* SECTION 3: Choose Your Platform */}
      <section className="py-16 bg-[#f0f0f0]" id="community-links">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#1e1e1e]">
            Choose Your Platform
          </h2>
          <p className="text-center mb-12 text-lg text-[#1e1e1e]/70">
            Connect with us on your preferred platform
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityPlatforms.map((platform, index) => (
              <PlatformCard key={index} platform={platform} />
            ))}
          </div>
        </div>
      </section>
      {/* END SECTION 3 */}

      {/* SECTION 4: What Happens After You Join? */}
      <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e1e1e]">
                      What Happens After You Join?
                  </h2>
              </div>
              
              <div className="max-w-3xl mx-auto">
                  {stepsData.map((step, index) => (
                      // Add border to separate steps (except the last one)
                      <div key={index} className={index < stepsData.length - 1 ? 'border-b border-[#1e1e1e]/10' : ''}>
                          <StepItem step={step.step} title={step.title} description={step.description} />
                      </div>
                  ))}
              </div>
          </div>
      </section>
      {/* END SECTION 4 */}
      
      {/* SECTION 5: Ready to Get Started? CTA */}
      <section className="py-16 bg-[#f0f0f0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* New CTA Card Design */}
              <div className="max-w-4xl mx-auto p-10 rounded-3xl text-center shadow-2xl transition-all duration-500 bg-[#4285f4]/5 border border-[#4285f4]/10 hover:shadow-2xl">
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-[#1e1e1e]">
                      Ready to Get Started?
                  </h2>
                  <p className="text-lg mb-8 text-[#1e1e1e]/70">
                      Pick a platform above and join thousands of developers in our community today!
                  </p>
                  <a
                      href="#community-links"
                      className="inline-block px-8 py-3 rounded-full font-bold text-lg transition-colors duration-300 shadow-lg bg-[#4285f4] text-white hover:bg-[#3367D6] shadow-[#4285f4]/50"
                  >
                      View Events
                  </a>
              </div>
          </div>
      </section>
      {/* END SECTION 5 */}
      
    </div>
  );
}
