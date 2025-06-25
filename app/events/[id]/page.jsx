export default function EventDetail({ params }) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">🗓️ Event Detail</h1>
        <p>Event ID: {params.id}</p>
      </div>
    );
  }
  