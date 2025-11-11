import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Mail, FileText, ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Author {
  id: number;
  name: string;
  email: string;
  bio: string;
  profile_picture?: string;
  created_at: string;
}

interface Blog {
  id: number;
  title: string;
  author: string;
  created_at: string;
  image_url: string;
  h1_section?: string;
}

const AuthorDetail = () => {
  const { name } = useParams<{ name: string }>(); // Get author name from URL
  const [author, setAuthor] = useState<Author | null>(null);
  const [authorBlogs, setAuthorBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  useEffect(() => {
    const fetchAuthorData = async () => {
      if (!name) return;
      
      try {
        // Decode URL-encoded name (e.g., "John%20Doe" -> "John Doe")
        const decodedName = decodeURIComponent(name);
        
        // Fetch all authors
        const authorsResponse = await fetch(`${API_BASE}/api/authors/list.php`);
        const authorsData = await authorsResponse.json();

        if (authorsData.success) {
          const foundAuthor = authorsData.data.find((a: Author) => a.name === decodedName);
          
          if (foundAuthor) {
            setAuthor(foundAuthor);

            // Fetch all published blogs
            const blogsResponse = await fetch(`${API_BASE}/api/blog/fetch_published.php`);
            const blogsData = await blogsResponse.json();

            if (blogsData.success) {
              // Filter blogs by this author
              const filteredBlogs = blogsData.data.filter((blog: Blog) => blog.author === decodedName);
              setAuthorBlogs(filteredBlogs);
            }
          } else {
            setError('Author not found');
          }
        } else {
          setError('Failed to fetch author details');
        }
      } catch (err) {
        setError('An error occurred while fetching author details.');
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorData();
  }, [name, API_BASE]);

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

  const copyEmail = () => {
    if (author?.email) {
      navigator.clipboard?.writeText(author.email);
      alert('Email copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading author profile...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !author) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Error: {error || 'Author not found'}
              </div>
              <Link to="/blog" className="inline-block text-blue-600 hover:underline">
                Back to Blogs
              </Link>
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
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Back Link */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Blogs
        </Link>

        {/* Author Header Card */}
        <div className="bg-gradient-to-r from-purple-600 to-orange-500 rounded-2xl shadow-xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="w-32 h-32 rounded-full ring-4 ring-white overflow-hidden bg-white shadow-lg flex-shrink-0">
              {author.profile_picture ? (
                <img 
                  src={getImageUrl(author.profile_picture)} 
                  alt={author.name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-blue-700 bg-gradient-to-br from-white to-blue-50">
                  {author.name.charAt(0).toUpperCase()}
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="flex-1 text-white text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
              <p className="text-lg opacity-90 mb-3">Author • Study Abroad Expert</p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Member since {formatDate(author.created_at)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  <span>{authorBlogs.length} {authorBlogs.length === 1 ? 'Post' : 'Posts'}</span>
                </div>
              </div>

              {/* Email */}
              <div className="mt-4 flex gap-3 justify-center md:justify-start">
                <button
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors shadow"
                >
                  <Mail className="h-4 w-4" />
                  Copy Email
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Biography */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About {author.name}</h2>
              <div className="prose max-w-none text-gray-700 leading-relaxed">
                {author.bio ? (
                  <p>{author.bio}</p>
                ) : (
                  <p className="text-gray-400 italic">No biography available.</p>
                )}
              </div>
            </div>

            {/* Author's Blog Posts */}
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Posts by {author.name} ({authorBlogs.length})
              </h2>
              
              {authorBlogs.length === 0 ? (
                <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600">No blog posts yet.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {authorBlogs.map((blog) => (
                    <Link 
                      key={blog.id} 
                      to={`/blog/${blog.id}`}
                      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                    >
                      {blog.image_url && (
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={getImageUrl(blog.image_url)}
                            alt={blog.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/src/assets/blog image/default.png';
                            }}
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {blog.title}
                        </h3>
                        {blog.h1_section && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                            {blog.h1_section}
                          </p>
                        )}
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Calendar className="h-3 w-3" />
                          {formatDate(blog.created_at)}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar - Contact & Stats */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Email Address</div>
                  <div className="font-medium text-gray-800 break-words text-sm">
                    {author.email}
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Expertise</div>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Study Abroad
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      University Admissions
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Visa Guidance
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 mb-2">Statistics</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">{authorBlogs.length}</div>
                      <div className="text-xs text-gray-600">Posts</div>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-3 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.floor((Date.now() - new Date(author.created_at).getTime()) / (1000 * 60 * 60 * 24 * 30))}
                      </div>
                      <div className="text-xs text-gray-600">Months</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AuthorDetail;
