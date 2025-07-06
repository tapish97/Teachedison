// src/app/not-found.tsx
'use client';

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-white text-gray-800 px-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-gray-500 mb-6">
        Sorry, the page you’re looking for doesn’t exist.
      </p>
      <Link
        href="/login"
        className="px-5 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
      >
        Go to Login
      </Link>
    </main>
  );
}
