export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#f9ab00] to-[#ea4335] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Code of Conduct
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95">
            Our commitment to creating a welcoming and inclusive community
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-[#1e1e1e]/5">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-[#1e1e1e] leading-relaxed" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                GDG-DIT is dedicated to providing a harassment-free experience for everyone, regardless of gender, 
                gender identity and expression, age, sexual orientation, disability, physical appearance, body size, 
                race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of 
                participants in any form.
              </p>
            </div>

            {/* Expected Behavior */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e] flex items-center gap-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <span className="text-4xl">✅</span>
                Expected Behavior
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#34a853] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    <strong className="text-[#1e1e1e]">Be Respectful:</strong> Value each other's ideas, styles, and viewpoints. Disagreement 
                    is no excuse for poor manners.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#34a853] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    <strong className="text-[#1e1e1e]">Be Inclusive:</strong> Welcome and support people of all backgrounds and identities.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#34a853] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    <strong className="text-[#1e1e1e]">Be Collaborative:</strong> Work together to build a stronger community and support each 
                    other's learning.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#34a853] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    <strong className="text-[#1e1e1e]">Be Mindful:</strong> Be aware of the impact of your words and actions on others.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#34a853] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    <strong className="text-[#1e1e1e]">Ask for Help:</strong> Everyone has questions. Asking early can prevent problems later.
                  </p>
                </li>
              </ul>
            </div>

            {/* Unacceptable Behavior */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e] flex items-center gap-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <span className="text-4xl">❌</span>
                Unacceptable Behavior
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Violence, threats of violence, or violent language directed against another person
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Sexist, racist, homophobic, transphobic, ableist, or otherwise discriminatory jokes and language
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Posting or displaying sexually explicit or violent material
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Personal insults, particularly those related to gender, sexual orientation, race, religion, or disability
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Inappropriate photography or recording
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Unwelcome sexual attention or advances
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Deliberate intimidation, stalking, or following (online or in person)
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#ea4335] text-xl mt-1 font-bold">•</span>
                  <p className="text-[#5f6368] leading-relaxed">
                    Advocating for, or encouraging, any of the above behavior
                  </p>
                </li>
              </ul>
            </div>

            {/* Consequences */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e] flex items-center gap-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <span className="text-4xl">⚠️</span>
                Consequences of Unacceptable Behavior
              </h2>
              <p className="text-[#5f6368] mb-4 leading-relaxed">
                Unacceptable behavior from any community member will not be tolerated. Anyone asked to stop unacceptable 
                behavior is expected to comply immediately.
              </p>
              <p className="text-[#5f6368] leading-relaxed">
                If a community member engages in unacceptable behavior, the organizers may take any action they deem 
                appropriate, including a temporary ban or permanent expulsion from the community without warning.
              </p>
            </div>

            {/* Reporting */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e] flex items-center gap-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <span className="text-4xl">📢</span>
                Reporting Guidelines
              </h2>
              <p className="text-[#5f6368] mb-4 leading-relaxed">
                If you are subject to or witness unacceptable behavior, or have any other concerns, please notify a 
                community organizer as soon as possible.
              </p>
              <div className="bg-[#e8f0fe] border-l-4 border-[#4285f4] p-6 rounded-xl">
                <p className="text-[#1e1e1e] mb-2 font-semibold" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                  Contact us:
                </p>
                <p className="text-[#5f6368]">
                  Email: <a href="mailto:conduct@gdgdit.com" className="text-[#4285f4] hover:text-[#3367D6] font-semibold">conduct@gdgdit.com</a>
                </p>
                <p className="text-[#5f6368] mt-2 text-sm">
                  All reports will be handled with discretion and confidentiality.
                </p>
              </div>
            </div>

            {/* Scope */}
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e] flex items-center gap-3" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                <span className="text-4xl">🌍</span>
                Scope
              </h2>
              <p className="text-[#5f6368] leading-relaxed">
                This Code of Conduct applies to all GDG-DIT community spaces, including online platforms (Discord, 
                WhatsApp, social media), events (workshops, study jams, meetups), and any one-on-one communications 
                pertaining to community business.
              </p>
            </div>

            {/* Attribution */}
            <div className="border-t border-[#1e1e1e]/10 pt-8">
              <p className="text-sm text-[#5f6368]">
                This Code of Conduct is adapted from the{' '}
                <a
                  href="https://www.contributor-covenant.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4285f4] hover:text-[#3367D6] font-semibold"
                >
                  Contributor Covenant
                </a>
                {' '}and the{' '}
                <a
                  href="https://developers.google.com/community-guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#4285f4] hover:text-[#3367D6] font-semibold"
                >
                  Google Developer Community Guidelines
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
