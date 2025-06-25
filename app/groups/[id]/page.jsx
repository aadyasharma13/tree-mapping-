'use client';

import { useParams } from 'next/navigation';
import { useState } from 'react';

// Mock group data
const mockGroups = {
  greenwarriors: {
    name: 'Green Warriors 🌿',
    description: 'A group of nature lovers planting trees every week!',
    members: 42,
  },
  lakeguardians: {
    name: 'Lake Guardians 🛡️',
    description: 'We clean and protect urban lakes regularly.',
    members: 28,
  },
};

export default function GroupDetail() {
  const params = useParams();
  const groupId = params.id;

  const group = mockGroups[groupId] || {
    name: 'Unknown Group',
    description: 'No group data found for this ID.',
    members: 0,
  };

  const [joined, setJoined] = useState(false); // simulate joined status

  const handleJoin = () => {
    setJoined(true);
    // Later: send POST to /api/groups/join
  };

  const handleLeave = () => {
    setJoined(false);
    // Later: send POST to /api/groups/leave
  };

  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
      <h1 className="text-3xl font-bold text-green-700 mb-2">{group.name}</h1>
      <p className="text-gray-700 mb-4">{group.description}</p>
      <p className="text-sm text-gray-500 mb-6">👥 {group.members} members</p>

      {joined ? (
        <button
          onClick={handleLeave}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🚪 Leave Group
        </button>
      ) : (
        <button
          onClick={handleJoin}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          ➕ Join Group
        </button>
      )}
    </div>
  );
}
