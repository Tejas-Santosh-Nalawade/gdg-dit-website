'use client';

import { useState } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/blog/SearchBar';
import BlogGrid from '@/components/blog/BlogGrid';
import SectionTitle from '@/components/common/SectionTitle';
import blogsData from '@/data/blogs.json';

const categories = ['All', 'Android', 'Cloud', 'Web Development', 'AI/ML', 'Mobile Development', 'DevOps'];

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPosts = blogsData.posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#fafafa]">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#4285f4] to-[#ea4335] text-white py-20">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-center" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Blog & Resources
          </h1>
          <p className="text-xl text-center max-w-3xl mx-auto opacity-95">
            Insights, tutorials, and event recaps from the GDG-DIT community
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-6 py-3 border-2 border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-[#4285f4] focus:border-transparent text-[#1e1e1e]"
                style={{ fontFamily: 'Google Sans, sans-serif' }}
              />
              <svg
                className="absolute right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#5f6368]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-[#4285f4] text-white shadow-lg scale-105'
                      : 'bg-[#f0f0f0] text-[#5f6368] hover:bg-[#e0e0e0]'
                  }`}
                  style={{ fontFamily: 'Google Sans, sans-serif' }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-gray-100"
              >
                {/* Featured Image */}
                <div className={`bg-gradient-to-r ${post.color} h-48 flex items-center justify-center text-6xl`}>
                  {post.image}
                </div>
                
                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="bg-[#e8f0fe] text-[#4285f4] text-xs font-semibold px-3 py-1 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-3 text-[#1e1e1e]" style={{ fontFamily: 'Google Sans, sans-serif' }}>
                    {post.title}
                  </h2>
                  
                  <p className="text-[#5f6368] text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-[#5f6368] mb-4">
                    <span>By {post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-[#4285f4] hover:text-[#3367D6] font-semibold text-sm flex items-center gap-2"
                  >
                    Read More →
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#5f6368] text-lg">
                No articles found matching your criteria.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-20 bg-gradient-to-r from-[#f9ab00] to-[#34a853] text-white">
        <div className="container mx-auto px-6 md:px-8 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Google Sans, sans-serif' }}>
            Stay Updated
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-95">
            Join our community to get notified about new articles, events, and resources
          </p>
          <Link
            href="/join"
            className="inline-block bg-white text-[#f9ab00] px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
            style={{ fontFamily: 'Google Sans, sans-serif' }}
          >
            Join Community
          </Link>
        </div>
      </section>
    </main>
  );
}
