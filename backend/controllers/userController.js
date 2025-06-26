const User = require('../models/User');
// Removed JWT and bcrypt dependencies

// Generate a simple token for development
const generateToken = (id) => {
  return `dev-token-${id}-${Date.now()}`;
};

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Always return success for development
    res.status(201).json({
      _id: '123456789012345678901234',
      firstName: firstName || 'Test',
      lastName: lastName || 'User',
      email: email || 'test@example.com',
      role: 'user',
      token: generateToken('123456789012345678901234')
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    // Always return success for development
    res.json({
      _id: '123456789012345678901234',
      firstName: 'Test',
      lastName: 'User',
      email: email || 'test@example.com',
      role: 'user',
      token: generateToken('123456789012345678901234')
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
};

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
  try {
    // Return dummy user data
    res.json({
      _id: '123456789012345678901234',
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      role: 'user',
      avatar: '',
      bio: 'Tree enthusiast',
      points: 100,
      treesContributed: 5,
      createdAt: new Date(),
      lastActive: new Date()
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Server error fetching profile' });
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
  try {
    // Return updated dummy data
    res.json({
      _id: '123456789012345678901234',
      firstName: req.body.firstName || 'Test',
      lastName: req.body.lastName || 'User',
      email: req.body.email || 'test@example.com',
      role: 'user',
      avatar: req.body.avatar || '',
      bio: req.body.bio || 'Tree enthusiast'
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error updating profile' });
  }
};

// @desc    Get user dashboard data
// @route   GET /api/users/dashboard
// @access  Private
exports.getUserDashboard = async (req, res) => {
  try {
    // Return dummy dashboard data
    res.json({
      user: {
        name: 'Test User',
        joinDate: new Date(),
        avatar: '',
      },
      stats: {
        totalTrees: 5,
        contributedThisMonth: 2,
        uniqueSpecies: 3,
        points: 100,
      },
      recentActivity: []
    });
  } catch (error) {
    console.error('Error fetching dashboard:', error);
    res.status(500).json({ message: 'Server error fetching dashboard' });
  }
};

// @desc    Get all users (admin only)
// @route   GET /api/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
  try {
    // Return dummy users
    res.json([
      {
        _id: '123456789012345678901234',
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'user'
      },
      {
        _id: '123456789012345678905678',
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@example.com',
        role: 'admin'
      }
    ]);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};

// @desc    Delete user (admin only)
// @route   DELETE /api/users/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
  try {
    // Always return success for development
    res.json({ message: 'User removed' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error deleting user' });
  }
}; 