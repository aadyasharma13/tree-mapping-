'use client';

import { useState } from 'react';

export default function TagFormModal({ isOpen, onClose, onSubmit, location }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    treeType: '',
    age: '',
    height: ''
  });
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  if (!isOpen) return null;
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFileChange = (e) => {
    setPhotos(Array.from(e.target.files));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // Create FormData object for sending multipart form data
      const submitData = new FormData();
      
      // Add text fields
      Object.keys(formData).forEach(key => {
        if (formData[key]) submitData.append(key, formData[key]);
      });
      
      // Add photos
      photos.forEach(photo => {
        submitData.append('photos', photo);
      });
      
      // Call the parent component's submit handler
      await onSubmit(submitData);
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        treeType: '',
        age: '',
        height: ''
      });
      setPhotos([]);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000]">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4 bg-green-700 text-white p-4 -mx-6 -mt-6 rounded-t-lg">
          <h2 className="text-xl font-bold">Add New Tree Tag</h2>
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
        
        <div className="mb-4">
          <p className="text-sm text-gray-600">
            Location: {location ? `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}` : ''}
          </p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
              />
            </div>
            
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                required
                value={formData.description}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
              />
            </div>
            
            <div>
              <label htmlFor="treeType" className="block text-sm font-medium text-gray-700">
                Tree Type *
              </label>
              <input
                id="treeType"
                name="treeType"
                type="text"
                required
                value={formData.treeType}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                  Age (years)
                </label>
                <input
                  id="age"
                  name="age"
                  type="number"
                  min="0"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                />
              </div>
              
              <div>
                <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                  Height (meters)
                </label>
                <input
                  id="height"
                  name="height"
                  type="number"
                  min="0"
                  step="0.1"
                  value={formData.height}
                  onChange={handleInputChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="photos" className="block text-sm font-medium text-gray-700">
                Photos (max 5)
              </label>
              <input
                id="photos"
                name="photos"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 text-black font-medium"
              />
              <p className="mt-1 text-xs text-gray-500">
                Selected: {photos.length} files
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
                {isSubmitting ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 