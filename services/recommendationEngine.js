const { VertexAI } = require('@google-cloud/vertexai');

// Initialize Vertex AI
const vertex_ai = new VertexAI({
  project: 'career-and-skills-advisor-34d4ba44778f', // Use your actual project ID
  location: 'asia-south1',
});

const model = 'gemini-1.5-flash-001'; // Use a powerful and fast model

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

    Based on this profile, generate 3 distinct career recommendations. For each recommendation, consider the student's interests and skills (both self-declared and those extracted from their resume).

    Your response MUST be a valid JSON array of objects. Do not include any text, notes, or markdown formatting like \`\`\`json before or after the JSON array. The array should contain exactly 3 objects. Each object must have the following exact keys:
    - "title": A string for the career path title (e.g., "AI/ML Engineer").
    - "reason": A string (2-3 sentences) explaining why this path is a great fit for the student, referencing their specific interests and skills.
    - "required_skills": An array of strings listing the key technical and soft skills required for this role in the Indian job market.
    - "skill_gaps": An array of strings listing the skills from "required_skills" that the student appears to be missing from their profile.
    - "learning_path": A short string (2-3 sentences) suggesting a starting point for the student to bridge their skill gaps, like specific types of online courses, projects, or certifications.
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

module.exports = { getCareerRecommendations };