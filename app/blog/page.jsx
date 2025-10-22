import Link from 'next/link';

export default function BlogPageNotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Blog Removed</h1>
        <p className="text-gray-600 mb-6">The blog section has been removed from this site. Visit our Events and Team pages for updates.</p>
        <div className="flex gap-4 justify-center">
          <Link href="/events" className="px-6 py-3 bg-[#4285f4] text-white rounded-full font-semibold">Events</Link>
          <Link href="/team" className="px-6 py-3 bg-gray-100 text-[#1e1e1e] rounded-full font-semibold">Team</Link>
        </div>
      </div>
    </main>
  );
}
