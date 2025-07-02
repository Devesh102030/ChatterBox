import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const Appbar = ()=>{

    // State to track dark mode, initialized from localStorage
    const [isDark, setIsDark] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    // Apply/remove dark theme on root element whenever isDark changes
    useEffect(() => {
        const root = document.documentElement;
        if (isDark) {
            root.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            root.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);
    
    return(
        <header className="flex items-center justify-between border-b border-gray-200 dark:border-[#363c63] px-10 py-2 bg-white dark:bg-[#121421]">
        <div className="flex items-center gap-1">
            <div>
                <img 
                    src="/favicon.png"
                    alt="ChatterBox Icon" 
                    className="w-11 h-10"
                />
            </div>
            <h2 className="text-2xl font-bold text-[#0f151a] dark:text-white tracking-tight">ChatterBox</h2>
        </div>

        <div className="flex items-center gap-4">
                {/* Theme toggle button */}
                <div className="flex gap-2">
                    <button className="h-10 px-2.5 bg-gray-100 dark:bg-[#2a2b40] rounded-lg" onClick={() => setIsDark(prev => !prev)}>
                        {isDark ? (<Sun/>) : (<Moon className='text-black'/>)}
                    </button>
                </div>
            </div>
        </header>
    )
}

export default Appbar;


