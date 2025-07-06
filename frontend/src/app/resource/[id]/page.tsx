'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { Resource } from '@/types';

export default function ResourceDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { token } = useAuth();

  const [resource, setResource] = useState<Resource | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!token || !id) return;

    const fetchResource = async () => {
      try {
const res = await api.get<Resource>(`/resources/${id}/`);
setResource(res.data);

      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchResource();
  }, [id, token]);

  if (loading) return <div className="p-6 text-center text-gray-500">Loading resource...</div>;
  if (error || !resource) return <div className="p-6 text-center text-red-600">Resource not found or inaccessible.</div>;

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Resource Details</h1>
          <button
            onClick={() => router.push('/dashboard')}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 rounded transition"
          >
            Back to Dashboard
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-medium text-gray-600">Title</p>
            <p className="text-gray-900">{resource.title}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Type</p>
            <p className="text-gray-900">{resource.type}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Category</p>
            <p className="text-gray-900">{resource.category}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Description</p>
            <p className="text-gray-800 whitespace-pre-wrap">{resource.description}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">Status</p>
            {resource.completed ? (
              <span className="inline-block px-3 py-1 text-sm bg-green-100 text-green-700 rounded">Completed</span>
            ) : (
              <span className="inline-block px-3 py-1 text-sm bg-yellow-100 text-yellow-700 rounded">Not Completed</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
