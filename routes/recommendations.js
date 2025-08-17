const express = require('express');
const router = express.Router();
const { generateRecommendations } = require('../controllers/recommendationController.js');

// The route now simply points to the controller function
router.get('/:uid', generateRecommendations);

module.exports = router;