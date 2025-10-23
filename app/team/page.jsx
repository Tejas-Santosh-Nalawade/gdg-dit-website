"use client";
import React, { useState, useEffect } from 'react';
import TeamCard from '@/components/team/TeamCard';
import SectionTitle  from '@/components/team/SectionTitle'
import teamData from '@/data/TeamData.json'


/**
 * Component to load Tailwind CSS (kept for compliance in single-file environment).
 */
const TailwindLoader = () => (
    <script src="https://cdn.tailwindcss.com"></script>
);

/**
 * Helper to extract the core text color class for section titles (e.g., 'text-blue-600').
 */
const getColorClass = (classes) => classes.split(' ').find(cls => cls.startsWith('text-'));


// --- Main App Component ---
function App() {
    // Utility class for GDG Blue, used for CTA background
    const gdgBlue = "bg-blue-600 hover:bg-blue-700 transition-colors duration-300";

    // SAFETY CHECK: Ensure teamData is defined before rendering.
    if (!teamData || !teamData.coreTeam || !teamData.coreTeam.members) {
        return <div className="p-10 text-center text-xl text-red-500">Error loading team data. Please check data structure.</div>;
    }

    // Combine all technical and non-technical teams for rendering
    const allTechTeams = teamData.techTeams || [];
    const allNonTechTeams = teamData.nonTechTeams || [];


    return (
        <main className="min-h-screen bg-gray-50 font-sans antialiased">
            {/* Inject Tailwind CSS script */}
            <script src="https://cdn.tailwindcss.com"></script>
            <style>
                {/* Apply Inter font globally for a modern look */}
                {`body { font-family: 'Inter', sans-serif; }`}
            </style>

            {/* Hero Section: GDG-branded header */}
            <section className="bg-white py-16 shadow-lg">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center tracking-tight text-gray-900">
                        Meet Our <span className="text-blue-600">Team</span>
                    </h1>
                    <p className="text-lg md:text-xl text-center text-gray-600 max-w-3xl mx-auto">
                        Dedicated organizers working together to build an amazing developer community.
                    </p>
                    <p className="text-base text-center text-gray-700 max-w-4xl mx-auto mt-4 mb-16">
                        We are passionate about technology, collaboration, and learning. Our team is committed to fostering a vibrant, supportive environment where everyone can grow their technical skills and connect with fellow developers.
                    </p>
                </div>
            </section>

            {/* CORE TEAM */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-3xl font-extrabold tracking-tight text-center text-gray-900 mb-10 pb-3">
                        {teamData.coreTeam.title}
                    </h2> 
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {teamData.coreTeam.members.map((member) => (
                            <TeamCard 
                                key={member.id} 
                                // Pass the color class and the new 'isCore' flag
                                member={{ ...member, colorClass: teamData.coreTeam.colorClass }} 
                                isCore={true} // Explicitly mark as core member
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TECHNICAL DOMAINS --- */}
            {allTechTeams.length > 0 && (
                <section className="py-16 bg-white border-t border-gray-100">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h2 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 mb-16">
                            <span className="text-black">Technical</span> Domains
                        </h2>
                        
                        {allTechTeams.map((team, index) => (
                            <div key={index} className="mb-20">
                                {/* Use the modular SectionTitle */}
                                <SectionTitle title={team.title} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {team.members.map((member) => (
                                        <TeamCard 
                                            key={member.id} 
                                            member={{ ...member, colorClass: team.colorClass }} 
                                            isCore={false} // Explicitly mark as non-core
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* --- NON-TECHNICAL DOMAINS --- */}
            {allNonTechTeams.length > 0 && (
                <section className="py-16">
                    <div className="container mx-auto px-4 max-w-7xl">
                        <h2 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 mb-16">
                            <span className="text-black">Operational</span> & Non-Technical Domains
                        </h2>

                        {allNonTechTeams.map((team, index) => (
                            <div key={index} className="mb-16">
                                {/* Use the modular SectionTitle */}
                                <SectionTitle title={team.title} />
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                                    {team.members.map((member) => (
                                        <TeamCard 
                                            key={member.id} 
                                            member={{ ...member, colorClass: team.colorClass }} 
                                            isCore={false} // Explicitly mark as non-core
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}
            
        </main>
    );
}

export default App;


