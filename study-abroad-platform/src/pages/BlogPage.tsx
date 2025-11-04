import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

interface Blog {
  id: number;
  title: string;
  author: string;
  content: string;
  image_url: string;
}

const BlogPage = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch('/api/blog/fetch_published.php');
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

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Our Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-white rounded-lg shadow-md p-6">
              <img
                src={blog.image_url || '/src/assets/blog image/default.png'}
                alt={blog.title}
                className="w-full h-40 object-cover rounded-md mb-4"
                style={{ aspectRatio: '1 / 1' }}
              />
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-500 mb-4">By {blog.author}</p>
              <p className="text-gray-700 mb-4">{blog.content}</p>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => window.scrollTo(0, 0)}
              >
                Read Full Blog
              </button>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPage;