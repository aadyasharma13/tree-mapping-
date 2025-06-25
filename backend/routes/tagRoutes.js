const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tagController = require('../controllers/tagController');
const { upload, processUploadedFiles } = require('../middleware/upload');

// GET /api/tags - Get all tags
router.get('/', tagController.getTags);

// GET /api/tags/area - Get tags by geographic area
router.get('/area', tagController.getTagsByArea);

// GET /api/tags/:id - Get a single tag
router.get('/:id', tagController.getTagById);

// POST /api/tags - Create a new tag
router.post('/', 
  upload.array('photos', 5), // Allow up to 5 photos
  processUploadedFiles, // Process uploaded files to add URLs
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('treeType', 'Tree type is required').not().isEmpty(),
    check('lng', 'Longitude is required').isNumeric(),
    check('lat', 'Latitude is required').isNumeric()
  ],
  tagController.createTag
);

// PUT /api/tags/:id - Update a tag
router.put('/:id',
  [
    check('title', 'Title is required').optional().not().isEmpty(),
    check('description', 'Description is required').optional().not().isEmpty(),
    check('treeType', 'Tree type is required').optional().not().isEmpty()
  ],
  tagController.updateTag
);

// DELETE /api/tags/:id - Delete a tag
router.delete('/:id', tagController.deleteTag);

module.exports = router; 