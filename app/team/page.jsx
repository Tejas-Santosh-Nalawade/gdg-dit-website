import React from 'react';
import TeamCard from '@/components/team/TeamCard';
import SectionTitle from '@/components/team/SectionTitle';
// FIX: Ensure correct import of JSON data in Next.js environment.
// Using 'import teamData from '@/data/team.json';' ensures the data is correctly loaded.
import teamData from '@/data/TeamData.json'; 

/**
 * Main Team Page component, styled with GDG branding.
 */
export default function TeamPage() {
    // Utility class for GDG Blue
    const gdgBlue = "bg-blue-600 hover:bg-blue-700 transition-colors duration-300";

    // SAFETY CHECK: Ensure teamData and its properties are defined before rendering.
    if (!teamData || !teamData.coreTeam || !teamData.coreTeam.members) {
        // You might render a loading state or an error message here in a production app.
        console.error("Team data is missing or incorrectly structured.");
        return <div className="p-10 text-center text-xl text-red-500">Error loading team data. Please check data/team.json structure.</div>;
    }


    return (
        <main className="min-h-screen bg-gray-50">
            {/* Hero Section: GDG-branded header */}
            <section className="bg-white py-16 shadow-md">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-center tracking-tight">
                        <span className="text-gray-900">Meet Our</span> <span className="text-blue-600">Team</span>
                    </h1>
                    {/* UPDATED ATTRACTIVE LINE 1 */}
                    <p className="text-xl text-center text-gray-600 max-w-3xl mx-auto -mb-12">
                        Dedicated organizers working together to build an amazing developer community at DIT.
                    </p>
                </div>
            </section>

            {/* Mission Statement */}
            <section className="py-12 bg-white border-b border-gray-100">
                <div className="container mx-auto px-4 max-w-7xl">
                    <div className="max-w-3xl mx-auto text-center">
                        {/* UPDATED ATTRACTIVE LINE 2 */}
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Our team is committed to fostering a vibrant community of developers, learners, and innovators. 
                            We organize events, workshops, and study sessions to help everyone grow their technical skills 
                            and connect with fellow developers. Together, we're building a supportive environment where 
                            everyone can learn, share, and succeed.
                        </p>
                    </div>
                </div>
            </section>

            {/* CORE LEADERSHIP TEAM (Separate Section) */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    {/* Use the title from the JSON data */}
                    <SectionTitle title={teamData.coreTeam.title} /> 
                    {/* FIX: Set grid to 4 columns on large screens */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* The error occurred here because teamData.coreTeam.members was undefined */}
                        {teamData.coreTeam.members.map((member) => (
                            <TeamCard 
                                key={member.id} 
                                member={{ ...member, colorClass: teamData.coreTeam.colorClass }} 
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- TECHNICAL DOMAINS --- */}
            <section className="py-16 bg-white border-t border-gray-100">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 mb-16">
                        <span className="text-green-600">Technical</span> Domains
                    </h2>
                    
                    {/* The order of teams will now reflect the JSON data: App Dev first, then AI/ML */}
                    {teamData.techTeams.map((team, index) => (
                        <div key={index} className="mb-20">
                            <SectionTitle title={team.title} />
                            {/* FIX: Set grid to 4 columns on large screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {team.members.map((member) => (
                                    <TeamCard 
                                        key={member.id} 
                                        // Merge member data with the team's dedicated color class
                                        member={{ ...member, colorClass: team.colorClass }} 
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- NON-TECHNICAL DOMAINS --- */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h2 className="text-4xl font-extrabold tracking-tight text-center text-gray-900 mb-16">
                        <span className="text-red-600">Operational</span> & Non-Technical Domains
                    </h2>

                    {teamData.nonTechTeams.map((team, index) => (
                        <div key={index} className="mb-16">
                            <SectionTitle title={team.title} />
                            {/* FIX: Set grid to 4 columns on large screens */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                                {team.members.map((member) => (
                                    <TeamCard 
                                        key={member.id} 
                                        // Merge member data with the team's dedicated color class
                                        member={{ ...member, colorClass: team.colorClass }} 
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Join Team CTA: Using GDG Blue */}
            <section className={`py-16 ${gdgBlue} text-white`}>
                <div className="container mx-auto px-4 text-center max-w-7xl">
                    <h2 className="text-3xl font-bold mb-4">
                        Want to Join Our Team?
                    </h2>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">
                        We're always looking for passionate individuals to help organize events and grow our community.
                    </p>
                    <a
                        href="mailto:contact@gdgdit.com?subject=Join GDG-DIT Team"
                        className="inline-block bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transition-colors transform hover:scale-[1.03]"
                    >
                        Get In Touch
                    </a>
                </div>
            </section>
        </main>
    );
}
