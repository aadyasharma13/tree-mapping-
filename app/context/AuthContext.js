'use client';

import { createContext, useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/navigation';

// Create auth context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Create a dummy user that's always logged in
  const [user, setUser] = useState({
    _id: '123456789012345678901234',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    role: 'user',
    points: 250,
    treesContributed: 15
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // No need to check if user is logged in - they always are
  useEffect(() => {
    // Set dummy token in localStorage to simulate logged in state
    localStorage.setItem('token', 'dummy-token-for-development');
    setLoading(false);
  }, []);

  // Register user - automatically succeeds
  const register = async (userData) => {
    try {
      setLoading(true);
      // Create merged user with provided data and defaults
      const newUser = {
        ...user,
        firstName: userData.firstName || user.firstName,
        lastName: userData.lastName || user.lastName,
        email: userData.email || user.email,
      };
      
      setUser(newUser);
      setError(null);
      
      return newUser;
    } catch (err) {
      setError(err.message || 'Something went wrong during registration');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Login user - automatically succeeds
  const login = async (email, password) => {
    try {
      setLoading(true);
      // Just return the dummy user
      setError(null);
      return user;
    } catch (err) {
      setError(err.message || 'Something went wrong during login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user - resets to dummy user
  const logout = () => {
    // Don't actually log out, just redirect
    router.push('/');
  };

  // Update user profile - updates dummy user
  const updateProfile = async (userData) => {
    try {
      setLoading(true);
      
      // Update user state with new data
      const updatedUser = {
        ...user,
        ...userData
      };
      
      setUser(updatedUser);
      setError(null);
      
      return updatedUser;
    } catch (err) {
      setError(err.message || 'Something went wrong during profile update');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Clear any error messages
  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        register,
        login,
        logout,
        updateProfile,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 