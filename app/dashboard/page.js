'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  // Mock data - this would be replaced with actual API calls
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      try {
        // In a real app, fetch data from your backend API
        // const response = await fetch('http://localhost:5000/api/users/dashboard', {
        //   headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        // });
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = {
          user: {
            name: 'John Doe',
            joinDate: '2023-06-15',
            avatar: 'https://avatars.githubusercontent.com/u/12345678',
          },
          stats: {
            totalTrees: 42,
            contributedThisMonth: 8,
            uniqueSpecies: 15,
            points: 835,
          },
          recentActivity: [
            { id: 1, type: 'add', date: '2023-11-28T14:23:00', treeType: 'Oak', location: 'Central Park' },
            { id: 2, type: 'add', date: '2023-11-25T09:45:00', treeType: 'Maple', location: 'Riverside Drive' },
            { id: 3, type: 'edit', date: '2023-11-20T16:30:00', treeType: 'Pine', location: 'Forest Hills' },
            { id: 4, type: 'add', date: '2023-11-15T11:15:00', treeType: 'Birch', location: 'Madison Square' },
            { id: 5, type: 'add', date: '2023-11-10T10:00:00', treeType: 'Elm', location: 'Battery Park' },
          ]
        };
        
        setUserData(mockData);
        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError('Failed to load dashboard data. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white shadow-lg rounded-lg">
          <svg className="h-16 w-16 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {userData?.user.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Trees Mapped</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{userData?.stats.totalTrees}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/map" className="font-medium text-green-700 hover:text-green-900">View all</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Added This Month</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{userData?.stats.contributedThisMonth}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/activity" className="font-medium text-green-700 hover:text-green-900">View activity</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Unique Species</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{userData?.stats.uniqueSpecies}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/species" className="font-medium text-green-700 hover:text-green-900">View species</Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                  <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Points</dt>
                    <dd className="text-3xl font-semibold text-gray-900">{userData?.stats.points}</dd>
                  </dl>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-5 py-3">
              <div className="text-sm">
                <Link href="/leaderboard" className="font-medium text-green-700 hover:text-green-900">View leaderboard</Link>
              </div>
            </div>
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contribution Chart */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium text-gray-900">Contributions</h2>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setSelectedPeriod('week')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedPeriod === 'week' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Week
                </button>
                <button 
                  onClick={() => setSelectedPeriod('month')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedPeriod === 'month' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Month
                </button>
                <button 
                  onClick={() => setSelectedPeriod('year')}
                  className={`px-3 py-1 text-sm rounded-md ${selectedPeriod === 'year' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  Year
                </button>
              </div>
            </div>
            
            <div className="h-64 flex flex-col justify-center items-center text-center">
              {/* This would be replaced with an actual chart component */}
              <div className="w-full h-48 relative">
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-around h-40">
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '65%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '40%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '25%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '60%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '75%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '90%'}}></div>
                  <div className="w-1/12 bg-green-500 rounded-t transition-all duration-500" style={{height: '45%'}}></div>
                </div>
              </div>
              <div className="flex justify-between w-full px-4 text-xs text-gray-500 mt-2">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h2>
              <div className="flow-root">
                <ul role="list" className="-mb-8">
                  {userData?.recentActivity.map((activity, index) => (
                    <li key={activity.id}>
                      <div className="relative pb-8">
                        {index !== userData.recentActivity.length - 1 ? (
                          <span className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                        ) : null}
                        <div className="relative flex items-start space-x-3">
                          <div>
                            <div className={`relative px-1 ${
                              activity.type === 'add' ? 'bg-green-100' : 'bg-blue-100'
                            } rounded-full flex items-center justify-center h-8 w-8`}>
                              {activity.type === 'add' ? (
                                <svg className="h-5 w-5 text-green-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="h-5 w-5 text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <div className="min-w-0 flex-1 flex justify-between">
                            <div>
                              <p className="text-sm text-gray-700">
                                {activity.type === 'add' 
                                  ? `Added a new ${activity.treeType} tree`
                                  : `Updated information for ${activity.treeType} tree`}
                                <span className="font-medium"> at {activity.location}</span>
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              <time dateTime={activity.date}>
                                {new Date(activity.date).toLocaleDateString()}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6">
                <Link href="/activity" className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  View all activity
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 