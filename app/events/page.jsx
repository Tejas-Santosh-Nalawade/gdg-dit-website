'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import SectionTitle from '@/components/common/SectionTitle';
import EventList from '@/components/events/EventList';

const eventTypes = ['All', 'Workshop', 'Study Jam', 'Hackathon', 'Info session', 'Conference'];

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
  const [selectedType, setSelectedType] = useState('All');

  const filteredUpcomingEvents = selectedType === 'All' 
    ? eventsData.upcomingEvents 
    : eventsData.upcomingEvents.filter(event => event.type === selectedType || (selectedType === 'Info session' && (event.type === 'Info session' || event.type === 'Speaker Session / Tech Talk' || event.type === 'Conference')));

  const filteredPastEvents = selectedType === 'All' 
    ? eventsData.pastEvents 
    : eventsData.pastEvents.filter(event => event.type === selectedType || (selectedType === 'Info session' && (event.type === 'Info session' || event.type === 'Speaker Session / Tech Talk' || event.type === 'Conference')));

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
            {eventTypes.map((type) => {
              const typeColors = {
                'All': { bg: 'bg-gray-100', hover: 'hover:bg-gray-200', active: 'bg-gray-600', text: 'text-gray-700' },
                'Workshop': { bg: 'bg-red-50', hover: 'hover:bg-red-100', active: 'bg-[#d32f2f]', text: 'text-[#d32f2f]' },
                'Study Jam': { bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', active: 'bg-[#f57f17]', text: 'text-[#f57f17]' },
                'Hackathon': { bg: 'bg-green-50', hover: 'hover:bg-green-100', active: 'bg-[#388e3c]', text: 'text-[#388e3c]' },
                'Info session': { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', active: 'bg-[#1976d2]', text: 'text-[#1976d2]' },
                'Conference': { bg: 'bg-blue-50', hover: 'hover:bg-blue-100', active: 'bg-[#1976d2]', text: 'text-[#1976d2]' }
              };
              const colors = typeColors[type] || typeColors['All'];

              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    selectedType === type
                      ? `${colors.active} text-white shadow-lg scale-105`
                      : `${colors.bg} ${colors.text} ${colors.hover}`
                  }`}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Upcoming Events
          </h2>
          <EventList events={filteredUpcomingEvents} />

          {filteredUpcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No events found for the selected type.
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
            {filteredPastEvents && filteredPastEvents.length > 0 ? (
              filteredPastEvents.map((event) => {
                const getEventColor = (type) => {
                  const colors = {
                    'Workshop': { bg: '#d32f2f', bgLight: 'rgba(239, 154, 154, 0.1)' },
                    'Study Jam': { bg: '#f57f17', bgLight: 'rgba(255, 249, 196, 0.3)' },
                    'Hackathon': { bg: '#388e3c', bgLight: 'rgba(178, 235, 202, 0.2)' },
                    'Conference': { bg: '#1976d2', bgLight: 'rgba(187, 222, 251, 0.2)' },
                    'Info session': { bg: '#1976d2', bgLight: 'rgba(187, 222, 251, 0.2)' },
                  };
                  return colors[type] || colors['Workshop'];
                };

                const colors = getEventColor(event.type);

                return (
                  <div
                    key={event.id}
                    className="bg-white rounded-3xl p-6 border-2 hover:shadow-xl transition-all duration-300"
                    style={{ borderColor: colors.bg, backgroundColor: colors.bgLight }}
                  >
                    <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 text-white"
                      style={{ backgroundColor: colors.bg }}
                    >
                      {event.type}
                    </div>
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
                  </div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-8">
                <p className="text-[#5f6368]">No past events found for the selected type.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
