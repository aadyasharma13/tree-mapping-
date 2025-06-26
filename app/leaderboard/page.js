'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

// Medal icons
const MedalIcon = ({ rank }) => {
  if (rank === 1) {
    return (
      <svg className="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    );
  } else if (rank === 2) {
    return (
      <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    );
  } else if (rank === 3) {
    return (
      <svg className="w-6 h-6 text-yellow-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
      </svg>
    );
  }
  return null;
};

export default function LeaderboardPage() {
  const { user } = useAuth();
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [timeFrame, setTimeFrame] = useState('month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRank, setUserRank] = useState(null);

  // Mock data generator function
  const generateMockLeaderboardData = () => {
    const mockUsers = [
      { id: '1', firstName: 'John', lastName: 'Doe', points: 835, trees: 42 },
      { id: '2', firstName: 'Jane', lastName: 'Smith', points: 720, trees: 36 },
      { id: '3', firstName: 'Robert', lastName: 'Johnson', points: 690, trees: 32 },
      { id: '4', firstName: 'Emily', lastName: 'Williams', points: 580, trees: 29 },
      { id: '5', firstName: 'Michael', lastName: 'Brown', points: 520, trees: 26 },
      { id: '6', firstName: 'Sarah', lastName: 'Jones', points: 480, trees: 24 },
      { id: '7', firstName: 'David', lastName: 'Miller', points: 420, trees: 21 },
      { id: '8', firstName: 'Lisa', lastName: 'Wilson', points: 380, trees: 19 },
      { id: '9', firstName: 'James', lastName: 'Taylor', points: 340, trees: 17 },
      { id: '10', firstName: 'Linda', lastName: 'Anderson', points: 300, trees: 15 }
    ];

    // If user is logged in, insert them into the leaderboard
    if (user) {
      const userPoints = Math.floor(Math.random() * 500) + 300;
      const userTrees = Math.floor(userPoints / 20);
      
      const userData = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        points: userPoints,
        trees: userTrees,
        isCurrentUser: true
      };
      
      // Insert at a random position or add to the end
      const position = Math.floor(Math.random() * (mockUsers.length + 1));
      mockUsers.splice(position, 0, userData);
      
      // Set user rank for highlighting
      setUserRank(position + 1);
    }
    
    return mockUsers;
  };

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from your API
        // const response = await fetch(`/api/leaderboard?timeFrame=${timeFrame}`);
        // const data = await response.json();
        
        // For demo, use mock data with a small delay to simulate API call
        setTimeout(() => {
          const mockData = generateMockLeaderboardData();
          setLeaderboardData(mockData);
          setLoading(false);
        }, 700);
      } catch (err) {
        console.error('Error fetching leaderboard:', err);
        setError('Failed to load leaderboard data');
        setLoading(false);
      }
    };
    
    fetchLeaderboardData();
  }, [timeFrame, user]);

  // Handle time frame change
  const handleTimeFrameChange = (newTimeFrame) => {
    setTimeFrame(newTimeFrame);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-500 border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="px-4 py-5 sm:px-6 bg-green-700 text-white">
            <h1 className="text-2xl font-bold">Tree Mapping Leaderboard</h1>
            <p className="mt-1 text-sm">Top contributors in our community</p>
          </div>
          
          {/* Time frame selector */}
          <div className="bg-white px-4 py-3 border-b border-gray-200 sm:px-6">
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-3">Time Period:</span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleTimeFrameChange('week')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFrame === 'week' 
                      ? 'bg-green-100 text-green-800 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => handleTimeFrameChange('month')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFrame === 'month' 
                      ? 'bg-green-100 text-green-800 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  Month
                </button>
                <button
                  onClick={() => handleTimeFrameChange('allTime')}
                  className={`px-3 py-1 text-sm rounded-md ${
                    timeFrame === 'allTime' 
                      ? 'bg-green-100 text-green-800 font-medium' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
          </div>
          
          {/* Leaderboard table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">
                    Rank
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trees
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Points
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leaderboardData.map((user, index) => (
                  <tr 
                    key={user.id} 
                    className={user.isCurrentUser ? 'bg-green-50' : (index % 2 === 0 ? 'bg-white' : 'bg-gray-50')}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {index < 3 ? (
                          <MedalIcon rank={index + 1} />
                        ) : (
                          <span className="text-gray-500 font-medium">{index + 1}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                          <span className="text-green-700 font-medium">
                            {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className={`text-sm font-medium ${user.isCurrentUser ? 'text-green-800' : 'text-gray-900'}`}>
                            {user.firstName} {user.lastName}
                            {user.isCurrentUser && (
                              <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                You
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.trees}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{user.points}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Encouragement message */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            {!user ? (
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">
                  Want to join the leaderboard?
                </p>
                <Link 
                  href="/auth/register" 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Create Account
                </Link>
              </div>
            ) : userRank && userRank > 10 ? (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  You're currently ranked #{userRank}. Map more trees to climb the leaderboard!
                </p>
                <Link 
                  href="/map" 
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Map Trees
                </Link>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Great job! Keep mapping trees to maintain your position.
                </p>
                <Link 
                  href="/map" 
                  className="mt-2 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                >
                  Map More Trees
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 