'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 border border-[#1e1e1e]/5">
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
        Send Us a Message
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-[#1e1e1e] mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#1e1e1e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-[#1e1e1e]"
            placeholder="Your name"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-[#1e1e1e] mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#1e1e1e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-[#1e1e1e]"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label htmlFor="subject" className="block text-sm font-semibold text-[#1e1e1e] mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Subject *
          </label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-[#1e1e1e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-[#1e1e1e]"
            placeholder="What is this about?"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-[#1e1e1e] mb-2" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Message *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="5"
            className="w-full px-4 py-3 border border-[#1e1e1e]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-[#1e1e1e] resize-none"
            placeholder="Your message..."
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#4285f4] text-white py-3 rounded-xl font-bold hover:bg-[#3367D6] transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{ fontFamily: 'Google Sans, sans-serif' }}
        >
          Send Message
        </button>
      </form>
    </div>
  );
}
