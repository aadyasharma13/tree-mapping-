const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const tagController = require('../controllers/tagController');
const { upload, processUploadedFiles } = require('../middleware/upload');
const { protect } = require('../middleware/auth');

// GET /api/tags - Get all tags
router.get('/', tagController.getTags);

// GET /api/tags/area - Get tags by geographic area
router.get('/area', tagController.getTagsByArea);

// GET /api/tags/:id - Get a single tag
router.get('/:id', tagController.getTagById);

// GET /api/tags/stats/health - Get health statistics for all trees
router.get('/stats/health', tagController.getHealthStatistics);

// GET /api/tags/stats/species - Get species distribution statistics
router.get('/stats/species', tagController.getSpeciesDistribution);

// GET /api/tags/events/upcoming - Get upcoming community events
router.get('/events/upcoming', tagController.getUpcomingEvents);

// POST /api/tags - Create a new tag
router.post('/', 
  upload.array('photos', 5), // Allow up to 5 photos
  processUploadedFiles,
  [
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('species', 'Tree species is required').optional(),
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
    check('species', 'Species is required').optional().not().isEmpty(),
    check('treeType', 'Tree type is required').optional().not().isEmpty()
  ],
  tagController.updateTag
);

// POST /api/tags/:id/health - Add health record to a tag
router.post('/:id/health',
  protect,
  [
    check('status', 'Health status is required').isIn(['excellent', 'good', 'fair', 'poor', 'critical']),
    check('notes', 'Notes are required').not().isEmpty()
  ],
  tagController.addHealthRecord
);

// POST /api/tags/:id/seasonal - Add seasonal observation to a tag
router.post('/:id/seasonal',
  protect,
  [
    check('observationType', 'Observation type is required').isIn(['flowering', 'fruiting', 'leafChange', 'budding', 'other']),
    check('notes', 'Notes are required').not().isEmpty()
  ],
  tagController.addSeasonalObservation
);

// POST /api/tags/:id/events - Add community event to a tag
router.post('/:id/events',
  protect,
  [
    check('eventType', 'Event type is required').isIn(['planting', 'maintenance', 'educational', 'cleanup', 'other']),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('date', 'Valid date is required').optional().isISO8601()
  ],
  tagController.addCommunityEvent
);

// POST /api/tags/:id/management - Add management activity to a tag
router.post('/:id/management',
  protect,
  [
    check('activityType', 'Activity type is required').isIn(['watering', 'pruning', 'fertilizing', 'treatment', 'mulching', 'other']),
    check('notes', 'Notes are required').not().isEmpty(),
    check('date', 'Valid date is required').optional().isISO8601()
  ],
  tagController.addManagementActivity
);

// POST /api/tags/:tagId/events/:eventId/join - Join community event
router.post('/:tagId/events/:eventId/join',
  protect,
  tagController.joinCommunityEvent
);

// DELETE /api/tags/:id - Delete a tag
router.delete('/:id', protect, tagController.deleteTag);

module.exports = router; 