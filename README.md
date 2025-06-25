# real-time-chat

Real-Time Chat App

A simple real-time chat application using:

    React + TypeScript (frontend)

    Node.js + Express + Socket.IO (backend)

    Redis (message storage)

📸 Preview

    Real-time messaging between connected clients with Redis-backed message history.

📁 Project Structure

.
├── client/       # React frontend
├── server/       # Node.js backend with Socket.IO and Redis
└── README.md

🚀 Getting Started
1. Clone the Repository

git clone https://github.com/your-username/realtime-chat-app.git
cd realtime-chat-app

🛠 Backend Setup (server/)
📦 Install Dependencies

cd server
npm install

🧠 Run Redis

Make sure Redis is running locally. You can use Docker:

docker run -p 6379:6379 redis

▶ Start Server

npx ts-node-dev src/index.ts

The backend runs on http://localhost:3001.
💻 Frontend Setup (client/)
📦 Install Dependencies

cd client
npm install

▶ Start React App

npm start

The frontend runs on http://localhost:3000.
🔌 Features

    Real-time messaging using Socket.IO

    Persistent message history using Redis

    Fully typed with TypeScript

    Modern UI with React

📦 Tech Stack
Layer	Tech
Frontend	React, TypeScript
Backend	Node.js, Express, Socket.IO
Database	Redis
🧪 Optional Improvements

    Authentication with JWT or OAuth

    Redis Pub/Sub for scaling with multiple instances

    Database integration for user/message persistence

    UI enhancements with Tailwind or Material UI
