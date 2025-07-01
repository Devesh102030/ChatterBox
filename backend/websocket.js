import Message from "./models/message.js"

const handleWebSocket = (ws, wss)=>{
    ws.on('message', async (data)=>{
        const parsedData = JSON.parse(data);
        ws.username = parsedData.username;

        if(parsedData.type === 'init'){
            const history = await Message.find().sort({timestamp: -1}).limit(50);
            history.reverse();

            ws.send(JSON.stringify({
                type: 'history',
                messages: history
            }))
        }

        if(parsedData.type === 'message'){
            
            const newMsg = await Message.create({
                username: ws.username,
                message: parsedData.message
            })

            wss.clients.forEach( (client) => {
                if(client.readyState === ws.OPEN){
                    client.send(JSON.stringify({
                        type: 'message',
                        message: newMsg
                    }))
                }
            });
        }
    })

    ws.on('close', ()=>{
        console.log("Disconnected successfully");
    });
}

export default handleWebSocket;