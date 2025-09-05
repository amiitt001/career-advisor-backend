const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI - Make sure this is your active project ID and location
const vertex_ai = new VertexAI({
  project: 'byte-busters-career-advisor', // Use your active project ID
  location: 'asia-south1',
});

const model = 'gemini-1.0-pro'; // The stable model we know works

const generativeModel = vertex_ai.getGenerativeModel({ model: model });

async function getCareerRecommendations(userProfile) {
  const stringifiedProfile = JSON.stringify(userProfile, null, 2);
  const prompt = `
    You are an expert career and skills advisor for students in India. 
    Your task is to analyze the following student profile and provide 3 personalized, actionable career path recommendations.
    Student Profile:
    ${stringifiedProfile}
    Your response MUST be a valid JSON array of objects. Do not include any text or markdown formatting. Each object must have these exact keys: "title", "overview", "whyGoodFit", "keySkillsRequired", "skillGapsForUser", "howToGetStarted", "averageSalaryIndiaLPA", "dayInTheLifeSummary".
  `;
  console.log("Sending prompt to Gemini AI for recommendations...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);
  const jsonResponse = resp.response.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '');
  console.log("Received AI response.");
  return JSON.parse(jsonResponse);
}

async function compareCareerPaths(career1, career2) {
  const stringifiedCareers = JSON.stringify({ career1, career2 }, null, 2);
  const prompt = `
    You are an expert career counselor in India. Your task is to provide a detailed, side-by-side comparison of two career paths.
    Your response MUST be a single, valid JSON object with these keys: "career1_title", "career2_title", "comparisonPoints" (which is an array of objects with keys "metric", "career1_details", "career2_details").
  `;
  console.log("Sending comparison prompt to Gemini AI...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);
  const jsonResponse = resp.response.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '');
  console.log("Received AI comparison.");
  return JSON.parse(jsonResponse);
}

async function generateProjectIdea(careerRecommendation, userInterests) {
  const prompt = `
    You are an expert tech mentor. Generate a single, specific portfolio project idea for a student recommended for the career of "${careerRecommendation.title}" with interests in "${userInterests.join(', ')}".
    Your response MUST be a single, valid JSON object with these keys: "projectTitle", "projectDescription", "technologiesToUse", "learningOutcomes".
  `;
  console.log("Sending project generation prompt to Gemini AI...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);
  const jsonResponse = resp.response.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '');
  console.log("Received AI project idea.");
  return JSON.parse(jsonResponse);
}

async function generateQuiz(careerTitle) {
  const prompt = `
    You are a technical assessor. Create a 5-question multiple-choice quiz for a junior-level "${careerTitle}".
    Your response MUST be a valid JSON array of objects, where each object has these keys: "question", "options" (an array of 4), and "correctAnswer".
  `;
  console.log(`Sending quiz generation prompt for: ${careerTitle}`);
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);
  const jsonResponse = resp.response.candidates[0].content.parts[0].text.replace(/```json/g, '').replace(/```/g, '');
  console.log("Received AI-generated quiz.");
  return JSON.parse(jsonResponse);
}

async function suggestQuizTopic(userProfile) {
  const stringifiedProfile = JSON.stringify({ interests: userProfile.interests, skills: userProfile.skills });
  const prompt = `
    Based on this user profile: ${stringifiedProfile}. Suggest a single, specific job title for a skills quiz.
    Your response MUST be only the job title string and nothing else.
  `;
  console.log("Sending prompt to suggest a quiz topic...");
  const request = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const resp = await generativeModel.generateContent(request);
  const topic = resp.response.candidates[0].content.parts[0].text.trim();
  console.log(`Received AI quiz topic suggestion: ${topic}`);
  return topic;
}

module.exports = { 
  getCareerRecommendations, 
  compareCareerPaths, 
  generateProjectIdea, 
  generateQuiz,
  suggestQuizTopic 
};