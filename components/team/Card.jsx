import React from 'react';

/**
 * Reusable Card component wrapper for consistent styling with enhanced hover effects.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 */
const Card = ({ children, className = "" }) => {
    // Enhanced hover effect: lift, scale, and shadow
    return (
        <div className={`bg-white rounded-xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 hover:scale-105 ${className}`}>
            {children}
        </div>
    );
}

export default Card;