'use client';

import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SummaryItem {
  category__name: string;
  total: number;
  completed: number;
  time_spent: number;
}

export default function SummaryPage() {
  const { data = [], isLoading, isError } = useQuery<SummaryItem[], Error>({
    queryKey: ['summary'],
    queryFn: async () => {
      const res = await api.get<SummaryItem[]>('/resources/summary/');
      return res.data;
    },
  });

  const router = useRouter();
  const [sortBy, setSortBy] = useState<'completion' | 'time' | 'name'>('completion');

  const sortedData = [...data].sort((a, b) => {
    if (sortBy === 'completion') {
      return (b.completed / b.total) - (a.completed / a.total);
    } else if (sortBy === 'time') {
      return b.time_spent - a.time_spent;
    } else {
      return a.category__name.localeCompare(b.category__name);
    }
  });

  if (isLoading) return <div className="p-6 text-center text-gray-500">Loading summary...</div>;
  if (isError || !data) return <div className="p-6 text-center text-red-600">Failed to load summary.</div>;
  if (data.length === 0) return <div className="p-6 text-center text-gray-500">No resources tracked yet.</div>;

  return (
    <main className="min-h-screen bg-white px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">Learning Summary</h1>
          <div className="flex flex-wrap gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="completion">Sort by Completion %</option>
              <option value="time">Sort by Time Spent</option>
              <option value="name">Sort by Category Name</option>
            </select>
            <button
              onClick={() => router.push('/dashboard')}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-sm text-gray-800 rounded transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {sortedData.map((item) => {
            const completionRate = item.total ? (item.completed / item.total) * 100 : 0;
            const efficiency = item.completed ? (item.time_spent / item.completed).toFixed(1) : '-';

            return (
              <div
                key={item.category__name}
                className="bg-gray-50 border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-md transition-all"
              >
                <div className="flex justify-between mb-1">
                  <h2 className="text-lg font-semibold text-gray-800">{item.category__name}</h2>
                  <span className="text-sm text-gray-500">{completionRate.toFixed(0)}%</span>
                </div>

                <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-indigo-500 rounded-full transition-all duration-300"
                    style={{ width: `${completionRate}%` }}
                  />
                </div>

                <ul className="text-sm text-gray-600 space-y-1">
                  <li>Total Resources: <span className="text-gray-800 font-medium">{item.total}</span></li>
                  <li>Completed: <span className="text-gray-800 font-medium">{item.completed}</span></li>
                  <li>Time Spent: <span className="text-gray-800 font-medium">{item.time_spent} mins</span></li>
                  <li>Efficiency: <span className="text-gray-800 font-medium">{efficiency} min/resource</span></li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
