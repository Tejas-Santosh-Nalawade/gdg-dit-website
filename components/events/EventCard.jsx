import Card from '../common/Card';

export default function EventCard({ event }) {
  return (
    <Card>
      <div className={`bg-gradient-to-r ${event.color} h-48 flex items-center justify-center`}>
        <span className="text-white text-4xl md:text-5xl font-bold tracking-wider">
          {event.banner}
        </span>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {event.type}
          </span>
          <span className="bg-purple-100 text-purple-800 text-xs font-semibold px-3 py-1 rounded-full">
            {event.domain}
          </span>
        </div>
        <h3 className="text-xl font-bold mb-3 text-gray-800">
          {event.title}
        </h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="font-semibold">Date:</span> {event.date}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-semibold">Time:</span> {event.time}
          </p>
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-semibold">Venue:</span> {event.venue}
          </p>
        </div>
        <p className="text-gray-600 text-sm mb-4">
          {event.description}
        </p>
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Register Now
        </button>
      </div>
    </Card>
  );
}
