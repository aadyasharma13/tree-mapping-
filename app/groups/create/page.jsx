'use client';

import { useState } from 'react';
import axios from 'axios';

export default function CreateGroupPage() {
  const [groupData, setGroupData] = useState({
    name: '',
    description: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setGroupData({ ...groupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('https://httpbin.org/post', groupData); // 🔁 Replace later with real backend
      console.log('Response:', res.data);
      setMessage('✅ Group created successfully!');
    } catch (err) {
      console.error('Error:', err);
      setMessage('❌ Failed to create group');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow mt-10">
      <h1 className="text-2xl font-bold mb-4 text-green-700">👥 Create a New Group</h1>

      {message && <p className="mb-4 text-sm text-green-600">{message}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Group Name</label>
          <input
            type="text"
            name="name"
            value={groupData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={groupData.description}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:border-green-500"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Create Group
        </button>
      </form>
    </div>
  );
}
