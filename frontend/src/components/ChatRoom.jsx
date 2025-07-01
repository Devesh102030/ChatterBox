import { useEffect, useRef } from 'react';

const ChatRoom = ({
  username,
  message,
  setMessage,
  handleMessage,
  history,
}) => {
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

  return (
    !history ? ( <div/>) : (
        <div className="flex justify-center flex-col h-full w-full text-[#0f151a] dark:text-white">
        <div className="w-full mx-auto px-4 h-full flex flex-col">
        {/* Chat Header */}
            
        <h2 className="text-xl font-bold mb-2">Chatter Board</h2>
        <p className="text-base mb-4">
            You’ve entered ChatterBox. Got something to say? Say it loud!
        </p>

        {/* Chat History */}
        
        <div className="flex-1 overflow-y-auto scoll-smooth mb-4 pr-2 border border-gray-200 rounded-lg">
            <div className="flex flex-col gap-4 mb-6">
                {history && history.map((msg) => (
                <div
                    key={msg._id}
                    className={`flex items-end gap-3 px-1 ${
                    msg.username === username ? "justify-end" : "justify-start"
                    }`}
                >
                    {msg.username !== username && (
                        <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full shrink-0 flex justify-center items-center font-semibold" >
                            {msg.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="flex flex-col gap-1 max-w-[360px]">
                        <p
                            className={`text-[13px] ${
                            msg.username === username
                                ? "text-right dark:text-[#959bc6]"
                                : "text-[#56748f] dark:text-[#959bc6]"
                            }`}
                        >
                            {msg.username.charAt(0).toUpperCase()+msg.username.slice(1)}
                        </p>
                        <p
                            className={`px-4 py-2 rounded-lg text-base ${
                            msg.username === username
                                ? "bg-[#87b7e3] text-[#0f151a] dark:bg-[#6173e9] dark:text-white"
                                : "bg-[#e9edf2] text-[#0f151a] dark:bg-[#1b1e32] dark:text-white"
                            }`}
                        >
                            {msg.message}
                        </p>
                    </div>
                    {msg.username === username && (
                        <div className="w-10 h-10 bg-gray-400 dark:bg-gray-600 text-gray-800 dark:text-white rounded-full shrink-0 flex justify-center items-center font-semibold" >
                            {msg.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                </div>
                ))}
            </div>
            <div ref={messagesEndRef} />
        </div>
        

        {/* Message input */}
            <div className="flex items-center gap-3">
                {/* <div className="w-10 h-10 bg-gray-400 rounded-full shrink-0" /> */}
                <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleMessage()}
                className="flex-1 h-12 rounded-lg px-4 
                 bg-[#e9edf2] text-[#0f151a] 
                 dark:bg-[#1b1e32] dark:text-white"
                />
                <button
                disabled={!message}
                onClick={handleMessage}
                className={`h-12 px-4 rounded-lg text-sm font-medium 
                bg-[#87b7e3] text-[#0f151a] 
                dark:bg-[#6173e9] dark:text-white 
                ${!message ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                Send
                </button>
            </div>
            
        </div>
        </div>
    )
  );
};

export default ChatRoom;
