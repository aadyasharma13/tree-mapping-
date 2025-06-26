const Tag = require('../models/Tag');
const { validationResult } = require('express-validator');

// Get all tags
exports.getTags = async (req, res) => {
  try {
    const tags = await Tag.find({ status: 'approved' });
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tags within a specific area
exports.getTagsByArea = async (req, res) => {
  const { lng, lat, radius = 5000 } = req.query; // radius in meters
  
  try {
    const tags = await Tag.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(radius)
        }
      },
      status: 'approved'
    });
    
    res.json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get a specific tag by ID
exports.getTagById = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id)
      .populate('createdBy', 'name email')
      .populate('healthHistory.recordedBy', 'name')
      .populate('seasonalObservations.recordedBy', 'name')
      .populate('communityEvents.organizer', 'name')
      .populate('communityEvents.participants', 'name')
      .populate('managementHistory.performedBy', 'name');
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new tag
exports.createTag = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { 
      title, 
      description, 
      treeType, 
      species, 
      age, 
      height, 
      dbh,
      healthStatus,
      lng, 
      lat 
    } = req.body;
    
    // Initialize new tag
    const newTag = new Tag({
      title,
      description,
      species: species || treeType, // Use species if available, otherwise use treeType
      treeType,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      },
      healthStatus: healthStatus || 'good'
    });
    
    // Add optional fields if provided
    if (age) newTag.age = age;
    if (height) newTag.height = height;
    if (dbh) newTag.dbh = dbh;
    
    // Add user reference if authentication is implemented
    if (req.user) {
      newTag.createdBy = req.user.id;
    }
    
    // Add photos if available
    if (req.files && req.files.length > 0) {
      newTag.photos = req.files.map(file => ({
        url: file.url,
        public_id: file.filename
      }));
    }
    
    await newTag.save();
    res.status(201).json(newTag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a tag
exports.updateTag = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  try {
    const { 
      title, 
      description, 
      treeType,
      species, 
      age, 
      height,
      dbh,
      healthStatus
    } = req.body;
    
    // Find tag by ID
    let tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Update the fields
    if (title) tag.title = title;
    if (description) tag.description = description;
    if (species) tag.species = species;
    if (treeType) tag.treeType = treeType;
    if (age) tag.age = age;
    if (height) tag.height = height;
    if (dbh) tag.dbh = dbh;
    if (healthStatus) tag.healthStatus = healthStatus;
    
    await tag.save();
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add health record to a tag
exports.addHealthRecord = async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    // Find tag by ID
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Create new health record
    const healthRecord = {
      status,
      notes,
      date: new Date(),
      recordedBy: req.user ? req.user.id : null
    };
    
    // Add to health history
    tag.healthHistory.push(healthRecord);
    
    // Update current health status
    tag.healthStatus = status;
    
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add seasonal observation to a tag
exports.addSeasonalObservation = async (req, res) => {
  try {
    const { observationType, startDate, endDate, notes } = req.body;
    
    // Find tag by ID
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Create new seasonal observation
    const observation = {
      observationType,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      notes,
      recordedBy: req.user ? req.user.id : null
    };
    
    // Add to seasonal observations
    tag.seasonalObservations.push(observation);
    
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add community event to a tag
exports.addCommunityEvent = async (req, res) => {
  try {
    const { eventType, title, description, date } = req.body;
    
    // Find tag by ID
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Create new event
    const event = {
      eventType,
      title,
      description,
      date: date ? new Date(date) : new Date(),
      organizer: req.user ? req.user.id : null,
      participants: []
    };
    
    // Add organizer as first participant
    if (req.user) {
      event.participants.push(req.user.id);
    }
    
    // Add to community events
    tag.communityEvents.push(event);
    
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add management activity to a tag
exports.addManagementActivity = async (req, res) => {
  try {
    const { activityType, date, notes } = req.body;
    
    // Find tag by ID
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Create new management activity
    const activity = {
      activityType,
      date: date ? new Date(date) : new Date(),
      notes,
      performedBy: req.user ? req.user.id : null
    };
    
    // Add to management history
    tag.managementHistory.push(activity);
    
    // Update last management date
    tag.lastManagementDate = activity.date;
    
    await tag.save();
    res.status(201).json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Join community event
exports.joinCommunityEvent = async (req, res) => {
  try {
    const { tagId, eventId } = req.params;
    
    // Find tag by ID
    const tag = await Tag.findById(tagId);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Find event
    const event = tag.communityEvents.id(eventId);
    
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    
    // Check if user is already a participant
    if (req.user && !event.participants.includes(req.user.id)) {
      event.participants.push(req.user.id);
      await tag.save();
    }
    
    res.json(tag);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a tag
exports.deleteTag = async (req, res) => {
  try {
    const tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    await Tag.deleteOne({ _id: req.params.id });
    res.json({ message: 'Tag removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tree health statistics
exports.getHealthStatistics = async (req, res) => {
  try {
    const statistics = await Tag.aggregate([
      { $match: { status: 'approved' } },
      { $group: {
        _id: "$healthStatus",
        count: { $sum: 1 }
      }},
      { $sort: { _id: 1 } }
    ]);
    
    res.json(statistics);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get species distribution
exports.getSpeciesDistribution = async (req, res) => {
  try {
    const distribution = await Tag.aggregate([
      { $match: { status: 'approved' } },
      { $group: {
        _id: "$species",
        count: { $sum: 1 }
      }},
      { $sort: { count: -1 } },
      { $limit: 10 } // Top 10 species
    ]);
    
    res.json(distribution);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get upcoming community events
exports.getUpcomingEvents = async (req, res) => {
  try {
    const now = new Date();
    const events = await Tag.aggregate([
      { $unwind: "$communityEvents" },
      { $match: { "communityEvents.date": { $gte: now } } },
      { $sort: { "communityEvents.date": 1 } },
      { $limit: 10 }, // Next 10 events
      { $project: {
        _id: 1,
        title: 1,
        location: 1,
        event: "$communityEvents"
      }}
    ]);
    
    res.json(events);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 