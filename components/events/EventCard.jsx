import Card from '../common/Card';

export default function EventCard({ event }) {
  return (
    <Card>
      <div className={`bg-gradient-to-r ${event.color} h-48 flex items-center justify-center text-6xl`}>
        {event.banner}
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
        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
          Register Now
        </button>
      </div>
    </Card>
  );
}
