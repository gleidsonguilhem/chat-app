const express = require('express');
const http = require('http');
const { createClient } = require('redis');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
// Create an HTTP server from Express app (required for Socket.IO)
const server = http.createServer(app);

// Create a new Socket.IO server and allow CORS from any origin
const io = new Server(server, {
  cors: {
    origin: '*', // Change this to your frontend URL in production
    methods: ['GET', 'POST']
  }
});

app.use(cors());          // Enable CORS for all routes
app.use(express.json());  // Parse incoming JSON requests

// Create Redis clients:
// - redisClient: for storing and retrieving messages
// - redisSubscriber: to subscribe to Redis Pub/Sub channels for real-time updates
const redisClient = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  },
  password: 'My$trongPass123' // Replace with your actual Redis password
});

const redisSubscriber = createClient({
  socket: {
    host: '127.0.0.1',
    port: 6379
  },
  password: 'My$trongPass123'
});

(async () => {
  // Connect Redis clients asynchronously
  await redisClient.connect();
  await redisSubscriber.connect();

  // Subscribe to 'chat_messages' Redis channel
  // Whenever a message is published to this channel, broadcast it to all socket.io clients
  await redisSubscriber.subscribe('chat_messages', (message) => {
    io.emit('newMessage', JSON.parse(message));
  });
})();

// API endpoint to get last 50 messages stored in Redis
app.get('/messages', async (req, res) => {
  // lRange fetches a range of elements from the Redis list 'messages'
  const messages = await redisClient.lRange('messages', -50, -1);
  // Parse messages from JSON strings to objects before sending response
  res.json(messages.map(msg => JSON.parse(msg)));
});

// Handle new Socket.IO connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for 'sendMessage' events from clients
  socket.on('sendMessage', async (message) => {
    // Construct message object with unique id and timestamp
    const messageObj = {
      id: Date.now(),
      text: message,
      createdAt: new Date().toISOString()
    };

    // Push message into Redis list 'messages' (append to the end)
    await redisClient.rPush('messages', JSON.stringify(messageObj));
    // Publish the new message to 'chat_messages' channel so all subscribers get notified
    await redisClient.publish('chat_messages', JSON.stringify(messageObj));
  });

  // Log disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server on port 5000 (or environment port)
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});