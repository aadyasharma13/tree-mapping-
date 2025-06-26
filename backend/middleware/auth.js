// Temporary auth middleware (no JWT verification)
// This is a simplified version for development that doesn't require jsonwebtoken

// Protect routes - middleware that doesn't actually validate tokens
// but allows the routes to work for development
exports.protect = async (req, res, next) => {
  try {
    // For now, we'll set a dummy user object
    req.user = {
      _id: '123456789012345678901234', // Fake MongoDB ObjectId
      name: 'Development User',
      email: 'dev@example.com',
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
    res.status(403).json({ message: 'Not authorized as an admin' });
  }
};

// Simple middleware without API key validation
exports.apiKey = (req, res, next) => {
  // Skip API key validation for development
  next();
};

// Simplified auth middleware that allows all requests
// This is for development purposes only - no actual authentication is performed

module.exports = (req, res, next) => {
  // Attach a dummy user to all requests
  req.user = {
    _id: '123456789012345678901234',
    firstName: 'Test',
    lastName: 'User',
    email: 'test@example.com',
    role: 'user'
  };
  
  // Continue to the next middleware or route handler
  next();
}; 