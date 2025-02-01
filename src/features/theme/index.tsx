import { SwitcherControls } from './ui/switcher-controls';
import { useEffect, useState } from 'react';

const ThemeSwitcher = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            setIsDarkMode(true);
            document.documentElement.classList.add('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode;
        setIsDarkMode(newTheme);
        if (newTheme) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    };
    return <SwitcherControls isDarkMode={isDarkMode} toggleTheme={toggleTheme} />;
};

export default ThemeSwitcher;
