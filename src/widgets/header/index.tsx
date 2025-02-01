import ThemeSwitcher from '../../features/theme';
import { Button } from '../../components/ui/button.tsx';
import { useStore } from '../../app/store';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../components/ui/tooltip.tsx';

const HeaderWidget = () => {
    const { authStore } = useStore();
    const { logout } = authStore;
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <header className="flex items-center justify-between h-20 px-10 shadow">
            <div className="flex items-center justify-center gap-2 w-fit">
                <img src="/logo.png" alt="" width={50} />
                <h2 className="font-mono font-medium text-2xl">Тестовое задание</h2>
            </div>
            <div className="flex items-center justify-center gap-2 w-fit">
                <Tooltip>
                    <TooltipTrigger>
                        <ThemeSwitcher />
                    </TooltipTrigger>
                    <TooltipContent>Тёмная тема</TooltipContent>
                </Tooltip>
                <Button
                    onClick={handleLogout}
                    className="bg-blue-500 hover:bg-blue-600
                                    text-white font-bold dark:bg-blue-700
                                    dark:hover:bg-blue-800"
                >
                    Выйти
                </Button>
            </div>
        </header>
    );
};

export default HeaderWidget;
