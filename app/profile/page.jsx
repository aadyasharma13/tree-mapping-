'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/profile');
      if (!res.ok) router.push('/login');
      else setUser(await res.json());
    };
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <div className="text-xl font-semibold text-green-700 animate-pulse">Loading profile...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-green-50 flex flex-col items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8 mt-12 text-center">
        <h1 className="text-3xl font-bold text-green-700 mb-2">Welcome, {user.name} 👋</h1>
        <p className="text-gray-600 mb-4">Role: <span className="font-medium capitalize">{user.role}</span></p>

        <div className="flex justify-center mb-6">
          <span className="inline-block bg-green-100 text-green-700 font-bold py-2 px-4 rounded-full shadow-sm">
            🌿 Points: {user.points}
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <button
            onClick={() => router.push('/tag-tree')}
            className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md"
          >
            🌳 Tag a Tree / Lake
          </button>
          <button
            onClick={() => router.push('/my-tags')}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md"
          >
            🗂️ View My Tags
          </button>
          <button
            onClick={() => router.push('/stats')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-xl font-semibold shadow-md"
          >
            📊 My Contribution Stats
          </button>
          <button
            onClick={() => router.push('/events')}
            className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold shadow-md"
          >
            📅 Nearby Events
          </button>
        </div>

        <div className="mt-8 text-gray-500 text-sm">
          Logged in as <span className="font-mono">{user.email}</span>
        </div>
      </div>
    </main>
  );
}
