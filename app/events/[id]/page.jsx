import EventDetailsClient from './EventDetailsClient';

export default function EventDetail({ params }) {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">🗓️ Event Detail Page</h1>
      <EventDetailsClient  eventId={params.id} />
    </div>
  );
}
