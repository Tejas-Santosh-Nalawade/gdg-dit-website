import SectionTitle from '../common/SectionTitle';

const galleryImages = [
  { id: 1, title: 'Android Workshop 2024', emoji: '📱', color: 'from-green-400 to-green-600' },
  { id: 2, title: 'Cloud Study Jam', emoji: '☁️', color: 'from-blue-400 to-blue-600' },
  { id: 3, title: 'Flutter Fest', emoji: '🎨', color: 'from-cyan-400 to-cyan-600' },
  { id: 4, title: 'DevFest 2024', emoji: '🎉', color: 'from-purple-400 to-purple-600' },
  { id: 5, title: 'ML Workshop', emoji: '🤖', color: 'from-red-400 to-red-600' },
  { id: 6, title: 'Web Dev Bootcamp', emoji: '🌐', color: 'from-orange-400 to-orange-600' },
];

export default function Gallery() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Event Gallery"
          subtitle="Memories from our amazing community events"
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
          {galleryImages.map((image) => (
            <div
              key={image.id}
              className={`aspect-square bg-gradient-to-br ${image.color} rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer flex flex-col items-center justify-center text-white p-4`}
            >
              <div className="text-4xl md:text-5xl mb-2">{image.emoji}</div>
              <p className="text-xs md:text-sm text-center font-semibold">
                {image.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
