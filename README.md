
<p align="center">
  <a href="https://chatter-box-puce-five.vercel.app/">
    <img src="./frontend/public/favicon.png" alt="ChatterBox Icon" width="80" height="80" style="margin-bottom: 10px;" />
  </a>
</p>

<h1 align="center"> ChatterBox – Real-Time Chat Application</h1>

<p align="center">
  A real-time chat app built with <strong>React</strong>, <strong>Node.js</strong>, <strong>WebSocket (ws)</strong>, and <strong>MongoDB</strong>.
  Users can enter a username, connect, and chat live. Messages are stored and synced across clients.
</p>

## Setup Instructions (Local Development)

### Backend

Clone the project

```bash
  git clone https://github.com/Devesh102030/chatterbox.git
```

Go to the backend directory

```bash
  cd chatterbox/backend
```

Install dependencies

```bash
  npm install
```

Create .env file

```bash
  PORT=3000
  MONGO_URL=mongodb://localhost:27017
```

Start the server

```bash
  node index.js
```

### Frontend

Go to the frontend directory

```bash
  cd chatterbox/frontend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
## Application Architecture

### Frontend–Backend Communication

- WebSocket (ws) is used for full-duplex real-time communication between the frontend and backend.

- The frontend connects to the WebSocket server and sends:
    - type: 'init' to set the username and fetch chat history.
    - type: 'message' to send messages.

- The backend responds with:
    - type: 'history' – recent chat history.
    - type: 'message' – new incoming messages to all clients.


## Concurrency Handling

- The backend uses WebSocketServer.clients to broadcast messages to all connected users.
- Each WebSocket connection is stored individually with its own ws.username.
- Incoming messages are validated and stored in MongoDB, ensuring persistence and consistency.

## Assumptions & Design Choices
- WebSocket (ws) chosen over polling for instant real-time experience with minimal latency.

- Dark/light mode toggle is implemented using Tailwind's dark: class system with state saved in localStorage.

- Latest 50 messages are fetched for new users to reduce load and improve performance.

- Basic validation of usernames and message strings is included; authentication is not implemented in this MVP.




## Deployed Application

The app is deployed and accessible at:

🔗 Frontend: https://chatter-box-puce-five.vercel.app/   
🔗 Backend/WebSocket server: wss://chatterbox-jrx2.onrender.com/


## Acknowledgements

 - Built using React, Tailwind CSS, Node.js, Express, MongoDB, and ws.
- Inspired by the idea of bringing simple and fun real-time chatting into a lightweight app.

