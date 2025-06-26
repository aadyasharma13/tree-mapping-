'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function NavigationBar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    setIsOpen(false);
  };

  return (
    <nav className="bg-green-700 text-white p-4 shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            Tree Mapping
          </Link>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button 
              className="focus:outline-none" 
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/" className="hover:bg-green-600 px-3 py-2 rounded">Home</Link>
            <Link href="/map" className="hover:bg-green-600 px-3 py-2 rounded">Map</Link>
            <Link href="/about" className="hover:bg-green-600 px-3 py-2 rounded">About</Link>
            
            {/* Show Dashboard and Leaderboard only to logged in users */}
            {user && (
              <>
                <Link href="/dashboard" className="hover:bg-green-600 px-3 py-2 rounded">Dashboard</Link>
                <Link href="/leaderboard" className="hover:bg-green-600 px-3 py-2 rounded">Leaderboard</Link>
              </>
            )}
            
            {/* Authentication links */}
            {user ? (
              <div className="relative">
                <button 
                  onClick={toggleDropdown}
                  className="flex items-center hover:bg-green-600 px-3 py-2 rounded focus:outline-none"
                >
                  <span className="mr-1">{user.firstName}</span>
                  <svg 
                    className="w-4 h-4 ml-1" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-lg py-2 z-20">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link 
                      href="/settings" 
                      className="block px-4 py-2 hover:bg-gray-100"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>
                    <div 
                      className="block px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogout}
                    >
                      Logout
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link href="/auth/login" className="bg-green-600 hover:bg-green-500 px-4 py-2 rounded">Login</Link>
                <Link href="/auth/register" className="bg-green-500 hover:bg-green-400 px-4 py-2 rounded">Register</Link>
              </div>
            )}
          </div>
        </div>
        
        {/* Mobile menu */}
        <div className={`${isOpen ? 'block' : 'hidden'} md:hidden mt-4`}>
          <div className="flex flex-col space-y-2">
            <Link 
              href="/" 
              className="hover:bg-green-600 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/map" 
              className="hover:bg-green-600 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              Map
            </Link>
            <Link 
              href="/about" 
              className="hover:bg-green-600 px-3 py-2 rounded"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>
            
            {/* Show Dashboard and Leaderboard only to logged in users */}
            {user && (
              <>
                <Link 
                  href="/dashboard" 
                  className="hover:bg-green-600 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Dashboard
                </Link>
                <Link 
                  href="/leaderboard" 
                  className="hover:bg-green-600 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link 
                  href="/profile" 
                  className="hover:bg-green-600 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Profile
                </Link>
                <Link 
                  href="/settings" 
                  className="hover:bg-green-600 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Settings
                </Link>
                <button 
                  className="text-left hover:bg-green-600 px-3 py-2 rounded"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
            
            {/* Authentication links */}
            {!user && (
              <>
                <Link 
                  href="/auth/login" 
                  className="bg-green-600 hover:bg-green-500 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  href="/auth/register" 
                  className="bg-green-500 hover:bg-green-400 px-3 py-2 rounded"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}