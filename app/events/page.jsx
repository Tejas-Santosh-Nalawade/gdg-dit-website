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
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4285f4] to-[#ea4335] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Events
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95">
            Join us for workshops, study jams, and tech talks to enhance your skills
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="flex flex-wrap gap-3 justify-center">
            {domains.map((domain) => (
              <button
                key={domain}
                onClick={() => setSelectedDomain(domain)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                  selectedDomain === domain
                    ? 'bg-[#4285f4] text-white shadow-lg scale-105'
                    : 'bg-[#f0f0f0] text-[#5f6368] hover:bg-[#e0e0e0]'
                }`}
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Upcoming Events
          </h2>
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
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Past Events
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.pastEvents && eventsData.pastEvents.length > 0 ? (
              eventsData.pastEvents.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-3xl p-6 border-2 border-gray-100 hover:shadow-xl transition-all duration-300 hover:border-[#4285f4]/20"
                >
                  <h3 className="text-xl font-bold mb-2 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {event.title}
                  </h3>
                  <p className="text-sm text-[#5f6368] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </p>
                  <p className="text-sm text-[#5f6368] mb-4 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    {event.attendees} attendees
                  </p>
                  {/* event.blogLink removed - blog section deprecated */}
                </div>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-[#5f6368]">No past events to display.</p>
              </div>
            )}
          </div>

          {/* View All Event Recaps removed - blog section deprecated */}
        </div>
      </section>
    </main>
  );
}
