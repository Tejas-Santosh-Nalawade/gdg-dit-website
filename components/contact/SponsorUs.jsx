export default function SponsorUs() {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-4">
        Sponsor Us
      </h3>
      <p className="mb-6">
        Partner with GDG-DIT to support the developer community and gain visibility among talented students and professionals.
      </p>
      <a
        href="mailto:contact@gdgdit.com?subject=Sponsorship Inquiry"
        className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors"
      >
        Become a Sponsor
      </a>
    </div>
  );
}
