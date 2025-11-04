import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, User, Mail, Calendar } from 'lucide-react';

const API_BASE = window.location.hostname === 'localhost'
  ? 'http://localhost/studyabroadplatform-api'
  : '/studyabroadplatform-api'

type Author = {
  id: number
  name: string
  email: string
  bio: string
  profile_picture?: string
  created_at: string
  updated_at: string
}

export default function AdminAuthors() {
  const navigate = useNavigate()
  const [authors, setAuthors] = useState<Author[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bio: '',
    profile_picture: ''
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadType, setUploadType] = useState('url'); // 'url' or 'file'

  const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null
  const user = typeof window !== 'undefined' ? localStorage.getItem('admin_user') : null

  useEffect(() => {
    if (!token) {
      navigate('/admin/login', { replace: true })
      return
    }
    fetchAuthors()
  }, [token, navigate])

  const fetchAuthors = async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${API_BASE}/api/authors/list.php`)
      
      if (res.ok) {
        const data = await res.json()
        if (data?.success) {
          setAuthors(data.data || data.authors || [])
        } else {
          setError(data?.message || 'Failed to fetch authors')
        }
      } else {
        setError('Failed to fetch authors')
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load authors')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = editingAuthor 
        ? `${API_BASE}/api/authors/update.php`
        : `${API_BASE}/api/authors/create.php`
      
      let response;

      if (uploadType === 'file' && selectedFile) {
        // Handle file upload
        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('email', formData.email);
        formDataToSend.append('bio', formData.bio);
        formDataToSend.append('profile_image', selectedFile);
        
        if (editingAuthor) {
          formDataToSend.append('id', editingAuthor.id.toString());
        }

        response = await fetch(url, {
          method: 'POST',
          body: formDataToSend
        });
      } else {
        // Handle URL or no image
        const payload = editingAuthor 
          ? { ...formData, id: editingAuthor.id }
          : formData

        response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json()
      
      if (response.ok && data?.success) {
        await fetchAuthors()
        setIsModalOpen(false)
        setEditingAuthor(null)
        setFormData({ name: '', email: '', bio: '', profile_picture: '' })
        setSelectedFile(null)
        setUploadType('url')
      } else {
        setError(data?.message || 'Operation failed')
      }
    } catch (err: any) {
      setError(err.message || 'Operation failed')
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (author: Author) => {
    setEditingAuthor(author)
    setFormData({
      name: author.name,
      email: author.email,
      bio: author.bio,
      profile_picture: author.profile_picture || ''
    })
    setSelectedFile(null)
    setUploadType('url')
    setIsModalOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author?')) return

    setLoading(true)
    try {
      const res = await fetch(`${API_BASE}/api/authors/delete.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id })
      })

      const data = await res.json()
      
      if (res.ok && data?.success) {
        await fetchAuthors()
      } else {
        setError(data?.message || 'Delete failed')
      }
    } catch (err: any) {
      setError(err.message || 'Delete failed')
    } finally {
      setLoading(false)
    }
  }

  const openAddModal = () => {
    setEditingAuthor(null)
    setFormData({ name: '', email: '', bio: '', profile_picture: '' })
    setSelectedFile(null)
    setUploadType('url')
    setIsModalOpen(true)
  }

  const logout = () => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    navigate('/admin/login', { replace: true })
  }

  if (loading && authors.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg font-semibold">Loading authors...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/admin')}
              className="text-blue-600 hover:text-blue-800 text-sm"
            >
              ← Back to Dashboard
            </button>
            <h1 className="text-xl font-semibold text-gray-900">Authors Management</h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 hidden sm:block">
              {user ? JSON.parse(user).email : ''}
            </span>
            <button onClick={logout} className="text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-md">
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md p-3">
            {error}
          </div>
        )}

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <User className="h-6 w-6 text-gray-600" />
            <h2 className="text-2xl font-semibold text-gray-900">Authors ({authors.length})</h2>
          </div>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Author
          </button>
        </div>

        {authors.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No authors yet</h3>
            <p className="text-gray-600 mb-4">Start by adding your first author.</p>
            <button
              onClick={openAddModal}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Add First Author
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {authors.map((author) => (
              <div key={author.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      {author.profile_picture ? (
                        <img
                          src={author.profile_picture.startsWith('http') 
                            ? author.profile_picture 
                            : `http://localhost/studyabroadplatform-api/${author.profile_picture}`
                          }
                          alt={author.name}
                          className="w-12 h-12 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const next = e.currentTarget.nextElementSibling as HTMLElement | null;
                            if (next) next.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-6 w-6 text-gray-500" />
                        </div>
                      )}
                      <div>
                        <h3 className="font-semibold text-gray-900">{author.name}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {author.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(author)}
                        className="text-blue-600 hover:text-blue-800 p-1"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(author.id)}
                        className="text-red-600 hover:text-red-800 p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">{author.bio}</p>
                  
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    Created: {new Date(author.created_at).toLocaleDateString()}
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
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-lg font-semibold">
                {editingAuthor ? 'Edit Author' : 'Add New Author'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Author's bio and background..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Picture
                </label>
                
                {/* Toggle between URL and File Upload */}
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
                    type="url"
                    value={formData.profile_picture}
                    onChange={(e) => setFormData({ ...formData, profile_picture: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                ) : (
                  <div>
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: JPG, PNG (Max 5MB)
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium disabled:opacity-50"
                >
                  {loading ? 'Saving...' : (editingAuthor ? 'Update Author' : 'Add Author')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
  )
}