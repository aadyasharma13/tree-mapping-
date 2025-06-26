'use client';

import dynamic from 'next/dynamic';

// Dynamically import MapView with no SSR to avoid Leaflet issues
const MapViewWithNoSSR = dynamic(() => import('../components/MapView'), {
  ssr: false,
});

export default function MapPage() {
  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow">
        <MapViewWithNoSSR />
      </main>
    </div>
  );
} 