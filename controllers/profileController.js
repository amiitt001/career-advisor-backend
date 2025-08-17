const db = require('../database.js');

const createProfile = async (req, res) => {
    try {
        const profileData = req.body;
        if (!profileData.uid) {
            return res.status(400).json({ error: 'UID is missing from the request.' });
        }
        await db.collection('profiles').doc(profileData.uid).set(profileData);
        res.status(201).json({ message: 'Profile saved successfully!', uid: profileData.uid });
    } catch (error) {
        console.error("Error saving profile:", error);
        res.status(500).json({ error: 'Failed to save profile.' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const { uid } = req.params;
        const dataToUpdate = req.body;
        if (!uid) {
            return res.status(400).json({ error: 'UID is missing.' });
        }
        await db.collection('profiles').doc(uid).update(dataToUpdate);
        res.status(200).json({ message: 'Profile updated successfully!', uid: uid });
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: 'Failed to update profile.' });
    }
};

module.exports = { createProfile, updateProfile };