import SectionTitle from '../common/SectionTitle';
import { domains } from '@/data/domains.json';

export default function DomainsGrid() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Our Tech Domains"
          subtitle="Explore various technologies and find your passion"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {domains.map((domain) => (
            <div
              key={domain.name}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${domain.color} rounded-lg flex items-center justify-center text-3xl mb-4`}>
                {domain.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">
                {domain.name}
              </h3>
              <p className="text-gray-600">
                {domain.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
