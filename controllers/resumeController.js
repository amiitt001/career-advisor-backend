const { Storage } = require('@google-cloud/storage');
const db = require('../database.js');
const { extractSkillsFromResume } = require('../services/resumeParser.js');

const storage = new Storage();
const bucketName = 'Trial-bucket-project'; // Make sure this is correct
const bucket = storage.bucket(bucketName);

const uploadResume = async (req, res) => {
    try {
        if (!req.file) return res.status(400).send('No file uploaded.');
        if (!req.params.uid) return res.status(400).send('No user ID provided.');

        const uid = req.params.uid;
        const blob = bucket.file(`resumes/${uid}-${Date.now()}-${req.file.originalname}`);
        const blobStream = blob.createWriteStream();

        blobStream.on('error', (err) => {
            console.error('Error in Blob Stream:', err);
            res.status(500).send({ message: err.message });
        });

        blobStream.on('finish', async () => {
            try {
                const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
                const foundSkills = await extractSkillsFromResume(bucket.name, blob.name);
                await db.collection('profiles').doc(uid).update({
                    resumeUrl: publicUrl,
                    extractedSkills: foundSkills,
                    resumeLastUpdated: new Date().toISOString()
                });
                res.status(200).send({
                    message: 'File uploaded and skills extracted successfully.',
                    url: publicUrl,
                    skills: foundSkills
                });
            } catch (finishError) {
                console.error('Error during finish event:', finishError);
                res.status(500).send({ message: 'Error finalizing upload.' });
            }
        });

        blobStream.end(req.file.buffer);
    } catch (err) {
        console.error('Error in upload route:', err);
        res.status(500).send({ message: err.message });
    }
};

module.exports = { uploadResume };