import { FC } from 'react';

interface IProps {
    isDarkMode: boolean;
    toggleTheme: () => void;
}

export const SwitcherControls: FC<IProps> = (props) => {
    const { isDarkMode, toggleTheme } = props;
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white
                        transition-transform duration-300 hover:scale-110"
        >
            {isDarkMode ? '🌙' : '☀️'}
        </button>
    );
};
