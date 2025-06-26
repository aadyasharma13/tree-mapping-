'use client';

import { useState } from 'react';

// Health status options with colors
const HEALTH_STATUS_OPTIONS = [
  { value: 'excellent', label: 'Excellent', color: '#2E7D32', description: 'Tree appears completely healthy with no signs of stress or disease.' },
  { value: 'good', label: 'Good', color: '#43A047', description: 'Tree is mostly healthy with minor issues that don\'t affect overall health.' },
  { value: 'fair', label: 'Fair', color: '#FFB300', description: 'Tree shows some signs of stress or minor disease but is generally stable.' },
  { value: 'poor', label: 'Poor', color: '#FB8C00', description: 'Tree has significant health issues that require attention.' },
  { value: 'critical', label: 'Critical', color: '#D32F2F', description: 'Tree is severely compromised and may not survive without immediate care.' }
];

export default function TreeHealthForm({ isOpen, onClose, onSubmit, tagId }) {
  const [formData, setFormData] = useState({
    status: 'good',
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
        status: 'good',
        notes: '',
      });
      
      // Close the form
      onClose();
    } catch (error) {
      console.error('Error submitting health record:', error);
      alert('Failed to save health record. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Find the selected status to get its description
  const selectedStatus = HEALTH_STATUS_OPTIONS.find(option => option.value === formData.status);
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Add Health Record</h2>
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
                Health Status *
              </label>
              <div className="grid grid-cols-5 gap-2 mb-2">
                {HEALTH_STATUS_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, status: option.value }))}
                    className={`py-2 px-1 text-xs rounded-md border ${formData.status === option.value ? 'ring-2 ring-green-500' : 'border-gray-300'}`}
                    style={{ backgroundColor: formData.status === option.value ? option.color + '30' : 'transparent' }}
                  >
                    <div className="w-4 h-4 rounded-full mx-auto mb-1" style={{ backgroundColor: option.color }}></div>
                    {option.label}
                  </button>
                ))}
              </div>
              
              {selectedStatus && (
                <p className="text-sm text-gray-600 italic mb-4">
                  {selectedStatus.description}
                </p>
              )}
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notes *
              </label>
              <textarea
                id="notes"
                name="notes"
                rows="4"
                required
                value={formData.notes}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                placeholder="Describe the tree's health condition, observed issues, or any other relevant details..."
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