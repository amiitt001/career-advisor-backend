const express = require('express');
const router = express.Router();
const { createProfile, updateProfile } = require('../controllers/profileController.js');

router.post('/', createProfile);
router.patch('/:uid', updateProfile);

module.exports = router;