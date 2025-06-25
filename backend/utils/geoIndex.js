const mongoose = require('mongoose');
const Tag = require('../models/Tag');

// This utility ensures that the 2dsphere index is created
// It's imported in index.js after MongoDB connection is established
const createGeoSpatialIndex = async () => {
  try {
    console.log('Checking geospatial index...');
    
    // Create the index if it doesn't exist
    // This is actually redundant since we already defined the index in the Tag schema
    // But we include it here as a safeguard and for clarity
    await Tag.collection.createIndex({ location: '2dsphere' });
    
    console.log('Geospatial index ready');
  } catch (error) {
    console.error('Error creating geospatial index:', error);
  }
};

// Execute the function
createGeoSpatialIndex();

module.exports = { createGeoSpatialIndex }; 