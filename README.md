IdeaLog

A full-stack web app to save, organize, and share your favorite content — links, tweets, and YouTube videos — all in one place.

✨ Features

User signup & login with JWT authentication

Save and manage links, tweets, and videos

Generate shareable links to your collection

Responsive, clean UI built with React + Tailwind

Fast dev experience powered by Vite

MongoDB for storage and Express for backend APIs

🛠 Tech Stack

Frontend: React, TypeScript, Vite, Tailwind CSS, React Router
Backend: Node.js, Express, TypeScript, MongoDB, Mongoose, JWT

🚀 Getting Started
Requirements

Node.js 16+

npm or yarn

MongoDB (Atlas or local)

1. Clone the repo
git clone <repo-url>
cd second-brain

2. Setup Backend
cd Server
npm install
cp .env.example .env   # add MongoDB URI + JWT secret
npm run build
npm start

3. Setup Frontend
cd Client
npm install
cp .env.example .env   # update API URL if needed
npm run dev

🧪 Notes

Built as a learning project to practice full-stack TypeScript development.