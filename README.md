# NammaConnect — Your Everyday Kannada Companion 🌿

NammaConnect is a beginner-friendly web application designed to help people who are new to Karnataka communicate in Kannada during everyday situations. It provides useful Kannada phrases with English transliteration, English meanings, and audio pronunciation.

**Live Demo:** https://nammaconnect.vercel.app  
**GitHub Repository:** https://github.com/Abhijnashetty07/nammaconnect

---

## 1. Problem Statement

People from different parts of India move to Karnataka for education, work, travel, and other purposes. Those who do not understand Kannada may face communication difficulties in everyday situations, such as asking for directions, travelling by bus, ordering food, or seeking help.

Although translation applications and online dictionaries are available, users may need to search for individual phrases or switch between translation and pronunciation tools. This can make finding a suitable phrase inconvenient, especially when quick communication is needed.

NammaConnect addresses this problem by providing commonly used Kannada phrases in one place, along with pronunciation guidance and English meanings.

## 2. Objectives

- Make basic Kannada phrases easier to access and understand.
- Help beginners learn Kannada pronunciation.
- Organize phrases according to everyday situations.
- Make useful expressions easier to find through search and categories.
- Provide guided, situation-based phrase assistance through Mission Mode.

## 3. Target Users

NammaConnect is intended for:

- Students moving to Karnataka for education.
- Tourists visiting Karnataka.
- Professionals relocating to Karnataka.
- People who are new to the Kannada language.
- Anyone interested in learning basic Kannada for everyday communication.

## 4. Features

### 4.1 Category-Based Phrases
Explore Kannada phrases organized into everyday categories such as travel, food, college, and health.

### 4.2 Kannada Text and English Transliteration
Each supported phrase displays Kannada text and an English-letter pronunciation guide to help beginners read it.

### 4.3 English Meaning
Understand the meaning of each phrase through its English translation.

### 4.4 Audio Pronunciation
Listen to available audio recordings to become familiar with Kannada pronunciation.

### 4.5 Search
Find relevant phrases more easily without browsing through every category.

### 4.6 Saved Phrases
Keep useful phrases accessible for later reference.

### 4.7 Practice
Use the practice section to become more familiar with everyday Kannada expressions.

### 4.8 Mission Mode
Mission Mode provides guided, situation-based phrase assistance to help users find expressions that match their communication needs.

### 4.9 Urgency Support
Find relevant phrases for situations where communication is important, such as asking for help or locating a hospital.

*Note: NammaConnect provides language assistance and does not replace emergency services or professional medical assistance.*

## 5. What Makes NammaConnect Different?

NammaConnect focuses on practical communication rather than only translating individual words.

Its approach combines:

- Situation-based phrase categories.
- Kannada text with English transliteration.
- English meanings.
- Audio pronunciation.
- Phrase search and saved phrases.
- Guided phrase discovery through Mission Mode.

This combination aims to help users access useful Kannada expressions conveniently in everyday situations.

## 6. Technology Stack

| Technology | Purpose |
|---|---|
| React | Building the user interface |
| JavaScript | Implementing application interactions |
| HTML | Structuring the web application |
| CSS | Styling the interface |
| Vite | Development server and build tool |
| MP3 audio files | Providing pronunciation recordings |
| Git | Version control |
| GitHub | Hosting the source code |
| Vercel | Deploying the web application |

## 7. Application Workflow

1. The user opens NammaConnect.
2. The user browses a category, searches for a phrase, or enters Mission Mode.
3. The application displays the relevant Kannada phrase.
4. The user reads the transliteration and English meaning.
5. The user listens to the available audio pronunciation.
6. The user continues exploring phrases based on their needs.

### Architecture Diagram

```text
             USER
               |
               v
     +--------------------+
     | React User         |
     | Interface          |
     +--------------------+
               |
               v
     +--------------------+
     | Application Logic  |
     | Categories, Search,|
     | and Mission Mode   |
     +--------------------+
               |
               v
     +--------------------+
     |    Phrase Data     |
     +--------------------+
          |          |
          v          v
   +-------------+ +-------------+
   | Kannada     | | Local MP3   |
   | Phrase Info | | Audio Files |
   +-------------+ +-------------+
          |          |
          v          v
     +--------------------+
     | Phrase Display and  |
     | Audio Pronunciation|
     +--------------------+
```

*Architecture note: This represents the frontend application flow. It does not imply that a backend server or AI translation service is implemented.*

## 8. Project Structure

The repository contains the README at its root and the Vite application in the nested `nammaconnect` directory.

```text
nammaconnect/
├── README.md
└── nammaconnect/
    ├── public/
    │   └── audio/
    │       ├── 1.mp3
    │       ├── 2.mp3
    │       └── ...
    ├── src/
    ├── package.json
    ├── package-lock.json
    └── vite.config.js
```

The exact files inside `src` may vary according to the current implementation.

## 9. Installation and Setup

Follow these steps to run the project locally.

### Prerequisites

Install:

- [Node.js](https://nodejs.org/)
- npm, which is included with Node.js
- [Git](https://git-scm.com/)

### Step 1: Clone the Repository

Open a terminal and run:

```bash
git clone https://github.com/Abhijnashetty07/nammaconnect.git
```

### Step 2: Navigate to the Application Directory

```bash
cd nammaconnect/nammaconnect
```

### Step 3: Install Dependencies

```bash
npm install
```

### Step 4: Start the Development Server

```bash
npm run dev
```

Open the local address displayed in your terminal. With the default Vite configuration, it is usually:

```text
http://localhost:5173
```

### Step 5: Build the Application

To create a production build, run:

```bash
npm run build
```

If the build succeeds, the generated production files are placed in the `dist` directory.

## 10. Environment Variables and Security

The current application does not require environment variables if it uses only its local phrase data and audio files.

- Never commit passwords, private tokens, or API keys to GitHub.
- If environment variables are introduced in the future, keep real values in a local `.env` file.
- Add `.env` to `.gitignore`.
- Provide a `.env.example` containing only the required variable names and placeholder values if the project needs environment variables.

Do not add unnecessary API keys or environment files when the application does not need them.

## 11. Deployment

The project is built using Vite and can be deployed through Vercel.

- **Live Demo:** https://nammaconnect.vercel.app
- **Source Code:** https://github.com/Abhijnashetty07/nammaconnect

The Vite application is located in the nested `nammaconnect` directory. When configuring Vercel, set the project root directory to `nammaconnect` if deploying from the repository root.

Before submission, verify that the live demo opens in a private browser window without requiring visitors to sign in to Vercel.

## 12. Limitations

- The available phrase collection covers a limited number of everyday situations.
- The application focuses on supported Kannada phrases rather than unrestricted translation.
- Audio pronunciation is available only for phrases with corresponding recordings.
- The urgency section provides language support, not emergency response services.
- Additional languages and expanded learning features may be considered in future versions.

## 13. Future Scope

Potential future improvements include:

- Expanding the phrase library.
- Adding more audio pronunciation recordings.
- Introducing interactive quizzes and progress tracking.
- Supporting additional Indian languages.
- Improving Mission Mode with more everyday scenarios.
- Exploring offline access to selected phrases.
- Improving accessibility and usability based on user feedback.

These are possible future enhancements, not claims about features already implemented.

## 14. Conclusion

NammaConnect aims to reduce everyday language barriers by helping people who are new to Karnataka access useful Kannada phrases more conveniently. By combining Kannada text, English transliteration, meanings, audio pronunciation, and situation-based navigation, it offers a practical starting point for everyday communication.

**NammaConnect — Connect with Karnataka, one Kannada phrase at a time! 🌿**
