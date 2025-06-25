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
    const tag = await Tag.findById(req.params.id);
    
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
    const { title, description, treeType, age, height, lng, lat } = req.body;
    
    // Initialize new tag
    const newTag = new Tag({
      title,
      description,
      treeType,
      location: {
        type: 'Point',
        coordinates: [parseFloat(lng), parseFloat(lat)]
      }
    });
    
    // Add optional fields if provided
    if (age) newTag.age = age;
    if (height) newTag.height = height;
    
    // Add user reference if authentication is implemented
    if (req.user) {
      newTag.createdBy = req.user.id;
    }
    
    // Add photos if available
    if (req.files && req.files.length > 0) {
      newTag.photos = req.files.map(file => ({
        url: file.path, // This will be updated in the upload middleware
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
    const { title, description, treeType, age, height } = req.body;
    
    // Find tag by ID
    let tag = await Tag.findById(req.params.id);
    
    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    // Update the fields
    if (title) tag.title = title;
    if (description) tag.description = description;
    if (treeType) tag.treeType = treeType;
    if (age) tag.age = age;
    if (height) tag.height = height;
    
    await tag.save();
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
    
    await tag.remove();
    res.json({ message: 'Tag removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}; 