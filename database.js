const admin = require('firebase-admin');

let db;

try {
  console.log("Attempting to initialize Firebase Admin SDK...");

  admin.initializeApp();

  db = admin.firestore();

  console.log("Firestore connected successfully!");

} catch (error) {
  console.error("!!!!!!!!!! FIREBASE INITIALIZATION FAILED !!!!!!!!!!");
  console.error("This is the critical error message:");
  console.error(error);
  console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");

  process.exit(1); 
}

module.exports = db;