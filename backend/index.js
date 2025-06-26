require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const tagRoutes = require('./routes/tagRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5002;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from Next.js frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/tags', tagRoutes);
app.use('/api/users', userRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Tree Mapping API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// MongoDB Connection with fallback
mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://treemapping:treemapping@cluster0.mongodb.net/tree-mapping?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Using fallback connection or local development mode');
  });

// Setup geospatial index
require('./utils/geoIndex');

// Start server
app.listen(5002, () => {
  console.log(`Server running on port 5002`);
}); 