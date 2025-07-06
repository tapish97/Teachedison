'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';

const resourceTypes = ['Article', 'Video', 'Quiz'];

export default function AddResourcePage() {
  const { token, logout } = useAuth();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [type, setType] = useState(resourceTypes[0]);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!token) router.push('/login');
  }, [token, router]);

  const resetForm = () => {
    setTitle('');
    setType(resourceTypes[0]);
    setCategory('');
    setDescription('');
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/resources/', {
        title,
        type,
        category_name: category,
        description,
      });
      setSuccess(true);
    } catch {
      alert('Failed to add resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Add New Resource</h1>
          <div className="flex gap-3">
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 rounded transition"
            >
              Back to Dashboard
            </button>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-sm text-white rounded transition"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Success Message */}
        {success ? (
          <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded mb-6">
            Resource added successfully.
            <div className="mt-4 flex gap-4">
              <button
                className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded text-sm"
                onClick={resetForm}
              >
                Add Another
              </button>
              <button
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded text-sm"
                onClick={() => router.push('/dashboard')}
              >
                Go to Dashboard
              </button>
            </div>
          </div>
        ) : (
          // Resource Form
          <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-lg shadow">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              >
                {resourceTypes.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                required
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-800"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Add Resource'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
