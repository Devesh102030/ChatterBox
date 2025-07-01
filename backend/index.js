import express from 'express';
import connectDB from './db.js';
import { WebSocketServer } from 'ws';
import handleWebSocket from './websocket.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,()=>{
    console.log("Listening on server ...");
})

connectDB();

const wss = new WebSocketServer({server});

wss.on('connection',(ws)=>{
    handleWebSocket(ws,wss);
})

