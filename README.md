# Personalized Career & Skills Advisor (Backend)

This is the backend server for the AI-powered Career and Skills Advisor application. It handles user profiles, assessments, resume processing, and communication with the Google Gemini AI to generate personalized career recommendations.

## ✨ Key Features

### Future Scope

This project has significant potential for expansion into a full-fledged career development platform. Future enhancements include:

- **Full User Authentication:** Implement a complete login/signup system to allow multiple users to save and manage their profiles securely.

- **AI Project Generator:** A unique feature where the AI suggests personalized portfolio projects based on a user's recommended career and personal interests, helping them build practical experience. 
 
- **AI Resume Co-Pilot:** Go beyond skill extraction and use generative AI to help users transform simple descriptions of their experiences into professional, impactful bullet points for their resume.

- **AI-Powered Interview Prep:** A tool to generate common interview questions for a recommended career path and provide coaching on how to best answer them based on the user's specific skill set.

- **Career Comparison Tool:** Allow users to select two recommended careers and receive a detailed, AI-generated comparison of day-to-day responsibilities, salary expectations in India, and long-term growth prospects.
 
- **Hyper-Localized Learning:** Enhance the learning path suggestions to include resources from Indian educational initiatives (like NPTEL) and tutorials available in regional languages.

- **User Feedback Loop:** Allow users to rate their recommendations, providing valuable data to further fine-tune the AI prompts and improve results over time.
## 🌟 Vision & Social Impact

Our vision is to empower every student in India with the clarity and confidence to choose a fulfilling career path. By leveraging the power of generative AI, this platform democratizes access to high-quality, personalized career counseling, helping to bridge the gap between education and employment and enabling the next generation to realize their full potential.

## 🛠️ Tech Stack

- **Framework:** Node.js, Express.js
- **Database:** Google Firestore (NoSQL)
- **File Storage:** Google Cloud Storage
- **AI:** Google Cloud Vertex AI (Gemini 1.5 Flash)
- **Libraries:** `firebase-admin`, `@google-cloud/storage`, `@google-cloud/vertexai`, `multer`, `pdf-parse`

## 🚀 Getting Started & How to Test

Follow these instructions to set up and run the backend server for testing.

### 1. Prerequisites

- Node.js (LTS version recommended).
- A Google Cloud project with **billing enabled**.
- The following APIs enabled in your Google Cloud project:
  - Firestore API
  - Cloud Storage API
  - Vertex AI API
- A Google Cloud Service Account with the following IAM roles: `Cloud Datastore User`, `Storage Object Admin`, and `Vertex AI User`.

### 2. Setup

1.  **Clone the Repository:**
    ```sh
    git clone [https://github.com/amiitt001/career-advisor-backend.git](https://github.com/amiitt001/career-advisor-backend.git)
    cd career-advisor-backend
    ```
2.  **Install Dependencies:**
    ```sh
    npm install
    ```
3.  **Configure Environment:**
    - Download the JSON key for your Service Account.
    - Create a file named `.env` in the root of the project.
    - Add the following line to the `.env` file, replacing the path with the actual path to your downloaded key file on your machine:
      ```
      GOOGLE_APPLICATION_CREDENTIALS=C:\path\to\your\service-account-key.json
      ```
4.  **Run the Server:**
    ```sh
    npm run dev
    ```
The server will start on `http://localhost:5000`.

### Setup

1. Clone the repository:
   ```sh
   git clone [https://github.com/amiitt001/career-advisor-backend.git](https://github.com/amiitt001/career-advisor-backend.git)
   cd career-advisor-backend