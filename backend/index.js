import express from 'express';
import connectDB from './db.js';
import { WebSocketServer } from 'ws';
import handleWebSocket from './websocket.js';
import dotenv from 'dotenv';
import cors from 'cors';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

const PORT = process.env.PORT || 3000;

// Start the HTTP server
const server = app.listen(PORT,()=>{
    console.log("Listening on server ...");
})

connectDB();

// Create a WebSocket server using the same HTTP server
const wss = new WebSocketServer({server});

// Handle new WebSocket connections
wss.on('connection',(ws)=>{
    handleWebSocket(ws,wss);
})

