import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';

// URL of the backend Socket.IO server
const SOCKET_SERVER_URL = 'http://localhost:5000';

function App() {
  const [messages, setMessages] = useState([]);  // List of chat messages
  const [input, setInput] = useState('');        // Controlled input value
  const socketRef = useRef();                     // Socket.IO client instance stored in ref

  useEffect(() => {
    // Fetch previous chat messages from backend API when component mounts
    fetch(`${SOCKET_SERVER_URL}/messages`)
      .then(res => res.json())
      .then(setMessages)   // Set fetched messages to state
      .catch(console.error);

    // Connect to Socket.IO server
    socketRef.current = io(SOCKET_SERVER_URL);

    // Listen for 'newMessage' events from server to update chat in real time
    socketRef.current.on('newMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Clean up: disconnect socket when component unmounts
    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Called when user clicks "Send" or presses Enter
  const sendMessage = () => {
    if (input.trim() === '') return;  // Do not send empty messages

    // Emit 'sendMessage' event to backend with message text
    socketRef.current.emit('sendMessage', input);
    setInput('');  // Clear input after sending
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2>Live Chat</h2>
      {/* Chat messages container */}
      <div
        style={{
          border: '1px solid #ccc',
          height: 400,
          overflowY: 'auto',
          padding: 10,
          marginBottom: 10,
        }}
      >
        {/* Render each message */}
        {messages.map((msg) => (
          <div key={msg.id} style={{ marginBottom: 8 }}>
            <small style={{ color: '#555' }}>
              {/* Format and display timestamp */}
              {new Date(msg.createdAt).toLocaleTimeString()}
            </small>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      {/* Input field for typing messages */}
      <input
        style={{ width: '80%', padding: 10 }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message"
        // Allow sending message with Enter key
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
      />
      {/* Send button */}
      <button onClick={sendMessage} style={{ padding: 10, marginLeft: 10 }}>
        Send
      </button>
    </div>
  );
}

export default App;
