const express = require('express');
const router = express.Router();
const { generateRecommendations, compareCareers } = require('../controllers/recommendationController.js');


// The route now simply points to the controller function
router.get('/:uid', generateRecommendations);
router.post('/compare', compareCareers);

module.exports = router;