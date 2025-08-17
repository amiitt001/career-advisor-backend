const { Storage } = require('@google-cloud/storage');
const pdf = require('pdf-parse');

const storage = new Storage();

// A predefined list of skills to search for in the resume text.
// You can expand this list significantly.
const SKILLS_LIST = [
  'javascript', 'python', 'java', 'c++', 'c#', 'ruby', 'go', 'typescript',
  'react', 'angular', 'vue', 'next.js', 'node.js', 'express', 'django', 'flask',
  'sql', 'mysql', 'postgresql', 'mongodb', 'firebase', 'firestore',
  'html', 'css', 'sass', 'tailwind',
  'git', 'docker', 'kubernetes', 'aws', 'gcp', 'azure',
  'machine learning', 'data science', 'artificial intelligence', 'ai', 'ml',
  'tensorflow', 'pytorch', 'scikit-learn', 'pandas', 'numpy',
  'product management', 'agile', 'scrum', 'project management'
];

async function extractSkillsFromResume(bucketName, fileName) {
  console.log(`Downloading resume from gs://${bucketName}/${fileName}`);

  // 1. Download the file from GCS into a memory buffer
  const [buffer] = await storage.bucket(bucketName).file(fileName).download();

  console.log('File downloaded. Parsing PDF text...');

  // 2. Parse the PDF buffer to extract text
  const data = await pdf(buffer);
  const resumeText = data.text.toLowerCase(); // Convert to lowercase for easy matching

  // 3. Find which skills from our list are present in the resume text
  const foundSkills = SKILLS_LIST.filter(skill => resumeText.includes(skill));

  console.log('Found skills:', foundSkills);
  return [...new Set(foundSkills)]; // Use a Set to remove duplicates
}

module.exports = { extractSkillsFromResume };