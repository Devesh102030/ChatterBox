import Message from "./models/message.js"

// Function to handle WebSocket connection events
const handleWebSocket = (ws, wss)=>{

    // Listen for incoming messages from the client
    ws.on('message', async (data) => {
    try {
        const parsedData = JSON.parse(data);

        // Handle initial connection and username setup
        if (parsedData.type === 'init') {
            if (!parsedData.username || typeof parsedData.username !== 'string') {
                ws.send(JSON.stringify({ type: 'error', message: 'Invalid username' }));
                return;
            }

            // Store username on the socket
            ws.username = parsedData.username;

            // Fetch last 50 messages (latest first, then reverse for chronological order)
            const history = await Message.find().sort({ timestamp: -1 }).limit(50);
            history.reverse();

            // Send chat history to the newly connected client
            ws.send(JSON.stringify({
                type: 'history',
                messages: history
            }));
        }
        // Handle new message sent by client
        else if (parsedData.type === 'message') {
            if (!ws.username || !parsedData.message || typeof parsedData.message !== 'string') {
                ws.send(JSON.stringify({ type: 'error', message: 'Invalid message or missing username' }));
                return;
            }

            // Save message to the database
            const newMsg = await Message.create({
                username: ws.username,
                message: parsedData.message.trim()
            });

            // Send the message to all connected clients
            wss.clients.forEach((client) => {
                if (client.readyState === ws.OPEN) {
                client.send(JSON.stringify({
                    type: 'message',
                    message: newMsg
                }));
                }
            });
        }
        // Handle unknown message types
        else {
            ws.send(JSON.stringify({ type: 'error', message: 'Unknown message type' }));
        }

    } catch (err) {
        // Handle unexpected server errors
        console.error('WebSocket error:', err);
        ws.send(JSON.stringify({ type: 'error', message: 'Internal server error' }));
    }
});

    // Handle WebSocket disconnection
    ws.on('close', ()=>{
        console.log("Disconnected successfully");
    });
}

export default handleWebSocket;
