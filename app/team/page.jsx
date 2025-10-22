import TeamCard from '@/components/team/TeamCard';
import SectionTitle from '@/components/common/SectionTitle';
import teamData from '@/data/team.json';

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4285f4] to-[#ea4335] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Meet Our Team
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95">
            Dedicated organizers working together to build an amazing developer community at DIT
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-lg text-[#5f6368] leading-relaxed">
              Our team is committed to fostering a vibrant community of developers, learners, and innovators. 
              We organize events, workshops, and study sessions to help everyone grow their technical skills 
              and connect with fellow developers. Together, we're building a supportive environment where 
              everyone can learn, share, and succeed.
            </p>
          </div>
        </div>
      </section>

      {/* Core Team */}
      <section className="py-16 bg-[#fafafa]">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1e1e1e] text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Core Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.coreTeam.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-[#1e1e1e] text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Volunteers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamData.volunteers.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 bg-gradient-to-r from-[#4285f4] to-[#34a853] text-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Want to Join Our Team?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            We're always looking for passionate individuals to help organize events and grow our community
          </p>
          <a
            href="mailto:contact@gdgdit.com?subject=Join GDG-DIT Team"
            className="inline-block bg-white text-[#4285f4] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Get In Touch
          </a>
        </div>
      </section>
    </main>
  );
}
