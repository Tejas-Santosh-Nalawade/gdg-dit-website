import React from 'react';

/**
 * Reusable Card component wrapper for consistent styling.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 */
export default function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl hover:-translate-y-0.5 border border-gray-100 ${className}`}>
            {children}
        </div>
    );
}
