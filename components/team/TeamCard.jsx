"use client";
import React, { useState, useEffect } from "react";
import Card from './Card';

const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

const Github = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.803 8.207 11.385.6.115.82-.248.82-.553 0-.271-.01-1.111-.01-2.023-3.337.724-4.042-1.61-4.042-1.61-.542-1.365-1.323-1.731-1.323-1.731-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.835 2.809 1.305 3.493.998.108-.778.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.31.465-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.046.138 3.004.404 2.292-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.772.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222 0 1.604-.015 2.894-.015 3.287 0 .308.216.678.823.553 4.771-1.581 8.203-6.082 8.203-11.385.001-6.627-5.372-12-12-12z" />
    </svg>
);

const Linkedin = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.13-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.76 7 2.457v6.778z" />
    </svg>
);

const TeamCard = ({ member, isCore = false }) => {
    const colorClasses = member.colorClass ? member.colorClass.split(' ') : [];
    const textColor = colorClasses.find(c => c.startsWith('text-')) || 'text-gray-600';
    const baseBorderClass = colorClasses.find(c => c.startsWith('border-')) || 'border-gray-500';
    
    // Map border colors to solid, vibrant Google colors for the top border
    let solidHeaderColorClass = 'bg-gray-500';
    if (baseBorderClass.includes('blue')) {
        solidHeaderColorClass = 'bg-blue-500';
    } else if (baseBorderClass.includes('green')) {
        solidHeaderColorClass = 'bg-green-500';
    } else if (baseBorderClass.includes('yellow')) {
        solidHeaderColorClass = 'bg-yellow-500';
    } else if (baseBorderClass.includes('red')) {
        solidHeaderColorClass = 'bg-red-500';
    }
    
    const imageBaseUrl = "/images/team/";
    const imageUrl = `${imageBaseUrl}${member.photo}`;
    const initials = getInitials(member.name);
    const [imageError, setImageError] = useState(false);
    useEffect(() => { setImageError(false); }, [member.photo]);
    const dotColors = ['bg-blue-600', 'bg-red-600', 'bg-yellow-500', 'bg-green-600'];
    return (
        <Card className={`overflow-hidden flex flex-col h-full`}>
            <div className={`h-2 w-full ${solidHeaderColorClass} rounded-t-xl`}></div>
            <div className="w-full aspect-[4/5] relative">
                <div className="w-full h-full overflow-hidden flex items-center justify-center bg-gray-100">
                    {!imageError && member.photo !== '👤' ? (
                        <img 
                            src={imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover object-top scale-110" 
                            onError={() => setImageError(true)} 
                            loading="lazy" 
                        />
                    ) : (
                        <div className={`absolute inset-0 flex items-center justify-center text-3xl font-extrabold text-gray-500 bg-gray-200`}>{initials}</div>
                    )}
                </div>
            </div>
            <div className="flex flex-col items-center p-3 md:p-4 text-center flex-grow">
                <h3 className="text-base md:text-lg font-extrabold text-gray-800 leading-tight mb-1">{member.name}</h3>
                <p className={`text-xs md:text-sm font-semibold ${textColor} tracking-wide mb-3`}>{member.role}</p>
                {isCore && member.bio && (<p className="text-gray-500 text-xs italic mb-3 px-2 line-clamp-2">{member.bio}</p>)}
                <div className="flex justify-center space-x-1 mb-3">
                    {dotColors.map((dotClass, i) => (<span key={i} className={`w-1.5 h-1.5 rounded-full ${dotClass}`}></span>))}
                </div>
                {isCore && (member.social?.linkedin || member.social?.github) && (
                    <div className="flex space-x-3 mt-auto">
                        {member.social.linkedin && (<a href={member.social.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-600 transition duration-150" title={`LinkedIn of ${member.name}`}><Linkedin className="w-4 h-4 md:w-5 md:h-5" /></a>)}
                        {member.social.github && (<a href={member.social.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-800 transition duration-150" title={`GitHub of ${member.name}`}><Github className="w-4 h-4 md:w-5 md:h-5" /></a>)}
                    </div>
                )}
            </div>
        </Card>
    );
};
export default TeamCard;
