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
  species: {
    type: String,
    required: true,
    trim: true
  },
  treeType: {
    type: String,
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
  },
  healthStatus: {
    type: String,
    enum: ['excellent', 'good', 'fair', 'poor', 'critical'],
    default: 'good'
  },
  healthHistory: [{
    status: {
      type: String,
      enum: ['excellent', 'good', 'fair', 'poor', 'critical']
    },
    notes: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
  seasonalObservations: [{
    observationType: {
      type: String,
      enum: ['flowering', 'fruiting', 'leafChange', 'budding', 'other']
    },
    startDate: Date,
    endDate: Date,
    notes: String,
    recordedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  communityEvents: [{
    eventType: {
      type: String,
      enum: ['planting', 'maintenance', 'educational', 'cleanup', 'other']
    },
    title: String,
    description: String,
    date: Date,
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    participants: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }],
  managementHistory: [{
    activityType: {
      type: String,
      enum: ['watering', 'pruning', 'fertilizing', 'treatment', 'mulching', 'other']
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String,
    performedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  dbh: {
    type: Number,
    min: 0
  },
  lastManagementDate: {
    type: Date
  }
}, {
  timestamps: true
});

// Create a 2dsphere index on the location field
tagSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Tag', tagSchema); 