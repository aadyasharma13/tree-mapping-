'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function ProfilePage() {
  const { user, updateProfile, logout } = useAuth();
  const router = useRouter();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    bio: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  
  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      router.push('/auth/login?redirect=/profile');
      return;
    }
    
    // Set initial form data from user object
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        bio: user.bio || '',
      }));
    }
  }, [user, router]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setError('');
    setSuccessMessage('');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    setIsSubmitting(true);
    
    // Basic validation
    if (!formData.firstName || !formData.lastName) {
      setError('First name and last name are required');
      setIsSubmitting(false);
      return;
    }
    
    // Validate email
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }
    
    // Validate password if attempting to change it
    if (formData.newPassword) {
      if (!formData.currentPassword) {
        setError('Current password is required to set a new password');
        setIsSubmitting(false);
        return;
      }
      
      if (formData.newPassword.length < 6) {
        setError('New password must be at least 6 characters');
        setIsSubmitting(false);
        return;
      }
      
      if (formData.newPassword !== formData.confirmPassword) {
        setError('New passwords do not match');
        setIsSubmitting(false);
        return;
      }
    }
    
    try {
      // Prepare update data
      const updateData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        bio: formData.bio
      };
      
      // Include password data if changing
      if (formData.newPassword) {
        updateData.currentPassword = formData.currentPassword;
        updateData.password = formData.newPassword;
      }
      
      // Use context to update profile
      await updateProfile(updateData);
      
      setSuccessMessage('Profile updated successfully');
      setIsEditing(false);
      
      // Clear password fields
      setFormData({
        ...formData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (err) {
      setError(err.message || 'An error occurred while updating your profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:px-6 flex justify-between items-center bg-green-700 text-white">
            <div>
              <h3 className="text-lg font-medium">User Profile</h3>
              <p className="mt-1 text-sm">Personal information and settings</p>
            </div>
            <div>
              {!isEditing ? (
                <button 
                  onClick={toggleEdit} 
                  className="px-4 py-2 border border-white text-white rounded hover:bg-green-600"
                >
                  Edit Profile
                </button>
              ) : (
                <button 
                  onClick={toggleEdit} 
                  className="px-4 py-2 border border-white text-white rounded hover:bg-green-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          
          {/* Error message */}
          {error && (
            <div className="p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
              <p>{error}</p>
            </div>
          )}
          
          {/* Success message */}
          {successMessage && (
            <div className="p-4 bg-green-50 border-l-4 border-green-500 text-green-700">
              <p>{successMessage}</p>
            </div>
          )}
          
          <div className="border-t border-gray-200">
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Personal Information</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  
                  <div className="mt-4">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Bio
                    </label>
                    <textarea
                      name="bio"
                      id="bio"
                      rows={4}
                      value={formData.bio}
                      onChange={handleChange}
                      className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Tell us a little about yourself..."
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="text-lg font-medium mb-3">Change Password</h4>
                  <p className="text-sm text-gray-500 mb-4">Leave these fields blank if you don't want to change your password</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        id="currentPassword"
                        value={formData.currentPassword}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        id="newPassword"
                        value={formData.newPassword}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                    <div>
                      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="shadow-sm focus:ring-green-500 focus:border-green-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
                      isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.firstName} {user.lastName}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Email address</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.email}</dd>
                  </div>
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">Bio</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.bio || 'No bio provided'}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Account created</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.role === 'admin' ? 'Administrator' : 'User'}
                    </dd>
                  </div>
                </dl>
                
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-md font-medium text-gray-900">Account Actions</h4>
                  <div className="mt-4 flex space-x-4">
                    <Link 
                      href="/dashboard" 
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                    >
                      View Dashboard
                    </Link>
                    <button 
                      onClick={logout} 
                      className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 