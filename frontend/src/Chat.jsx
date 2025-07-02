import { useState, useEffect } from "react"
import UserInput from "./components/UserInput";
import Appbar from "./components/Appbar";
import ChatRoom from "./components/ChatRoom";

export const Chat = ()=>{
    const [username, setusername] = useState("");
    const [message, setmessage] = useState("");
    const [history, sethistory] = useState(null);
    const [socket, setsocket] = useState(null);

    useEffect(() => {
        return () => {
            if (socket) {
            socket.close();
            }
        };
    }, [socket]);

    // Function to establish WebSocket connection
    function connect(){
        if(!username){
            return(
                alert("Please enter a username")
            )
        }
        
        // Create a new WebSocket
        const newSocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

        setsocket(newSocket);

        // Once connection is open send username to server
        newSocket.onopen = ()=>{
            console.log("Connected to server");
            newSocket.send(JSON.stringify({
                type: "init",
                username: username
            }))
        }

        // Handle incoming messages from the server
        newSocket.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            console.log(data);
            console.log("recived");

            // If it's initial history load
            if(data.type === 'history'){
                sethistory(data.messages);
            }

            // If it's a new incoming message
            if(data.type === 'message'){
                
                sethistory(history => [...history, data.message])
            }
        }

        // Log when connection is closed
        newSocket.onclose = ()=>{
            console.log("Connection closed")
        }

        newSocket.onerror = (err)=>{
            console.log("Websocket Error: ",err);
        }

    }

    // Sends a message to the server
    function handleMessage(){
        if(!username){
            return(
                alert("Please enter a username")
            )
        }
        if (!socket || socket.readyState !== WebSocket.OPEN) {
            return alert("Unable to connect to the server");
        }

        socket.send(JSON.stringify({
            type: "message",
            username: username,
            message: message
        }))

        // Clear input after sending
        setmessage("");
    }

    return(
        <div className="h-screen flex flex-col overflow-hidden bg-gray-50 text-[#0f151a] font-['Inter','Noto Sans',sans-serif] overflow-x-hidden dark:bg-[#121421] text-white">
            <Appbar/>
            <div className="py-2 px-4">
                <UserInput
                username={username}
                setUsername={setusername}
                connect={connect}
                />
            </div>



            <div className="flex justify-center overflow-hidden">
                <div className="flex-1 max-w-3xl px-4 pb-4">
                    <ChatRoom
                    username={username}
                    message={message}
                    setMessage={setmessage}
                    handleMessage={handleMessage}
                    history={history}
                    />
                </div>
            </div>
           
                
        </div>
    )
}




