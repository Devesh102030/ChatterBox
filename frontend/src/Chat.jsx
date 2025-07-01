import { useState } from "react"
import UserInput from "./components/UserInput";
import Appbar from "./components/Appbar";
import ChatRoom from "./components/ChatRoom";

export const Chat = ()=>{
    const [username, setusername] = useState("");
    const [message, setmessage] = useState("");
    const [history, sethistory] = useState(null);
    const [socket, setsocket] = useState(null);

    function connect(){
        if(!username){
            return(
                alert("Please enter a username")
            )
        }

        const newSocket = new WebSocket(import.meta.env.VITE_WEBSOCKET_URL);

        setsocket(newSocket);

        newSocket.onopen = ()=>{
            console.log("Connected to server");
            newSocket.send(JSON.stringify({
                type: "init",
                username: username
            }))
        }

        newSocket.onmessage = (event)=>{
            const data = JSON.parse(event.data);
            console.log(data);
            console.log("recived");
            if(data.type === 'history'){
                sethistory(data.messages);
            }
            if(data.type === 'message'){
                
                sethistory(history => [...history, data.message])
            }
        }

        newSocket.onclose = ()=>{
            console.log("Connection closed")
        }

        newSocket.onerror = (err)=>{
            console.log("Websocket Error: ",err);
        }

    }

    function handleMessage(){
        if(!username){
            return(
                alert("Please enter a username")
            )
        }
        if(!socket && !(socket.readyState === WebSocket.OPEN)){
            return(
                alert("Unable to connect the server")
            )
        }

        socket.send(JSON.stringify({
            type: "message",
            username: username,
            message: message
        }))

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




{/* <div>
    <input type="text" placeholder="Enter your username" onChange={(e)=>setusername(e.target.value)}
        className="w-full bg-[#1b1e32] border border-[#363c63] rounded-lg h-14 px-4 text-white placeholder-[#959bc6]"
    />
    <button onClick={connect} className="h-10 px-4 bg-[#6173e9] text-white rounded-lg">Set Username</button>
</div>
<div>
    <h2>Chat Room</h2>
    <p>Welcome to the chat room! Start sending messages below</p>
    <div>
        {history &&
            history.map((msg)=>{
                return(
                    <div key={msg._id}>
                        <p>{msg.username}</p>
                        <p>{msg.message}</p>
                    </div>
                )
            })
        }
        <input type="text" placeholder="Type your message..."
            value={message}
            onChange={(e)=>setmessage(e.target.value)}
            onKeyDown={(e)=>{
                if(e.key === "Enter" && message){
                    handleMessage();
                }
            }} 
        />
        <button disabled={message.length === 0} onClick={handleMessage}>Send</button>
    </div>
</div> */}

