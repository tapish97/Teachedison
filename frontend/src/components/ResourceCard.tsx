'use client';

import { Resource } from '@/types';
import { useRouter } from 'next/navigation';
import { MouseEvent } from 'react';

interface Props {
  resource: Resource;
  onMarkComplete: (id: number) => void;
}

export default function ResourceCard({ resource, onMarkComplete }: Props) {
  const router = useRouter();
  const isCompleted = resource.completed;

  const handleCardClick = () => {
    router.push(`/resource/${resource.id}`);
  };

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation();
    onMarkComplete(resource.id);
  };

  const bgVariants = [
    'bg-[#fef9ef]',
    'bg-[#f0fdfa]',
    'bg-[#f5f3ff]',
    'bg-[#eff6ff]',
    'bg-[#fdf2f8]',
  ];

  const bgClass = bgVariants[resource.id % bgVariants.length];

  return (
    <div
      onClick={handleCardClick}
      className={`${bgClass} border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200 animate-fade-in cursor-pointer`}
    >
      <div className="space-y-2">
        <h2 className="text-lg font-medium text-gray-900">{resource.title}</h2>
        <p className="text-sm text-gray-800">{resource.description}</p>

        <div className="flex justify-between text-xs text-gray-700 mt-2">
          <span>Type: {resource.type}</span>
          <span>Category: {resource.category}</span>
        </div>
      </div>

      <div className="mt-4">
        {isCompleted ? (
          <span className="block w-full text-center py-2 text-sm font-medium text-green-700 bg-green-100 rounded">
            Completed
          </span>
        ) : (
          <button
            onClick={handleButtonClick}
            className="w-full py-2 px-4 text-sm font-medium bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
          >
            Mark as Completed
          </button>
        )}
      </div>
    </div>
  );
}
