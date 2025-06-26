'use client';

import { useState } from 'react';

// Seasonal observation types
const OBSERVATION_TYPES = [
  { value: 'flowering', label: 'Flowering', icon: '🌸' },
  { value: 'fruiting', label: 'Fruiting', icon: '🍎' },
  { value: 'leafChange', label: 'Leaf Change', icon: '🍁' },
  { value: 'budding', label: 'Budding', icon: '🌱' },
  { value: 'other', label: 'Other', icon: '📝' }
];

export default function SeasonalObservationForm({ isOpen, onClose, onSubmit, tagId }) {
  const [formData, setFormData] = useState({
    observationType: 'flowering',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    notes: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
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
        observationType: 'flowering',
        startDate: new Date().toISOString().split('T')[0],
        endDate: '',
        notes: '',
      });
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error submitting observation:', error);
      alert('Failed to save seasonal observation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Add Seasonal Observation</h2>
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
                Observation Type *
              </label>
              <div className="grid grid-cols-5 gap-2">
                {OBSERVATION_TYPES.map(type => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, observationType: type.value }))}
                    className={`p-2 rounded-md border flex flex-col items-center justify-center ${formData.observationType === type.value ? 'ring-2 ring-green-500 bg-green-50' : 'border-gray-300'}`}
                  >
                    <div className="text-2xl mb-1">{type.icon}</div>
                    <div className="text-xs">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                  Start Date *
                </label>
                <input
                  id="startDate"
                  name="startDate"
                  type="date"
                  required
                  value={formData.startDate}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                />
              </div>
              
              <div>
                <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
                  End Date
                </label>
                <input
                  id="endDate"
                  name="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={handleInputChange}
                  min={formData.startDate}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                />
                <p className="mt-1 text-xs text-gray-500">Optional. Leave blank if ongoing.</p>
              </div>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes *
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="3"
                required
                value={formData.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                placeholder="Describe your observations in detail..."
              />
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
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 