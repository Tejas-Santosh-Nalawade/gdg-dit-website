export default function SponsorUs() {
  return (
    <div className="bg-gradient-to-r from-[#34a853] to-[#4285f4] rounded-2xl p-8 text-white shadow-lg">
      <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
        Sponsor Us
      </h3>
      <p className="mb-6 leading-relaxed opacity-95">
        Partner with GDG-DIT to support the developer community and gain visibility among talented students and professionals.
      </p>
      <a
        href="mailto:contact@gdgdit.com?subject=Sponsorship Inquiry"
        className="inline-block bg-white text-[#4285f4] px-6 py-3 rounded-full font-bold hover:bg-[#f0f0f0] transition-all duration-300 shadow-md hover:shadow-lg"
        style={{ fontFamily: 'Google Sans, sans-serif' }}
      >
        Become a Sponsor
      </a>
    </div>
  );
}
