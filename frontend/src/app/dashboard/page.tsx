'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api';
import { useAuth } from '@/lib/AuthContext';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ResourceCard from '@/components/ResourceCard';
import { Resource } from '@/types';

export default function DashboardPage() {
  const { token, logout } = useAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!token) {
      router.push('/login');
    }
  }, [token, router]);

  const { data = [], isLoading, isError } = useQuery<Resource[]>({
    queryKey: ['resources'],
    queryFn: async () => {
      const res = await api.get<Resource[]>('/resources/');
      return res.data;
    },
    enabled: !!token,
  });

const markComplete = useMutation({
  mutationFn: async (id: number) => {
    await api.post(`/resources/${id}/mark-complete/`, {
      time_spent: 30,
      completion_date: new Date().toISOString(),
    });
    return id;
  },
  onSuccess: (id) => {
    // Update the cached resource list manually
    queryClient.setQueryData<Resource[]>(['resources'], (old = []) =>
      old.map((res) =>
        res.id === id ? { ...res, completed: true } : res
      )
    );
  },
});

  const goToAddPage = () => router.push('/add-resource');
  const goToSummary = () => router.push('/summary');

  if (!token) return null;
  if (isLoading) return <div className="p-6 text-center text-gray-500">Loading your resources...</div>;
  if (isError) return <div className="p-6 text-red-600">Error fetching resources. Please try again later.</div>;

  return (
    <main className="min-h-screen bg-white p-6 max-w-6xl mx-auto">
<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
  <h1 className="text-3xl font-semibold tracking-tight text-gray-800">📚 Your Learning Dashboard</h1>

  <div className="flex flex-wrap gap-3">
    <button
      onClick={goToAddPage}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200"
    >
      Add Resource
    </button>

    <button
      onClick={goToSummary}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-medium shadow hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 transition-all duration-200"
    >
      Summary
    </button>

    <button
      onClick={logout}
      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 transition-all duration-200"
    >
      Logout
    </button>
  </div>
</div>

      {data.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No resources yet. Start by adding one!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              onMarkComplete={(id) => markComplete.mutate(id)}
            />
          ))}
        </div>
            )}
          </main>
        );
      }