import React from 'react';

/**
 * Section Title component with clean, centered GDG style.
 * @param {object} props - Component props.
 * @param {string} props.title - The title text.
 * @param {string} [props.colorClass] - Tailwind class for the accent color (e.g., 'text-blue-600').
 */
const SectionTitle = ({ title, colorClass = 'text-gray-900' }) => {
    // H3 style with dashed bottom border
    return (
        <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-10 text-center ${colorClass} border-b-4 border-dashed border-gray-200 pb-2 max-w-lg mx-auto`}>
            {title}
        </h3>
    );
}

export default SectionTitle;