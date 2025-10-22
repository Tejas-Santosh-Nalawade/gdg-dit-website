import Link from 'next/link';
import Card from '../common/Card';

export default function BlogCard({ post }) {
  return (
    <Card>
      {/* Featured Image */}
      <div className={`bg-gradient-to-r ${post.color} h-48 flex items-center justify-center text-6xl`}>
        {post.image}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{
            backgroundColor: '#c3ecf6',
            color: '#4285f4'
          }}>
            {post.category}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-3" style={{ color: '#1e1e1e' }}>
          {post.title}
        </h2>
        
        <p className="text-sm mb-4 line-clamp-3" style={{ color: '#5f6368' }}>
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm mb-4" style={{ color: '#5f6368' }}>
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        
        <Link
          href={`/blog/${post.slug}`}
          className="font-semibold text-sm flex items-center gap-2 hover:opacity-80 transition-opacity"
          style={{ color: '#4285f4' }}
        >
          Read More →
        </Link>
      </div>
    </Card>
  );
}
