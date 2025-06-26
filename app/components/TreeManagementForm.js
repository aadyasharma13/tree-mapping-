'use client';

import { useState } from 'react';

// Management activity types
const ACTIVITY_TYPES = [
  { value: 'watering', label: 'Watering', icon: '💧', description: 'Providing water to the tree' },
  { value: 'pruning', label: 'Pruning', icon: '✂️', description: 'Cutting branches or stems' },
  { value: 'fertilizing', label: 'Fertilizing', icon: '🧪', description: 'Adding nutrients to soil' },
  { value: 'treatment', label: 'Treatment', icon: '🩹', description: 'Treating disease or pests' },
  { value: 'mulching', label: 'Mulching', icon: '🍂', description: 'Adding protective layer of material' },
  { value: 'other', label: 'Other', icon: '🔧', description: 'Other maintenance activities' }
];

export default function TreeManagementForm({ isOpen, onClose, onSubmit, tagId }) {
  const [formData, setFormData] = useState({
    activityType: 'watering',
    date: new Date().toISOString().split('T')[0],
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
        activityType: 'watering',
        date: new Date().toISOString().split('T')[0],
        notes: '',
      });
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error submitting management activity:', error);
      alert('Failed to save management activity. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // Find selected activity to get its description
  const selectedActivity = ACTIVITY_TYPES.find(activity => activity.value === formData.activityType);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Add Management Activity</h2>
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
                Activity Type *
              </label>
              
              <div className="grid grid-cols-3 gap-2">
                {ACTIVITY_TYPES.map(activity => (
                  <button
                    key={activity.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, activityType: activity.value }))}
                    className={`p-3 rounded-md border flex flex-col items-center justify-center ${formData.activityType === activity.value ? 'ring-2 ring-green-500 bg-green-50' : 'border-gray-300'}`}
                  >
                    <div className="text-2xl mb-1">{activity.icon}</div>
                    <div className="text-xs">{activity.label}</div>
                  </button>
                ))}
              </div>
              
              {selectedActivity && (
                <p className="mt-2 text-sm text-gray-600 italic">
                  {selectedActivity.description}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                Date *
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
              />
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
                placeholder="Describe the management activity in detail..."
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