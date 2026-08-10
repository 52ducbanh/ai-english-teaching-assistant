# AI ENGLISH TEACHING ASSISTANT

An AI-powered English teaching assistant platform that helps teachers prepare lesson materials faster and teach with more confidence.

Teachers can select a subject, grade, and lesson to view core learning content, then use Gemini AI to create vocabulary, communication patterns, student questions, lesson summaries, and learning objectives.

---

## 🎯 FEATURES

- Select subject, grade, and lesson before preparing materials.
- View lesson-based vocabulary, communication patterns, and suggested student questions.
- Chat with an AI teaching assistant that understands the selected lesson context.
- Generate quick teaching materials with one click:
  - Vocabulary lists with Vietnamese meanings
  - Communication patterns and short examples
  - Suggested student questions and answers
  - Lesson summaries
  - Learning objectives
- Keep a short, local conversation history for a more natural AI chat experience.
- Render AI responses as Markdown for easier reading.
- Use responsive UI for desktop and smaller screens.

> **Note:** AI can help prepare materials, but teachers should review and adjust the output before using it in class.

---

## 🛠 TECHNOLOGIES

### Frontend

- React 19
- TypeScript
- Vite
- React Router
- React Markdown
- CSS Modules

### Backend

- NestJS 11
- TypeORM
- MySQL 8
- class-validator and class-transformer
- Google Gen AI SDK (`@google/genai`)

### Other Tools

- Docker and Docker Compose
- Render deployment configuration
- Shared TypeScript types in `common/`

---

## 📁 PROJECT STRUCTURE

```text
/
├── asset/                  # Database schema documentation
├── client/                 # React + Vite frontend
│   └── src/
│       ├── components/     # Lesson selector, AI chat, content cards
│       ├── hooks/          # UI and data-fetching logic
│       ├── services/       # Application services
│       └── api/            # HTTP requests to the backend
├── common/                 # Shared TypeScript types
├── server/                 # NestJS + TypeORM backend
│   └── src/
│       ├── modules/        # Assistant, curriculum, and Gemini modules
│       ├── config/         # Environment and database configuration
│       └── database/       # Seed data
├── docker-compose.yml      # Local Docker setup
├── render.yaml             # Render deployment configuration
└── README.md               # Project documentation
```

---

## 🚀 GETTING STARTED

### REQUIREMENTS

- Node.js 20 or newer
- MySQL 8, or Docker Desktop
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

### 1. CLONE THE PROJECT

```bash
git clone https://github.com/52ducbanh/ai-english-teaching-assistant.git
cd ai-english-teaching-assistant
```

### 2. SET UP THE BACKEND

Create an empty MySQL database named `english_assistant_db`, then configure the backend:

```powershell
cd server
copy .env.example .env
npm install
```

Update `server/.env` with your local database credentials and Gemini API key:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_database_password
DB_NAME=english_assistant_db

# Use true only for the first local run to create the tables.
DB_SYNCHRONIZE=true

GEMINI_API_KEY=your_gemini_api_key
GEMINI_MODEL=gemini-3.6-flash
```

Start the backend once, then seed the sample curriculum data in another terminal:

```powershell
npm run start:dev
```

```powershell
cd server
npm run seed
```

After the first setup, set `DB_SYNCHRONIZE=false` in `server/.env`.

### 3. SET UP THE FRONTEND

Create `client/.env` with the following values to use your local backend instead of mock data:

```env
VITE_API_URL=http://localhost:3000
VITE_USE_MOCK=false
```

Then run the frontend:

```powershell
cd client
npm install
npm run dev
```

Open the URL shown by Vite, normally `http://localhost:5173`.

---

## ⚙️ ENVIRONMENT VARIABLES

| Variable | Description |
| --- | --- |
| `DB_HOST` | MySQL host name |
| `DB_PORT` | MySQL port, normally `3306` |
| `DB_USERNAME` | MySQL user name |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `DB_SYNCHRONIZE` | Creates schema automatically in local development only |
| `GEMINI_API_KEY` | Server-side Gemini API key for AI chat |
| `GEMINI_MODEL` | Gemini model name, default: `gemini-3.6-flash` |
| `GEMINI_TIMEOUT_MS` | Optional Gemini request timeout |
| `GEMINI_MAX_OUTPUT_TOKENS` | Optional output token limit |
| `GEMINI_THINKING_LEVEL` | Optional Gemini thinking level |
| `VITE_API_URL` | Frontend API base URL |
| `VITE_USE_MOCK` | Set to `false` to load curriculum and assistant data from the API |

> **Security note:** Never commit `.env` files or put a Gemini key in a `VITE_*` variable. If a key is exposed, rotate it in Google AI Studio immediately.

---

## 🔌 API OVERVIEW

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/` | Health check |
| `GET` | `/curriculum/subjects` | Get available subjects |
| `GET` | `/curriculum/subjects/:subjectId/grades` | Get grades for a subject |
| `GET` | `/curriculum/lessons?subjectId=&gradeId=` | Get lessons for a selected subject and grade |
| `GET` | `/assistant?subjectId=&gradeId=&lessonId=` | Get lesson materials |
| `POST` | `/assistant/chat` | Send a lesson-aware message to Gemini AI |

Example request for the AI assistant:

```json
{
  "subjectId": 1,
  "gradeId": 1,
  "lessonId": 1,
  "message": "Create 5 communication patterns for this lesson with Vietnamese meanings.",
  "history": []
}
```

---

## 🐳 RUN WITH DOCKER

Create a root `.env` file with your local values:

```env
DB_PASSWORD=your_database_password
GEMINI_API_KEY=your_gemini_api_key
```

Then start all services:

```bash
docker compose up --build
```

- Frontend: `http://localhost`
- Backend: `http://localhost:3000`

---

## 🌐 DEPLOYMENT

This project includes `render.yaml` for deployment on Render.

1. Create a new Blueprint on Render from this repository.
2. Add the database variables and `GEMINI_API_KEY` in the Render dashboard.
3. Deploy the backend and frontend services.

---

## 👤 AUTHOR

**Tran Vu Duc (Alex Tran)** | Student at University of Engineering and Technology (UET), VNU Hanoi.  
📧 Email: 52ducbanh@gmail.com  
🌐 GitHub: [github.com/52ducbanh](https://github.com/52ducbanh)  
📘 Facebook: [Vu Duc (Alex Tran)](https://www.facebook.com/52ducbanh)

Happy Teaching! 🎓
