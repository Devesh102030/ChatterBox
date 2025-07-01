import express from 'express';
import connectDB from './db.js';
import { WebSocketServer } from 'ws';
import handleWebSocket from './websocket.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT;

const server = app.listen(PORT,()=>{
    console.log("Listening on server ...");
})

connectDB();

const wss = new WebSocketServer({server});

wss.on('connection',(ws)=>{
    handleWebSocket(ws,wss);
})

