export default function CodeOfConductPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Code of Conduct
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Our commitment to creating a welcoming and inclusive community
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
            
            {/* Introduction */}
            <div className="mb-12">
              <p className="text-lg text-gray-700 leading-relaxed">
                GDG-DIT is dedicated to providing a harassment-free experience for everyone, regardless of gender, 
                gender identity and expression, age, sexual orientation, disability, physical appearance, body size, 
                race, ethnicity, religion (or lack thereof), or technology choices. We do not tolerate harassment of 
                participants in any form.
              </p>
            </div>

            {/* Expected Behavior */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">✅</span>
                Expected Behavior
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Be Respectful:</strong> Value each other's ideas, styles, and viewpoints. Disagreement 
                    is no excuse for poor manners.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Be Inclusive:</strong> Welcome and support people of all backgrounds and identities.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Be Collaborative:</strong> Work together to build a stronger community and support each 
                    other's learning.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Be Mindful:</strong> Be aware of the impact of your words and actions on others.
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    <strong>Ask for Help:</strong> Everyone has questions. Asking early can prevent problems later.
                  </p>
                </li>
              </ul>
            </div>

            {/* Unacceptable Behavior */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">❌</span>
                Unacceptable Behavior
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Violence, threats of violence, or violent language directed against another person
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Sexist, racist, homophobic, transphobic, ableist, or otherwise discriminatory jokes and language
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Posting or displaying sexually explicit or violent material
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Personal insults, particularly those related to gender, sexual orientation, race, religion, or disability
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Inappropriate photography or recording
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Unwelcome sexual attention or advances
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Deliberate intimidation, stalking, or following (online or in person)
                  </p>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-600 text-xl mt-1">•</span>
                  <p className="text-gray-700">
                    Advocating for, or encouraging, any of the above behavior
                  </p>
                </li>
              </ul>
            </div>

            {/* Consequences */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">⚠️</span>
                Consequences of Unacceptable Behavior
              </h2>
              <p className="text-gray-700 mb-4">
                Unacceptable behavior from any community member will not be tolerated. Anyone asked to stop unacceptable 
                behavior is expected to comply immediately.
              </p>
              <p className="text-gray-700">
                If a community member engages in unacceptable behavior, the organizers may take any action they deem 
                appropriate, including a temporary ban or permanent expulsion from the community without warning.
              </p>
            </div>

            {/* Reporting */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">📢</span>
                Reporting Guidelines
              </h2>
              <p className="text-gray-700 mb-4">
                If you are subject to or witness unacceptable behavior, or have any other concerns, please notify a 
                community organizer as soon as possible.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded">
                <p className="text-gray-700 mb-2">
                  <strong>Contact us:</strong>
                </p>
                <p className="text-gray-700">
                  Email: <a href="mailto:conduct@gdgdit.com" className="text-blue-600 hover:text-blue-800">conduct@gdgdit.com</a>
                </p>
                <p className="text-gray-700 mt-2 text-sm">
                  All reports will be handled with discretion and confidentiality.
                </p>
              </div>
            </div>

            {/* Scope */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-3">
                <span className="text-3xl">🌍</span>
                Scope
              </h2>
              <p className="text-gray-700">
                This Code of Conduct applies to all GDG-DIT community spaces, including online platforms (Discord, 
                WhatsApp, social media), events (workshops, study jams, meetups), and any one-on-one communications 
                pertaining to community business.
              </p>
            </div>

            {/* Attribution */}
            <div className="border-t pt-8">
              <p className="text-sm text-gray-600">
                This Code of Conduct is adapted from the{' '}
                <a
                  href="https://www.contributor-covenant.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  Contributor Covenant
                </a>
                {' '}and the{' '}
                <a
                  href="https://developers.google.com/community-guidelines"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
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
