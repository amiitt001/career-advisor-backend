const express = require('express');
const multer = require('multer');
const { Storage } = require('@google-cloud/storage');
const db = require('../database.js');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb limit
  },
});

const storage = new Storage();
const bucketName = 'career-and-skills-advisor-resumes'; // Make sure this is your correct, unique bucket name
const bucket = storage.bucket(bucketName);

router.post('/upload/:uid', upload.single('resume'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    if (!req.params.uid) {
        return res.status(400).send('No user ID provided.');
    }

    const uid = req.params.uid;
    const blob = bucket.file(`resumes/${uid}-${Date.now()}-${req.file.originalname}`);
    const blobStream = blob.createWriteStream();

    blobStream.on('error', (err) => {
      // --- FIX #1: ADDED CONSOLE.ERROR HERE ---
      console.error('Error in Blob Stream:', err);
      res.status(500).send({ message: err.message });
    });

    blobStream.on('finish', async () => {
      try {
        
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        await db.collection('profiles').doc(uid).update({ resumeUrl: publicUrl });
        
        res.status(200).send({
          message: 'File uploaded successfully.',
          url: publicUrl,
        });
      } catch (finishError) {
        console.error('Error during finish event:', finishError);
        res.status(500).send({ message: 'Error finalizing upload.' });
      }
    });

    blobStream.end(req.file.buffer);

  } catch (err) {
    // --- FIX #2: ADDED CONSOLE.ERROR HERE ---
    console.error('Error in upload route:', err);
    res.status(500).send({ message: err.message });
  }
});

module.exports = router;