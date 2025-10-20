import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: "Blog & Tech Articles",
  description: "Read technical articles, tutorials, and insights on Android Development, Cloud Computing, React, Machine Learning, Flutter, DevOps & more. Learn from GDG-DIT community experts.",
  keywords: [
    "Tech Blog Pune",
    "Android Development Tutorial",
    "Cloud Computing Guide",
    "React Best Practices",
    "Machine Learning Tutorial",
    "Flutter vs React Native",
    "DevOps CI/CD",
    "Web Development Blog",
    "Programming Articles",
    "Tech Learning Resources"
  ],
  path: "/blog"
});

export default function BlogLayout({ children }) {
  return children;
}
