'use client';

import Image from 'next/image';

const coreTeamMembers = [
  {
    id: 1,
    name: 'Gaurav Masand',
    role: 'GDG Lead',
    image: '/images/team/Gaurav-Masand.webp',
    color: '#f9ab00',
  },
  {
    id: 2,
    name: 'Bhavesh Rathod',
    role: 'Managing Director',
    image: '/images/team/Bhavesh-Rathod.jpg',
    color: '#4285f4',
  },
  {
    id: 3,
    name: 'Mrunal Thakare',
    role: 'Tech Lead',
    image: '/images/team/Mrunal-Thakare.webp',
    color: '#ea4335',
  },
  {
    id: 4,
    name: 'Ananya Mahajan',
    role: 'Non-Tech Lead / Production Head',
    image: '/images/team/Ananya.jpeg',
    color: '#34a853',
  },
];

export default function CoreTeamSectionSimple() {
  return (
    <section className="relative py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6 md:px-8 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className="text-4xl md:text-5xl font-bold mb-4 text-gray-900"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Meet Our Core Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            The driving force behind GDG-DIT, leading innovation and community growth
          </p>
        </div>

        {/* Core Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {coreTeamMembers.map((member) => (
            <div key={member.id} className="group">
              <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-gray-100">
                {/* Colored top border */}
                <div
                  className="h-2 w-full"
                  style={{ backgroundColor: member.color }}
                />

                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Info Section */}
                <div className="p-6 text-center">
                  <h3
                    className="text-xl font-bold text-gray-900 mb-2"
                    style={{ fontFamily: 'Google Sans, sans-serif' }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-sm font-semibold mb-3"
                    style={{ color: member.color }}
                  >
                    {member.role}
                  </p>

                  {/* Decorative element */}
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative bottom border with Google colors */}
      <div className="absolute bottom-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#4285f4]" />
        <div className="flex-1 bg-[#ea4335]" />
        <div className="flex-1 bg-[#f9ab00]" />
        <div className="flex-1 bg-[#34a853]" />
      </div>
    </section>
  );
}
