import { useEffect, useState } from 'react';
import { Calendar, User, Clock, X } from 'lucide-react';
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

interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
  profile_picture?: string;
  created_at: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null);

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

  const fetchAuthorDetails = async (authorName: string) => {
    try {
      const response = await fetch(`${API_BASE}/api/authors/list.php`);
      const data = await response.json();
      
      if (data.success) {
        const author = data.data.find((a: Author) => a.name === authorName);
        if (author) {
          setSelectedAuthor(author);
        }
      }
    } catch (err) {
      console.error('Failed to fetch author details:', err);
    }
  };

  const getImageUrl = (imagePath?: string): string => {
    if (!imagePath) return '/src/assets/blog image/default.png';
    return imagePath.startsWith('http') 
      ? imagePath 
      : `${API_BASE}/${imagePath}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Ensure modal content starts at top when opened
  useEffect(() => {
    if (selectedBlog) {
      // Scroll window to top so modal is visible
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      // Also reset modal inner scroll after render
      setTimeout(() => {
        const el = document.querySelector('.full-blog-modal');
        if (el) el.scrollTop = 0;
      }, 50);
    }
  }, [selectedBlog]);

  useEffect(() => {
    if (selectedAuthor) {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      setTimeout(() => {
        const el = document.querySelector('.author-modal');
        if (el) el.scrollTop = 0;
      }, 50);
    }
  }, [selectedAuthor]);

  // Disable background scroll while any modal is open
  useEffect(() => {
    const modalOpen = !!selectedBlog || !!selectedAuthor;
    const prev = document.body.style.overflow;
    if (modalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = prev || '';
    }
    return () => { document.body.style.overflow = prev || ''; };
  }, [selectedBlog, selectedAuthor]);

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
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getImageUrl(blog.image_url)}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/blog image/default.png';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Information */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(blog.created_at)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>5 min read</span>
                  </div>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {blog.title}
                </h2>

                {/* H1 Section */}
                {blog.h1_section && (
                  <p className="text-gray-700 mb-2 line-clamp-2 text-sm">
                    {blog.h1_section}
                  </p>
                )}

                {/* H2 Section */}
                {blog.h2_section && (
                  <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                    {blog.h2_section}
                  </p>
                )}

                {/* Author and Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <button
                    onClick={() => fetchAuthorDetails(blog.author)}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>By {blog.author}</span>
                  </button>
                  
                  <button
                    onClick={() => setSelectedBlog(blog)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Read Full Blog
                  </button>
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

      {/* Full Blog Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 pr-8">
                {selectedBlog.title}
              </h3>
              <button
                onClick={() => setSelectedBlog(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] full-blog-modal">
              {/* Blog Image */}
              <div className="relative h-64 md:h-80">
                <img
                  src={getImageUrl(selectedBlog.image_url)}
                  alt={selectedBlog.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/blog image/default.png';
                  }}
                />
              </div>

              {/* Blog Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(selectedBlog.created_at)}</span>
                  </div>
                  <button
                    onClick={() => fetchAuthorDetails(selectedBlog.author)}
                    className="flex items-center gap-1 hover:text-blue-600 transition-colors"
                  >
                    <User className="h-4 w-4" />
                    <span>By {selectedBlog.author}</span>
                  </button>
                </div>

                {/* H1 Section */}
                {selectedBlog.h1_section && (
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {selectedBlog.h1_section}
                    </h2>
                  </div>
                )}

                {/* H2 Section */}
                {selectedBlog.h2_section && (
                  <div className="mb-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-3">
                      {selectedBlog.h2_section}
                    </h3>
                  </div>
                )}

                {/* Full Content */}
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {selectedBlog.content}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Author Profile Modal */}
      {selectedAuthor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden author-modal">
            {/* Header with gradient */}
            <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 pt-8 pb-6 px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div>
                    <div className="w-28 h-28 rounded-full ring-4 ring-white overflow-hidden bg-white shadow-lg">
                      {selectedAuthor.profile_picture ? (
                        <img src={getImageUrl(selectedAuthor.profile_picture)} alt={selectedAuthor.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl font-bold text-blue-700 bg-gradient-to-br from-white/20 to-white/10">
                          {selectedAuthor.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-white">
                    <h3 className="text-2xl font-bold">{selectedAuthor.name}</h3>
                    <p className="text-sm opacity-90 mt-1">Author • Study Abroad Expert</p>
                    <div className="text-xs opacity-80 mt-2">Member since {formatDate(selectedAuthor.created_at)}</div>
                  </div>
                </div>
                <div>
                  <button onClick={() => setSelectedAuthor(null)} className="text-white/90 hover:text-white">
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: Bio + Contact */}
              <div className="md:col-span-2">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">About {selectedAuthor.name}</h4>
                <div className="prose max-w-none text-gray-700 mb-4">
                  {selectedAuthor.bio ? selectedAuthor.bio : <span className="text-gray-400">No bio available.</span>}
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <button
                    onClick={() => navigator.clipboard?.writeText(selectedAuthor.email)}
                    className="inline-flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-50 shadow"
                  >
                    Copy Email
                  </button>
                </div>
              </div>

              {/* Right: Quick stats & recent posts */}
              <aside className="bg-gray-50 p-4 rounded-lg">
                <div className="mb-4">
                  <div className="text-xs text-gray-500">Contact</div>
                  <div className="font-medium text-gray-800 break-words">{selectedAuthor.email}</div>
                </div>

                <div className="mb-4">
                  <div className="text-xs text-gray-500">Latest Posts</div>
                  <div className="mt-2 space-y-2">
                    {blogs.filter(b => b.author === selectedAuthor.name).slice(0,4).map(b => (
                      <button key={b.id} onClick={() => { setSelectedAuthor(null); setSelectedBlog(b); }} className="text-left w-full hover:text-blue-600 text-sm text-gray-700">
                        • {b.title}
                      </button>
                    ))}
                    {blogs.filter(b => b.author === selectedAuthor.name).length === 0 && (
                      <div className="text-sm text-gray-400">No posts yet</div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="text-xs text-gray-500">Profile</div>
                  <div className="mt-2 text-sm text-gray-700">Expert in student mobility, university admissions and visa guidance.</div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BlogPage;