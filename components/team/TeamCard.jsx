"use client"; // CRITICAL FIX: Mark this component as a Client Component because it uses useState and useEffect

import React, { useState, useEffect } from 'react';
import { Linkedin, Github } from 'lucide-react'; // Keeping imports just in case, but they are no longer used in the JSX
// FIX: The Card component is assumed to be a sibling file, 'Card.jsx'
import Card from './Card'; 

/**
 * Helper function to generate initials from a full name (handles two words).
 * e.g., "Gaurav Masand" -> "GM"
 * @param {string} name - The full name of the member.
 * @returns {string} The initials or single initial.
 */
const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) {
        return parts[0].charAt(0).toUpperCase();
    }
    // Takes the first letter of the first and last word
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};


/**
 * Component to display individual team member details, now including the photo fallback logic.
 * @param {object} props
 * @param {object} props.member - Team member data object, must contain 'photo' field with the filename.
 */
export default function TeamCard({ member }) {
    // Safely destructure the color classes
    const colorClasses = member.colorClass ? member.colorClass.split(' ') : [];
    
    // colorClasses[0] is typically like 'border-blue-500'. We need to extract the color name.
    const baseBorderClass = colorClasses[0] || 'border-gray-500';
    const textColor = colorClasses[1] || 'text-gray-600';
    const badgeBg = colorClasses[2] || 'bg-gray-100';

    // 1. Logic to extract base color (e.g., 'blue') and construct a LIGHTER border (e.g., border-blue-300)
    const colorMatch = baseBorderClass.match(/border-([a-z]+)-\d+/);
    const baseColorName = colorMatch ? colorMatch[1] : 'gray';
    const lightBorderColor = `border-${baseColorName}-300`; 
    
    // Construct the image URL pointing to the public directory
    const imageUrl = `/images/team/${member.photo}`;

    // Calculate initials for the fallback
    const initials = getInitials(member.name);
    
    // State to handle image loading status for the fallback
    const [imageLoaded, setImageLoaded] = useState(true);
    
    // Reset image loaded state if member changes
    useEffect(() => {
        // We assume the image is present initially, and the onError will switch this state
        setImageLoaded(true);
    }, [member.photo]);


    return (
        // Apply the new, lighter border color
        <Card className={`h-full border-t-4 ${lightBorderColor} overflow-hidden flex flex-col justify-between`}>
            {/* INCREASED PADDING from p-6 to p-8 to make the card visibly larger */}
            <div className="flex flex-col items-center p-8 text-center">
                
                {/* Photo Display Area - INCREASED SIZE from w-32 h-32 to w-40 h-40 */}
                <div className={`w-40 h-40 rounded-full overflow-hidden mb-4 shadow-inner flex items-center justify-center ${
                    !imageLoaded ? 'ring-4 ring-offset-2 ring-gray-200' : ''
                }`}>
                    
                    {/* Conditional rendering based on imageLoaded state */}
                    {imageLoaded && member.photo ? (
                        <img 
                            src={imageUrl} 
                            alt={member.name} 
                            className="w-full h-full object-cover transition-opacity duration-500" 
                            onError={() => {
                                // If image fails to load, trigger state change to show initials
                                setImageLoaded(false);
                            }}
                        />
                    ) : (
                        // Fallback: If image fails to load OR photo property is missing, show initials
                        // INCREASED INITIALS TEXT SIZE from text-3xl to text-5xl
                        <div className={`w-full h-full rounded-full bg-gray-100 flex items-center justify-center text-5xl font-bold text-gray-500 shadow-inner`}>
                            {initials}
                        </div>
                    )}
                </div>
                
                {/* Info */}
                {/* INCREASED NAME TEXT SIZE from text-lg to text-xl */}
                <h3 className="text-xl font-extrabold text-gray-800 leading-tight mb-5">
                    {member.name}
                </h3>
                
                {/* Role Badge - INCREASED TEXT SIZE from text-xs to text-sm */}
                <span className={`text-sm font-bold px-3 py-1 rounded-full ${textColor} ${badgeBg} tracking-wide mb-4`}>
                    {member.role}
                </span>
            </div>
        </Card>
    );
};
