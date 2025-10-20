'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SectionTitle from '@/components/common/SectionTitle';
import EventList from '@/components/events/EventList';

const domains = ['All', 'Android', 'Cloud', 'Web', 'AI/ML', 'Flutter'];

export default function EventsPage() {
  const [eventsData, setEventsData] = useState({ upcomingEvents: [], pastEvents: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load events data on the client side only
    import('@/data/events.json')
      .then((module) => {
        setEventsData(module.default);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);
  const [selectedDomain, setSelectedDomain] = useState('All');

  const filteredEvents = selectedDomain === 'All' 
    ? eventsData.upcomingEvents 
    : eventsData.upcomingEvents.filter(event => event.domain === selectedDomain);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600">Loading events...</p>
        </div>
      </main>
    );
  }

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
            {eventsData.pastEvents && eventsData.pastEvents.length > 0 ? (
              eventsData.pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
                >
                  <h3 className="text-xl font-bold mb-2 text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                  <p className="text-sm text-gray-600 mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {event.attendees} attendees
                  </p>
                  {event.blogLink && (
                    <Link
                      href={event.blogLink}
                      className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2"
                    >
                      Read Event Recap →
                    </Link>
                  )}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-gray-600">No past events to display.</p>
              </div>
            )}
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
