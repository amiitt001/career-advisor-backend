# Personalized Career & Skills Advisor (Backend)

This is the backend server for the AI-powered Career and Skills Advisor application. It handles user profiles, assessments, resume processing, and communication with the Google Gemini AI to generate personalized career recommendations.

## ✨ Key Features

- **User Profile Management:** Create and update user profiles, stored securely in Google Firestore.
- **Resume Processing:** Uploads PDF resumes to Google Cloud Storage and parses them to extract key skills.
- **Skills Assessment:** Stores and retrieves scores from a skills-based quiz.
- **AI Recommendation Engine:** Communicates with Google's Gemini model via Vertex AI to generate tailored career advice based on a user's complete profile.

## 🛠️ Tech Stack

- **Framework:** Node.js, Express.js
- **Database:** Google Firestore (NoSQL)
- **File Storage:** Google Cloud Storage
- **AI:** Google Cloud Vertex AI (Gemini 1.5 Flash)
- **Libraries:** `firebase-admin`, `@google-cloud/storage`, `@google-cloud/vertexai`, `multer`, `pdf-parse`

## 🚀 Getting Started

### Prerequisites

- Node.js and npm installed.
- A Google Cloud project with Firestore, Cloud Storage, and Vertex AI APIs enabled.
- A Google Cloud Service Account key (`.json` file).

### Setup

1. Clone the repository:
   ```sh
   git clone [https://github.com/amiitt001/career-advisor-backend.git](https://github.com/amiitt001/career-advisor-backend.git)
   cd career-advisor-backend