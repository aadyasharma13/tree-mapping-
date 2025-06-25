require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const tagRoutes = require('./routes/tagRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/tags', tagRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Tree Mapping API is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Setup geospatial index
require('./utils/geoIndex');

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 