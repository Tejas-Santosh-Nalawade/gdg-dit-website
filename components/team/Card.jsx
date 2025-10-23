import React from 'react';

/**
 * Reusable Card component wrapper for consistent styling, now reverted to original simpler lift effect.
 * @param {object} props - Component props.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional Tailwind CSS classes.
 */
const Card = ({ children, className = "" }) => {
    // Standard shadow and hover effect: shadow-lg -> hover:shadow-xl
    return (
        <div className={`bg-white rounded-xl shadow-lg transition duration-300 hover:shadow-xl ${className}`}>
            {children}
        </div>
    );
}

export default Card;