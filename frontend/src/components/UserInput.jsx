import { useState } from "react";

const UserInput = ({ username, setUsername, connect }) => {

  const [warning, setwarning] = useState(true);
    
  return (
    <div className="flex flex-col items-center"> 
        <div className="flex justify-center items-end gap-1 px-4 py-3 mt-4 max-w-xl w-full">
            <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e)=>{
                    if(e.key === "Enter"){
                        setwarning(false);
                        connect();
                    }
                }}
                className="w-full max-w-sm h-10 px-4 rounded-lg border text-sm
                bg-gray-50 text-[#0f151a] placeholder-[#56748f] border-[#d2dce4]
                dark:bg-[#1b1e32] dark:text-white dark:placeholder-[#959bc6] dark:border-[#363c63]"
            />
            <button
                onClick={()=>{
                    setwarning(false);
                    connect();
                }}
                className="cursor-pointer hover:bg-[#87b7ff] h-10 px-3 rounded-lg text-sm font-medium
                bg-[#87b7e3] text-[#0f151a] dark:bg-[#6173e9] dark:text-white dark:hover:bg-[#4c5ad6]"
            >
                Set Username
            </button>
        </div>
        {warning && <div className="text-gray-800 dark:text-gray-200 mt-2"> Please enter the username to get started </div>}
    </div>
  );
};

export default UserInput;
