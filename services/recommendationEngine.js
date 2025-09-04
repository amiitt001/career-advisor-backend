const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI
const vertex_ai = new VertexAI({
  project: 'career-and-skills-advisor', // Use your actual project ID
  location: 'asia-south1',
});

const model = 'gemini-1.5-pro'; // Use a powerful and fast model

// Configure the generative model
const generativeModel = vertex_ai.getGenerativeModel({
  model: model,
  generationConfig: {
    maxOutputTokens: 8192,
    temperature: 0.3, // Lower temperature for more predictable, structured output
    topP: 0.95,
  },
});

async function getCareerRecommendations(userProfile) {
  const stringifiedProfile = JSON.stringify(userProfile, null, 2);

  // This is the prompt that instructs the AI. It's the most important part!
  const prompt = `
  You are an expert career and skills advisor for students in India. 
  Your task is to analyze the following student profile and provide 3 personalized, actionable career path recommendations.

  Student Profile:
  ${stringifiedProfile}

  Based on this profile, generate 3 distinct career recommendations. Your response MUST be a valid JSON array of objects. Do not include any text or markdown formatting like \`\`\`json before or after the array. Each object in the array must have the following exact keys:
  - "title": A string for the career path title (e.g., "AI/ML Engineer").
  - "overview": A string (1-2 sentences) providing a brief, engaging overview of the role.
  - "whyGoodFit": A string (2-3 sentences) explaining why this path is a great fit, referencing the student's specific interests and skills.
  - "keySkillsRequired": An array of strings listing the most important technical and soft skills for this role.
  - "skillGapsForUser": An array of strings listing the skills from "keySkillsRequired" that the student appears to be missing.
  - "howToGetStarted": An array of strings with 2-3 actionable first steps for the student.
  - "averageSalaryIndiaLPA": A string estimating the average starting salary in India (e.g., "5-8 Lakhs p.a.").
  - "dayInTheLifeSummary": A string (2-3 sentences) giving a brief summary of the daily tasks and responsibilities.
`;

  console.log("Sending prompt to Gemini AI...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);

  // Extract and clean the JSON response from the AI
  const jsonResponse = resp.response.candidates[0].content.parts[0].text
    .replace(/```json/g, '')
    .replace(/```/g, '');

  console.log("Received AI response.");
  return JSON.parse(jsonResponse);
}
// Add this new function
async function compareCareerPaths(career1, career2) {
  const stringifiedCareers = JSON.stringify({ career1, career2 }, null, 2);

const prompt = `
  You are an expert career counselor in India. Your task is to provide a detailed, side-by-side comparison of the two following career paths for a student.

  Career Paths to Compare:
  ${stringifiedCareers}

  Your response MUST be a single, valid JSON object. Do not include any text, notes, or markdown formatting before or after the JSON. The object must have the following exact keys:
  - "career1_title": A string for the first career path title.
  - "career2_title": A string for the second career path title.
  - "comparisonPoints": An array of objects, where each object has these three keys:
    - "metric": A string for the comparison point (e.g., "Day-to-Day Responsibilities", "Average Starting Salary (India)", "Core Skills").
    - "career1_details": A string describing the details for the first career.
    - "career2_details": A string describing the details for the second career.
`;
  console.log("Sending comparison prompt to Gemini AI...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);

  const comparisonText = resp.response.candidates[0].content.parts[0].text;
  console.log("Received AI comparison.");
  return comparisonText;
}

module.exports = {  getCareerRecommendations, compareCareerPaths };