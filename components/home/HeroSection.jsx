import Link from 'next/link';
import Button from '../common/Button';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-red-500 text-white">
      <div className="container mx-auto px-4 py-24 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Learn, Build, and Grow Together
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Join the Google Developer Groups community at DIT and connect with passionate developers
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href="/join"
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Join Our Community
            </Button>
            <Button
              href="/events"
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
            >
              View Upcoming Events
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
