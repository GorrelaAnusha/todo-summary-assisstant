<h1>📋 Todo Summary Assistant</h1>

A full-stack to-do app with AI-generated summaries and Slack integration.

<h3>🛠 Tech Stack</h3>
Frontend: React (frontend/todo-summary-frontend)
<br>
Backend: Spring Boot (backend/todoapp)

LLM: OpenAI API

Slack: Slack Incoming Webhook

Database: H2 (in-memory)

<h3>🚀 Features</h3>
Add, edit, delete to-do items

View pending todos

Generate summary using OpenAI

Post summary to Slack channel

<h3>🧪 API Endpoints</h3>

GET /todos – Get all todos

POST /todos – Add a todo

DELETE /todos/{id} – Delete a todo

POST /summarize – Generate and send summary


<h3>🚀 Setup Instructions</h3>



1. Backend Setup (Spring Boot)<br>
cd backend/todoapp <br>
Run the backend server:
    ./mvnw spring-boot:run
  <br>
   2. Frontend Setup (React)
    <br>
   cd frontend/todo-summary-frontend <br>
   npm install <br>
   npm start <br>
       <br>
    3. Access the App
<br>
Frontend runs on http://localhost:3000
<br>
Backend runs on http://localhost:8080

