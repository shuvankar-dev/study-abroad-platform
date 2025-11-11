import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  h1_section?: string;
  h2_section?: string;
  image_url: string;
  created_at: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/blog/fetch_published.php`);
        const data = await response.json();

        if (data.success) {
          setBlogs(data.data);
        } else {
          setError(data.message || 'Failed to fetch blogs');
        }
      } catch (err) {
        setError('An error occurred while fetching blogs.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '/src/assets/blog image/default.png';
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${API_BASE}/${imagePath}`;
  };

  // Create URL-friendly slug from title
  const createSlug = (title: string): string => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  // Generate blog URL with slug
  const getBlogUrl = (blog: Blog): string => {
    const slug = createSlug(blog.title);
    return `/blog/${slug}`;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                Error: {error}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover insights, tips, and expert advice to help you navigate your study abroad journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
              {/* Blog Image */}
              <Link to={getBlogUrl(blog)} className="block relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(blog.image_url)}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/blog image/default.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </Link>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Information - Only Read Time */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>

                {/* Title - Clickable */}
                <Link to={getBlogUrl(blog)}>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors cursor-pointer">
                    {blog.title}
                  </h2>
                </Link>

                {/* H1 Section - Clickable */}
                {blog.h1_section && (
                  <Link to={getBlogUrl(blog)}>
                    <p className="text-gray-700 mb-2 line-clamp-2 text-sm hover:text-gray-900 cursor-pointer transition-colors">
                      {blog.h1_section}
                    </p>
                  </Link>
                )}

                {/* H2 Section */}
                {blog.h2_section && (
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {blog.h2_section}
                  </p>
                )}

                {/* Action Button - UPDATED: Full width button, author removed */}
                <div className="pt-4 border-t border-gray-100">
                  <Link
                    to={getBlogUrl(blog)}
                    className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Read Full Blog
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {blogs.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts available</h3>
              <p className="text-gray-600">Check back soon for new content!</p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;
