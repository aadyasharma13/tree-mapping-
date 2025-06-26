// Temporary auth middleware (no JWT verification)
// This is a simplified version for development that doesn't require jsonwebtoken

// Simplified auth middleware for development
// This bypasses actual token verification for testing purposes

// Protect routes - simplified middleware for development
exports.protect = (req, res, next) => {
  try {
    // For development, we'll set a dummy user object
    req.user = {
      _id: '123456789012345678901234', // Fake MongoDB ObjectId
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      role: 'user'
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ message: 'Authentication error' });
  }
};

// Check if user is an admin
exports.admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Not authorized as admin' });
  }
};

// Simple middleware without API key validation
exports.apiKey = (req, res, next) => {
  // Skip API key validation for development
  next();
}; 