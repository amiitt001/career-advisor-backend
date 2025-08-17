const express = require('express');
const multer = require('multer');
const router = express.Router();
const { uploadResume } = require('../controllers/resumeController.js');

const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/upload/:uid', upload.single('resume'), uploadResume);

module.exports = router;