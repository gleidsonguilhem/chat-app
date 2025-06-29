# real-time-chat

A simple real-time chat application featuring:

- **Frontend:** React + TypeScript  
- **Backend:** Node.js + Express + Socket.IO  
- **Database:** Redis (for message storage and pub/sub)

---

## 📸 Preview

Real-time messaging between connected clients with Redis-backed message history.

---

## 📁 Project Structure

```yaml
├── client/ # React frontend
├── server/ # Node.js backend with Socket.IO and Redis
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gleidsonguilhem/chat-app.git
cd chat-app
```

2. Backend Setup (server/)
Install Dependencies

```bash
cd server
npm install
```

Run Redis Securely with Docker

```bash
docker run -d \
  --name redis-secure \
  -p 127.0.0.1:6379:6379 \
  redis redis-server --requirepass "My$trongPass123"
```

Redis is bound to localhost only to prevent external access.
Password authentication is enabled with --requirepass.

Start Server

```bash
npx ts-node-dev src/index.ts
```
Backend runs at: http://localhost:3001

3. Frontend Setup (client/)

Install Dependencies

```bash
cd ../client
npm install
```

Start React App
```bash
npm start
```

Frontend runs at: http://localhost:3000

🔌 Features
Real-time messaging with Socket.IO

Persistent message history using Redis

Fully typed with TypeScript

Modern React UI

📚 Why This Setup?

Initially, exposing Redis with -p 6379:6379 without authentication caused unauthorized access attempts.

Best practices implemented:

Bind Redis to 127.0.0.1 only (local machine access)

Enable Redis password authentication

Avoid exposing internal services publicly

🧪 Optional Improvements
Add Authentication (JWT/OAuth)

Use Redis Pub/Sub to scale with multiple instances
Integrate a database for user/message persistence
UI enhancements with Tailwind CSS or Material UI

Build securely, code confidently! 🚀

```yaml
Let me know if you want me to add a Docker Compose example or any other section!
```
