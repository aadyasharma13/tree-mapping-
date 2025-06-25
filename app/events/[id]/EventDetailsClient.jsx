'use client';

export default function EventDetailsClient({ eventId }) {
  return (
    <div className="bg-white p-4 shadow rounded">
      <p className="text-lg font-semibold">Event ID: {eventId}</p>
      <p className="text-gray-500 mt-2">In the future: fetch and show event details</p>
    </div>
  );
}
