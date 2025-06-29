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

# real-time-chat

A simple real-time chat application built with:

- **Frontend**: React + TypeScript  
- **Backend**: Node.js + Express + Socket.IO  
- **Database**: Redis (for message storage and pub/sub)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/gleidsonguilhem/chat-app.git
cd chat-app
```

2. Backend Setup (server/)

📦 Install Dependencies

```bash
cd server
npm install
```

Run Redis Securely with Docker Compose

Redis is configured to:

Bind to 127.0.0.1 (localhost only)
Require a strong password
Avoid exposure to the public network

Create a docker-compose.yml in the project root:

```yaml
version: '3.9'

services:
  redis:
    image: redis:7
    container_name: redis-secure
    ports:
      - "127.0.0.1:6379:6379"
    command: ["redis-server", "--requirepass", "My$trongPass123"]
    restart: unless-stopped
```

Start Redis:

```bash
docker compose up -d
```

▶ Start Server
```bash
npx ts-node-dev src/index.ts
```
Backend runs at: http://localhost:3001

3. Frontend Setup (client/)

📦 Install Dependencies

```bash
cd ../client
npm install
```

▶ Start React App

```bash
npm start
```

Frontend runs at: http://localhost:3000

Features

Real-time messaging with Socket.IO
Persistent message history via Redis
Fully typed with TypeScript
Clean React UI

Why This Setup?
During development, using:

```bash
-p 6379:6379
```

without security led to unauthorized probe attempts from external sources. Redis flagged cross-protocol attacks, even from within Docker.

Best practices now implemented:

✅ Bind Redis to 127.0.0.1 only
✅ Use Redis password with --requirepass
✅ Avoid exposing internal services to public ports
✅ Use Docker Compose for consistency and repeatability

Optional Improvements

🔐 Add authentication (JWT or OAuth)

Use Redis Pub/Sub to scale across instances

Store users/messages in a real database (PostgreSQL, MongoDB)

Enhance UI with Tailwind CSS or Material UI

Build securely. Ship confidently.

```yaml
Would you like me to:
- Include a `.env` setup to hide the Redis password?
- Add `docker-compose.override.yml` to support dev/prod separation?
- Generate this as a file you can download directly?
```
