# Chat App Quick Reference Guide


## Project Structure

```yml
chat-app/
├── client/ # React frontend
│ ├── package.json # frontend dependencies and scripts
│ └── src/
├── server/ # Node.js backend
│ ├── package.json # backend dependencies and scripts
│ └── src/
└── package.json # root, runs client & server together
```

## Key Concepts

```yml
- **Root `package.json`**  
  Uses [`concurrently`](https://www.npmjs.com/package/concurrently) to run both client & server together.

- **Client `package.json`**  
  Manages React dependencies and scripts (e.g. `react-scripts start`).

- **Server `package.json`**  
  Manages backend dependencies like Express, Socket.IO, Redis client, and scripts (e.g. `nodemon` or `ts-node-dev`).
```

## Important Commands

### From root folder:

```bash
npm run dev
Runs client & server simultaneously.
```

In server folder:

```bash
npm install         # install backend dependencies
npm run dev         # run backend dev server with hot reload
```

In client folder:

```bash
npm install         # install frontend dependencies
npm start           # run React dev server
```

Common Scripts Examples

Root package.json

```json
"scripts": {
  "dev": "concurrently \"npm run dev --prefix server\" \"npm start --prefix client\""
}
```

Server package.json (JavaScript example)

```json
"scripts": {
  "dev": "nodemon src/index.js",
  "start": "node src/index.js"
}
```

Client package.json

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build"
}
```

## Troubleshooting Tips

Command not recognized errors?
Run npm install inside the respective folder (client or server) to install missing packages.

Module not found errors?
Check file paths and entry file names in your scripts match your folder structure.

Deprecation warnings?
Remove unused or deprecated packages (e.g. @types/socket.io) and update dependencies.

Clear install if stuck:
Delete node_modules and package-lock.json then run npm install again.

Why Redis Setup Needs Care
Always run Redis bound to localhost (e.g. -p 127.0.0.1:6379:6379)

Enable password authentication with --requirepass

Avoid exposing Redis publicly to prevent unauthorized access and attacks.


# Commands to run this project

```bash
git clone https://github.com/gleidsonguilhem/chat-app.git
cd chat-app
```

2. Run Redis with password locally (Docker)

```bash
docker run -d --name redis-secure -p 127.0.0.1:6379:6379 redis redis-server --requirepass 'My$trongPass123'
```

Make sure the password here matches the one in your backend code.

3. Install dependencies

```bash
# Install root dependencies (for concurrently)
npm install

# Install backend dependencies
cd server
npm install
cd ..

# Install frontend dependencies
cd client
npm install
cd ..
```

4. Start backend and frontend simultaneously

From the project root folder:

```bash
npm run dev
```

This runs:

Backend on http://localhost:5000
Frontend on http://localhost:3000

Stop Redis container (when not using the app)

```bash
docker stop redis-secure
docker rm redis-secure
```

# Redis security best practices

Feel free to keep this file updated as your project evolves!
Want me to generate example package.json files or Docker setup next?
Would you like me to create actual example files for you too?

## Helpful Resources

npm scripts docs
concurrently package
nodemon
react-scripts
