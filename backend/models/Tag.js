const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  treeType: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    min: 0
  },
  height: {
    type: Number,
    min: 0
  },
  photos: [{
    url: String,
    public_id: String
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Create a 2dsphere index on the location field
tagSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Tag', tagSchema); 