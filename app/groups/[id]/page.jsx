export default function GroupDetail({ params }) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold">👤 Group Detail</h1>
        <p>Group ID: {params.id}</p>
      </div>
    );
  }
  