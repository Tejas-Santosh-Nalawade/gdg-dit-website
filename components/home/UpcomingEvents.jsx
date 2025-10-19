import Link from 'next/link';
import Card from '../common/Card';
import Button from '../common/Button';
import SectionTitle from '../common/SectionTitle';
import { upcomingEvents } from '@/data/events.json';

export default function UpcomingEvents() {
  // Show only first 3 events
  const displayEvents = upcomingEvents.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Upcoming Events"
          subtitle="Don't miss out on these exciting learning opportunities"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {displayEvents.map((event) => (
            <Card key={event.id}>
              <div className={`bg-gradient-to-r ${event.color} h-48 flex items-center justify-center text-6xl`}>
                {event.banner}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-gray-800">
                  {event.title}
                </h3>
                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">📅 Date:</span> {event.date}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">🕐 Time:</span> {event.time}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-semibold">📍 Venue:</span> {event.venue}
                  </p>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {event.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button href="/events" size="lg">
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
}
