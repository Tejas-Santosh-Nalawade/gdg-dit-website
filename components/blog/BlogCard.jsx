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
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        
        <h2 className="text-xl font-bold mb-3 text-gray-800">
          {post.title}
        </h2>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>By {post.author}</span>
          <span>{post.date}</span>
        </div>
        
        <Link
          href={`/blog/${post.slug}`}
          className="text-blue-600 hover:text-blue-800 font-semibold text-sm flex items-center gap-2"
        >
          Read More →
        </Link>
      </div>
    </Card>
  );
}
