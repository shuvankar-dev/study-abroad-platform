import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
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

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = window.location.hostname === 'localhost'
    ? 'http://localhost/studyabroadplatform-api'
    : '/studyabroadplatform-api';

  // NEW: Update page meta tags when blog loads
  useEffect(() => {
    if (blog) {
      // Update page title (browser tab)
      document.title = `${blog.title} - Codescholar Overseas`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      const description = blog.h1_section || blog.content.replace(/<[^>]*>/g, '').substring(0, 160);
      
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = description;
        document.head.appendChild(meta);
      }

      // Update Open Graph tags (for Facebook, LinkedIn)
      updateMetaTag('og:title', blog.title);
      updateMetaTag('og:description', description);
      updateMetaTag('og:image', getImageUrl(blog.image_url));
      updateMetaTag('og:url', window.location.href);
      updateMetaTag('og:type', 'article');

      // Update Twitter Card tags
      updateMetaTag('twitter:card', 'summary_large_image');
      updateMetaTag('twitter:title', blog.title);
      updateMetaTag('twitter:description', description);
      updateMetaTag('twitter:image', getImageUrl(blog.image_url));
    }

    // Cleanup: Reset title when component unmounts
    return () => {
      document.title = 'Codescholar Overseas';
    };
  }, [blog]);

  // Helper function to update meta tags
  const updateMetaTag = (property: string, content: string) => {
    let metaTag = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement;
    
    if (!metaTag) {
      metaTag = document.querySelector(`meta[name="${property}"]`) as HTMLMetaElement;
    }
    
    if (metaTag) {
      metaTag.content = content;
    } else {
      const meta = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        meta.setAttribute('property', property);
      } else {
        meta.setAttribute('name', property);
      }
      meta.content = content;
      document.head.appendChild(meta);
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      if (!slug) return;
      
      try {
        const titleFromSlug = slug
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const response = await fetch(`${API_BASE}/api/blog/fetch_published.php`);
        const data = await response.json();

        if (data.success) {
          const foundBlog = data.data.find((b: Blog) => 
            b.title.toLowerCase() === titleFromSlug.toLowerCase() ||
            b.title.toLowerCase().replace(/[^a-z0-9]+/g, '-') === slug.toLowerCase()
          );

          if (foundBlog) {
            setBlog(foundBlog);
          } else {
            setError('Blog not found');
          }
        } else {
          setError(data.message || 'Failed to fetch blog');
        }
      } catch (err) {
        setError('An error occurred while fetching the blog.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug, API_BASE]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading blog...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                Error: {error || 'Blog not found'}
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
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="relative h-64 md:h-80 mb-8 rounded-xl overflow-hidden">
          <img
            src={getImageUrl(blog.image_url)}
            alt={blog.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/src/assets/blog image/default.png';
            }}
          />
        </div>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(blog.created_at)}</span>
            </div>
            <Link 
              to={`/author/${encodeURIComponent(blog.author)}`}
              className="flex items-center gap-1 hover:text-blue-600 transition-colors"
            >
              <User className="h-4 w-4" />
              <span>By {blog.author}</span>
            </Link>
          </div>
        </div>

        {blog.h1_section && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{blog.h1_section}</h2>
          </div>
        )}

        {blog.h2_section && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">{blog.h2_section}</h3>
          </div>
        )}

        <div className="prose prose-lg max-w-none mb-12">
          <div 
            className="text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← Back to Blogs
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogDetail;
