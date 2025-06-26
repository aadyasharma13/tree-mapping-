'use client';

import { useState } from 'react';

export default function Settings() {
  const [settings, setSettings] = useState({
    notifications: true,
    emailUpdates: false,
    darkMode: false,
    dataPrivacy: 'private',
    mapDefaultView: 'satellite'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save settings to backend
    alert('Settings saved!');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      
      <div className="bg-white shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            
            <div className="flex items-center mb-4">
              <input
                id="notifications"
                name="notifications"
                type="checkbox"
                checked={settings.notifications}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                Enable push notifications
              </label>
            </div>
            
            <div className="flex items-center">
              <input
                id="emailUpdates"
                name="emailUpdates"
                type="checkbox"
                checked={settings.emailUpdates}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="emailUpdates" className="ml-2 block text-sm text-gray-700">
                Receive email updates
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            
            <div className="flex items-center">
              <input
                id="darkMode"
                name="darkMode"
                type="checkbox"
                checked={settings.darkMode}
                onChange={handleChange}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="darkMode" className="ml-2 block text-sm text-gray-700">
                Dark mode
              </label>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            
            <div className="mb-4">
              <label htmlFor="dataPrivacy" className="block text-sm font-medium text-gray-700 mb-1">
                Data sharing
              </label>
              <select
                id="dataPrivacy"
                name="dataPrivacy"
                value={settings.dataPrivacy}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="private">Private - Only you can see your data</option>
                <option value="friends">Friends - Only you and your connections can see your data</option>
                <option value="public">Public - Everyone can see your data</option>
              </select>
            </div>
          </div>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Map Preferences</h2>
            
            <div className="mb-4">
              <label htmlFor="mapDefaultView" className="block text-sm font-medium text-gray-700 mb-1">
                Default map view
              </label>
              <select
                id="mapDefaultView"
                name="mapDefaultView"
                value={settings.mapDefaultView}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
              >
                <option value="standard">Standard</option>
                <option value="satellite">Satellite</option>
                <option value="terrain">Terrain</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 