'use client';

import { useState } from 'react';
import Link from 'next/link';
import SectionTitle from '@/components/common/SectionTitle';
import EventList from '@/components/events/EventList';
import eventsData from '@/data/events.json';

const domains = ['All', 'Android', 'Cloud', 'Web', 'AI/ML', 'Flutter'];

export default function EventsPage() {
  const [selectedDomain, setSelectedDomain] = useState('All');

  const filteredEvents = selectedDomain === 'All' 
    ? eventsData.upcomingEvents 
    : eventsData.upcomingEvents.filter(event => event.domain === selectedDomain);

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            Events
          </h1>
          <p className="text-xl text-center max-w-2xl mx-auto">
            Join us for workshops, study jams, and tech talks to enhance your skills
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-3 justify-center">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                  selectedDomain === domain
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SectionTitle title="Upcoming Events" />
          <EventList events={filteredEvents} />

          {filteredEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No events found for the selected domain.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-gray-800">
            Past Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.pastEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-xl font-bold mb-2 text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  📅 {event.date}
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  👥 {event.attendees} attendees
                </p>
                <Link
                  href={event.blogLink}
                  className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2"
                >
                  Read Event Recap →
                </Link>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/blog"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors"
            >
              View All Event Recaps
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
