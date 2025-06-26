'use client';

import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import TagFormModal from './TagFormModal';

// Fix for default marker icons in Leaflet with Next.js
// Custom icon URL that works with Next.js
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Map Click Handler Component
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng);
    }
  });
  return null;
}

// API URL constant
const API_URL = 'http://localhost:5002/api';

export default function MapView() {
  const [tags, setTags] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);
  
  // Center map on a default location (adjust as needed)
  const mapCenter = [51.505, -0.09]; // London as example
  const zoom = 13;

  useEffect(() => {
    // Fetch tags from API
    const fetchTags = async () => {
      try {
        setLoading(true);
        console.log('Fetching tags from:', `${API_URL}/tags`);
        
        const response = await fetch(`${API_URL}/tags`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }
        });
        
        if (!response.ok) {
          const errorText = await response.text();
          console.error('API Error Response:', errorText);
          throw new Error(`Failed to fetch tags: ${response.status} ${response.statusText}`);
        }
        
        const text = await response.text();
        console.log('Response text:', text);
        
        let data;
        try {
          data = text ? JSON.parse(text) : [];
        } catch (e) {
          console.error('JSON Parse Error:', e);
          throw new Error('Invalid JSON response from server');
        }
        
        console.log('Tags data:', data);
        setTags(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Error fetching tags:', err);
        setError(err.message);
        setTags([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  // Handle map click to open tag form
  const handleMapClick = (latlng) => {
    setSelectedLocation(latlng);
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleFormSubmit = async (formData) => {
    try {
      // Include coordinates from selected location
      formData.append('lng', selectedLocation.lng);
      formData.append('lat', selectedLocation.lat);

      const response = await fetch(`${API_URL}/tags`, {
        method: 'POST',
        body: formData, // Using FormData for file upload
      });

      let responseData;
      const responseText = await response.text();
      
      try {
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (e) {
        console.error('Error parsing response:', responseText);
        throw new Error('Invalid response from server');
      }

      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to create tag');
      }

      // Add new tag to the map
      setTags([...tags, responseData]);
      
      // Close the modal
      setIsModalOpen(false);
    } catch (err) {
      console.error('Error creating tag:', err);
      alert('Failed to create tag: ' + err.message);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] relative">
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded absolute top-0 left-0 right-0 z-10 m-4">
          Error: {error}
        </div>
      )}
      
      <MapContainer 
        center={mapCenter} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Map click handler */}
        <MapClickHandler onMapClick={handleMapClick} />
        
        {/* Render markers for each tag */}
        {!loading && tags && tags.length > 0 && tags.map(tag => (
          <Marker 
            key={tag._id} 
            position={[
              tag.location.coordinates[1], // latitude
              tag.location.coordinates[0]  // longitude
            ]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{tag.title}</h3>
                <p>{tag.description}</p>
                <p><strong>Type:</strong> {tag.treeType}</p>
                {tag.age && <p><strong>Age:</strong> {tag.age} years</p>}
                {tag.height && <p><strong>Height:</strong> {tag.height}m</p>}
                
                {/* Display photos if available */}
                {tag.photos && tag.photos.length > 0 && (
                  <div className="mt-2">
                    <img 
                      src={tag.photos[0].url} 
                      alt={tag.title} 
                      className="w-full max-h-32 object-cover rounded"
                    />
                  </div>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      
      {/* Tag form modal - this appears above the map */}
      {isModalOpen && (
        <TagFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleFormSubmit}
          location={selectedLocation}
        />
      )}
    </div>
  );
} 