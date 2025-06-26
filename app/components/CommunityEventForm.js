'use client';

import { useState } from 'react';

// Event types
const EVENT_TYPES = [
  { value: 'planting', label: 'Planting', icon: '🌱', color: '#43A047' },
  { value: 'maintenance', label: 'Maintenance', icon: '🔧', color: '#1976D2' },
  { value: 'educational', label: 'Educational', icon: '📚', color: '#7B1FA2' },
  { value: 'cleanup', label: 'Cleanup', icon: '🧹', color: '#FF9800' },
  { value: 'other', label: 'Other', icon: '📌', color: '#757575' }
];

export default function CommunityEventForm({ isOpen, onClose, onSubmit, tagId }) {
  const [formData, setFormData] = useState({
    eventType: 'planting',
    title: '',
    description: '',
    date: getTomorrow(),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Helper to get tomorrow's date for default value
  function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }
  
  if (!isOpen) return null;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Call the parent component's submit handler with the form data and tag ID
      await onSubmit(formData, tagId);
      
      // Reset form
      setFormData({
        eventType: 'planting',
        title: '',
        description: '',
        date: getTomorrow(),
      });
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error submitting event:', error);
      alert('Failed to create community event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Get selected event type
  const selectedEvent = EVENT_TYPES.find(event => event.value === formData.eventType);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Create Community Event</h2>
          <button 
            type="button" 
            onClick={onClose} 
            className="text-white hover:text-green-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Type *
              </label>
              
              <div className="grid grid-cols-5 gap-2">
                {EVENT_TYPES.map(event => (
                  <button
                    key={event.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, eventType: event.value }))}
                    className={`p-2 rounded-md border flex flex-col items-center ${formData.eventType === event.value ? 'ring-2 ring-green-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: formData.eventType === event.value ? `${event.color}20` : 'transparent' }}
                  >
                    <div className="text-2xl mb-1">{event.icon}</div>
                    <div className="text-xs">{event.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Event Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                placeholder={`${selectedEvent?.label || 'Event'} at this location`}
              />
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date and Time *
              </label>
              <input
                id="date"
                name="date"
                type="datetime-local"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                min={new Date().toISOString().slice(0, 16)}
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                placeholder="Describe the event, what participants should expect, and any items they should bring..."
              />
            </div>
            
            <div className="bg-blue-50 p-3 rounded-md">
              <p className="text-sm text-blue-700">
                <span className="font-bold">Note:</span> By creating this event, you will automatically be listed as the organizer. Others can join the event once it's created.
              </p>
            </div>
                        
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
              >
                {isSubmitting ? 'Creating...' : 'Create Event'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 