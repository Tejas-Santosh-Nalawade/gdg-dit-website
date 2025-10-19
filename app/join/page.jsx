export default function JoinPage() {
  const benefits = [
    {
      icon: '🎓',
      title: 'Learn New Technologies',
      description: 'Access workshops, study jams, and tech talks on cutting-edge technologies',
    },
    {
      icon: '🤝',
      title: 'Network with Developers',
      description: 'Connect with like-minded students, professionals, and industry experts',
    },
    {
      icon: '🏆',
      title: 'Earn Certifications',
      description: 'Complete study jams and earn Google Cloud badges and certifications',
    },
    {
      icon: '💼',
      title: 'Career Opportunities',
      description: 'Get access to job opportunities, internships, and mentorship programs',
    },
    {
      icon: '🚀',
      title: 'Build Projects',
      description: 'Work on real-world projects and showcase your skills to the community',
    },
    {
      icon: '🎁',
      title: 'Exclusive Swag & Perks',
      description: 'Get GDG merchandise, access to Google resources, and event perks',
    },
  ];

  const communityPlatforms = [
    {
      name: 'Discord',
      description: 'Join our Discord server for real-time discussions and tech support',
      icon: '💬',
      link: 'https://discord.gg/gdgdit',
      color: 'from-indigo-400 to-indigo-600',
    },
    {
      name: 'WhatsApp',
      description: 'Get event updates and announcements on our WhatsApp community',
      icon: '📱',
      link: 'https://chat.whatsapp.com/gdgdit',
      color: 'from-green-400 to-green-600',
    },
    {
      name: 'LinkedIn',
      description: 'Follow us on LinkedIn for professional networking and updates',
      icon: '💼',
      link: 'https://linkedin.com/company/gdg-dit',
      color: 'from-blue-400 to-blue-600',
    },
    {
      name: 'Meetup',
      description: 'RSVP to our events and stay updated on upcoming meetups',
      icon: '📅',
      link: 'https://meetup.com/gdg-dit',
      color: 'from-red-400 to-red-600',
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Join GDG-DIT Community
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Become part of a vibrant community of developers, learners, and innovators
            </p>
            <div className="inline-block bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
              <p className="text-lg">
                🎉 <strong>500+</strong> members already part of our community!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
            Why Join GDG-DIT?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Platforms Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-800">
            Choose Your Platform
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Connect with us on your preferred platform
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {communityPlatforms.map((platform, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className={`bg-gradient-to-r ${platform.color} h-24 flex items-center justify-center text-5xl`}>
                  {platform.icon}
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2 text-gray-800">
                    {platform.name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {platform.description}
                  </p>
                  <a
                    href={platform.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block w-full bg-gradient-to-r ${platform.color} text-white text-center py-3 rounded-lg font-bold hover:opacity-90 transition-opacity`}
                  >
                    Join on {platform.name}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What's Next Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              What Happens After You Join?
            </h2>
            <div className="space-y-6 text-left">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  1️⃣
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Welcome Message</h3>
                  <p className="text-gray-600">
                    Receive a warm welcome from our team and get introduced to the community
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  2️⃣
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Event Notifications</h3>
                  <p className="text-gray-600">
                    Stay updated about upcoming workshops, study jams, and tech talks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                  3️⃣
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Start Learning</h3>
                  <p className="text-gray-600">
                    Access resources, join discussions, and start your learning journey with us
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Pick a platform above and join thousands of developers in our community today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors"
            >
              Join Now
            </a>
            <a
              href="/events"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              View Events
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
