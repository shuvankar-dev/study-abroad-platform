import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Edit, Trash2, Calendar, User, FileText, Search, Filter } from 'lucide-react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api';

type Author = {
  id: number;
  name: string;
  email: string;
};

type BlogPost = {
  id: number;
  title: string;
  h1_section: string;
  h2_section: string;
  content: string;
  author_id: number;
  author_name: string;
  author_email: string;
  featured_image: string;
  status: 'draft' | 'published';
  created_at: string;
  updated_at: string;
};

export default function AdminBlog() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState<'url' | 'file'>('url');
  const [modalError, setModalError] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    h1_section: '',
    h2_section: '',
    content: '',
    author_id: '',
    featured_image: '',
    status: 'draft' as 'draft' | 'published'
  });

  // React Quill toolbar configuration
  const quillModules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, 4, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      [{ 'align': [] }],
      ['link', 'blockquote', 'code-block'],
      [{ 'color': [] }, { 'background': [] }],
      ['clean']
    ],
  }), []);

  const quillFormats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'indent',
    'align',
    'link', 'blockquote', 'code-block',
    'color', 'background'
  ];

  useEffect(() => {
    fetchPosts();
    fetchAuthors();
  }, [searchTerm, statusFilter]);

  const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('search', searchTerm);
      if (statusFilter) params.append('status', statusFilter);
      
      const res = await fetch(`${API_BASE}/api/blog/list.php?${params}`);
      
      if (res.ok) {
        const data = await res.json();
        if (data?.success) {
          setPosts(data.data || []);
        } else {
          setError(data?.message || 'Failed to fetch blog posts');
        }
      } else {
        setError('Failed to fetch blog posts');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/authors/list.php`);
      if (res.ok) {
        const data = await res.json();
        if (data?.success) {
          setAuthors(data.data || []);
        }
      }
    } catch (err) {
      console.error('Failed to fetch authors:', err);
    }
  };

  const handleFileSelect = (file: File | null) => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/png'];
      if (!allowedTypes.includes(file.type)) {
        setModalError('Only JPG and PNG files are allowed');
        setSelectedFile(null);
        return;
      }
      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        setModalError('File size must be less than 5MB');
        setSelectedFile(null);
        return;
      }
      setModalError(null);
      setSelectedFile(file);
      setFilePreview(URL.createObjectURL(file));
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setModalError(null);

    // Validation
    if (!formData.title.trim()) {
      setModalError('Title is required');
      setSaving(false);
      return;
    }
    if (!formData.content.trim() || formData.content === '<p><br></p>') {
      setModalError('Content is required');
      setSaving(false);
      return;
    }
    if (!formData.author_id) {
      setModalError('Please select an author');
      setSaving(false);
      return;
    }

    try {
      const url = editingPost 
        ? `${API_BASE}/api/blog/update.php`
        : `${API_BASE}/api/blog/create.php`;
      
      let response;

      // If user selected a new file to upload, use FormData (multipart)
      if (uploadType === 'file' && selectedFile) {
        const formDataToSend = new FormData();
        formDataToSend.append('title', formData.title);
        formDataToSend.append('h1_section', formData.h1_section);
        formDataToSend.append('h2_section', formData.h2_section);
        formDataToSend.append('content', formData.content);
        formDataToSend.append('author_id', formData.author_id);
        formDataToSend.append('status', formData.status);
        formDataToSend.append('featured_image', selectedFile);
        
        if (editingPost) {
          formDataToSend.append('id', editingPost.id.toString());
        }

        response = await fetch(url, {
          method: 'POST',
          body: formDataToSend
        });
      } else {
        // Send as JSON — no file upload
        const payload: any = {
          title: formData.title,
          h1_section: formData.h1_section,
          h2_section: formData.h2_section,
          content: formData.content,
          author_id: parseInt(formData.author_id),
          status: formData.status,
          featured_image: formData.featured_image
        };

        if (editingPost) {
          payload.id = editingPost.id;
        }

        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      // Handle non-JSON responses (server errors like 413, 500)
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const text = await response.text();
        console.error('Server returned non-JSON response:', text.substring(0, 500));
        setModalError('Server error. Please try again or use a smaller image.');
        return;
      }

      const data = await response.json();
      
      if (response.ok && data?.success) {
        await fetchPosts();
        closeModal();
      } else {
        setModalError(data?.message || 'Operation failed. Please try again.');
      }
    } catch (err: any) {
      console.error('Save error:', err);
      setModalError(err.message || 'Failed to save. Please check your connection.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title || '',
      h1_section: post.h1_section || '',
      h2_section: post.h2_section || '',
      content: post.content || '',
      author_id: post.author_id ? post.author_id.toString() : '',
      featured_image: post.featured_image || '',
      status: post.status || 'draft'
    });
    setSelectedFile(null);
    setUploadType('url');
    setModalError(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/blog/delete.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      });

      const data = await res.json();
      
      if (res.ok && data?.success) {
        await fetchPosts();
      } else {
        setError(data?.message || 'Failed to delete post');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to delete post');
    } finally {
      setLoading(false);
    }
  };

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      h1_section: '',
      h2_section: '',
      content: '',
      author_id: '',
      featured_image: '',
      status: 'draft'
    });
    setSelectedFile(null);
    setUploadType('url');
    setModalError(null);
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (filePreview) {
      URL.revokeObjectURL(filePreview);
      setFilePreview(null);
    }
    setIsModalOpen(false);
    setEditingPost(null);
    setSelectedFile(null);
    setUploadType('url');
    setModalError(null);
    setFormData({
      title: '',
      h1_section: '',
      h2_section: '',
      content: '',
      author_id: '',
      featured_image: '',
      status: 'draft'
    });
  };

  const logout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login', { replace: true });
  };

  const getImageUrl = (imagePath?: string): string | undefined => {
    if (!imagePath) return undefined;
    if (imagePath.startsWith('http')) return imagePath;
    // Images stored at DOCUMENT_ROOT/uploads/blog/ — serve from domain root
    const base = window.location.hostname === 'localhost' ? 'http://localhost' : '';
    return `${base}/${imagePath}`;
  };

  if (loading && posts.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">Loading blog posts...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Blog Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">info@codescholaroverseas.com</span>
            <button onClick={logout} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg">
            {error}
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="mb-6 bg-white rounded-lg shadow p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium"
            >
              <Plus className="h-4 w-4" />
              Add Blog Post
            </button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Blog Posts ({posts.length})
          </h2>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No blog posts yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first blog post.</p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium"
            >
              Add First Blog Post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                {post.featured_image && (
                  <img
                    src={getImageUrl(post.featured_image)}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                )}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <User className="h-3 w-3" />
                        {post.author_name}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          post.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {post.status === 'published' ? 'Published' : 'Draft'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Edit"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                        title="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  {post.h1_section && (
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{post.h1_section}</p>
                  )}
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {post.content.replace(/<[^>]*>/g, '').substring(0, 100)}...
                  </p>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Created: {new Date(post.created_at).toLocaleDateString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10">
              <h3 className="text-lg font-semibold">
                {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {modalError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                  {modalError}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title *
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      H1 Section
                    </label>
                    <textarea
                      value={formData.h1_section}
                      onChange={(e) => setFormData({ ...formData, h1_section: e.target.value })}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Main heading content..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      H2 Section
                    </label>
                    <textarea
                      value={formData.h2_section}
                      onChange={(e) => setFormData({ ...formData, h2_section: e.target.value })}
                      rows={2}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Sub-heading content..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Author *
                    </label>
                    <select
                      value={formData.author_id}
                      onChange={(e) => setFormData({ ...formData, author_id: e.target.value })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select an author</option>
                      {authors.map((author) => (
                        <option key={author.id} value={author.id}>
                          {author.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Featured Image
                    </label>

                    {/* Current image preview */}
                    {(formData.featured_image || filePreview) && (
                      <div className="mb-3 relative inline-block">
                        <img
                          src={filePreview || getImageUrl(formData.featured_image)}
                          alt="Featured preview"
                          className="h-24 w-full object-cover rounded-lg border border-gray-200"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({ ...formData, featured_image: '' });
                            setSelectedFile(null);
                            if (filePreview) {
                              URL.revokeObjectURL(filePreview);
                              setFilePreview(null);
                            }
                          }}
                          className="absolute top-1 right-1 bg-red-600 text-white text-xs px-2 py-0.5 rounded hover:bg-red-700"
                        >
                          ✕ Clear
                        </button>
                        {formData.featured_image && !filePreview && (
                          <p className="text-xs text-gray-500 mt-1 truncate">{formData.featured_image}</p>
                        )}
                        {selectedFile && (
                          <p className="text-xs text-green-600 mt-1">
                            ✓ New: {selectedFile.name} ({(selectedFile.size / 1024 / 1024).toFixed(2)} MB)
                          </p>
                        )}
                      </div>
                    )}
                    
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setUploadType('url')}
                        className={`px-3 py-1 text-sm rounded ${
                          uploadType === 'url' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        URL Link
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadType('file')}
                        className={`px-3 py-1 text-sm rounded ${
                          uploadType === 'file' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        Upload File
                      </button>
                    </div>

                    {uploadType === 'url' ? (
                      <input
                        type="text"
                        value={formData.featured_image}
                        onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="https://example.com/image.jpg or uploads/blog/filename.png"
                      />
                    ) : (
                      <div>
                        <input
                          type="file"
                          accept="image/jpeg,image/png"
                          onChange={(e) => handleFileSelect(e.target.files?.[0] || null)}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Accepted formats: JPG, PNG (Max 5MB)
                        </p>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Status *
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                    </select>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-medium text-gray-700 mb-2">Publishing Info</h4>
                    <p className="text-sm text-gray-600">
                      • <strong>Draft:</strong> Only visible in admin panel<br/>
                      • <strong>Published:</strong> Visible to website visitors
                    </p>
                  </div>
                </div>
              </div>
              
              {/* React Quill Rich Text Editor for Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content * <span className="text-xs text-gray-500">(Use toolbar for formatting)</span>
                </label>
                <div style={{ minHeight: '350px' }}>
                  <ReactQuill
                    theme="snow"
                    value={formData.content}
                    onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                    modules={quillModules}
                    formats={quillFormats}
                    placeholder="Write your blog post content here..."
                    style={{ height: '300px', marginBottom: '42px' }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-3 pt-4 border-t mt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
                >
                  {saving 
                    ? (uploadType === 'file' && selectedFile ? 'Uploading Image...' : 'Saving...') 
                    : (editingPost ? 'Update Post' : 'Create Post')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
