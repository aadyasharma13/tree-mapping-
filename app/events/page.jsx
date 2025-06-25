'use client';

import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// ✅ Mock event data
const mockEvents = [
  {
    id: '1',
    title: 'Tree Plantation Drive 🌳',
    date: '2025-06-26',
    description: 'Join us at the lake park to plant saplings!',
  },
  {
    id: '2',
    title: 'Eco Awareness Rally 🚶‍♂️',
    date: '2025-06-27',
    description: 'Walk through the town spreading green messages.',
  },
  {
    id: '3',
    title: 'Lake Cleanup Event 🧹',
    date: '2025-06-26',
    description: 'Volunteers needed for cleaning the central lake area.',
  },
];

export default function EventsPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const formatDate = (date) => date.toISOString().split('T')[0];

  const selectedEvents = mockEvents.filter(
    (event) => event.date === formatDate(selectedDate)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">📅 Events Calendar</h1>

      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        className="rounded-lg shadow-lg"
      />

      <div className="mt-6 bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Events on {selectedDate.toDateString()}:</h2>

        {selectedEvents.length === 0 ? (
          <p className="text-gray-500">No events scheduled for this day.</p>
        ) : (
          <ul className="space-y-4">
            {selectedEvents.map((event) => (
              <li key={event.id} className="border p-3 rounded-lg bg-green-50">
                <h3 className="text-lg font-bold">{event.title}</h3>
                <p className="text-gray-700">{event.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
