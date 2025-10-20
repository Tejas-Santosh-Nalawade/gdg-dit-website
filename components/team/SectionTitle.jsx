import React from 'react';

/**
 * Section Title component with GDG branding style (first word red, rest black) and centered alignment.
 * @param {object} props - Component props.
 * @param {string} props.title - The title text.
 */
export default function SectionTitle({ title }) {
    // Split the title into parts for multi-color styling
    const parts = title.split(' ');
    const firstWord = parts[0];
    const remainingWords = parts.slice(1).join(' ');

    return (
        <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 leading-tight mb-4">
                {/* The first word is always red for emphasis */}
                <span className="text-red-600">
                    {firstWord}
                </span>
                {/* Remaining words are dark gray/black, separated by a space */}
                {remainingWords && (
                    <span className="text-gray-900 ml-2">
                        {remainingWords}
                    </span>
                )}
            </h2>
        </div>
    );
}
