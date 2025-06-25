'use client';

import Link from 'next/link';

const mockGroups = [
  {
    id: 'greenwarriors',
    name: 'Green Warriors 🌿',
    description: 'We plant trees every weekend.',
    members: 42,
  },
  {
    id: 'lakeguardians',
    name: 'Lake Guardians 🛡️',
    description: 'Cleaning and preserving our city lakes.',
    members: 28,
  },
];

export default function GroupListPage() {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-green-700">👥 All Groups</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {mockGroups.map((group) => (
          <Link
            key={group.id}
            href={`/groups/${group.id}`}
            className="block p-4 bg-white rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{group.name}</h2>
            <p className="text-gray-600 mt-1">{group.description}</p>
            <p className="text-sm text-gray-400 mt-2">👥 {group.members} members</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
