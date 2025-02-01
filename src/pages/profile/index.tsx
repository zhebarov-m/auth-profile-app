import { useEffect, useState } from 'react';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { useStore } from '../../app/store';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
import { Mail, User, LogOut, Hash } from 'lucide-react';
import { CustomSkeleton } from '../../shared/ui';

const ProfilePage = observer(() => {
    const { authStore } = useStore();
    const { getUserProfile, logout } = authStore;
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getUserProfile?.().finally(() => setLoading(false));
    }, [authStore]);

    const handleLogout = () => {
        logout?.();
        navigate('/register');
    };

    return (
        <div
            className="flex items-center justify-center min-h-screen bg-cover bg-center p-4 transition-colors duration-300 bg-blue-100 dark:bg-gray-900"
            style={{ backgroundImage: "url('/background.jpg')" }}
        >
            <Card className="w-full max-w-md shadow-2xl rounded-2xl backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 p-6 transition-colors duration-300 border border-gray-300 dark:border-gray-700">
                <CardHeader className="text-center">
                    <User className="w-16 h-16 mx-auto text-blue-500 dark:text-blue-400" />
                    <CardTitle className="text-3xl font-bold text-gray-800 dark:text-white mt-4">
                        Ваш Профиль
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <CustomSkeleton />
                    ) : authStore.user ? (
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                                <Mail className="w-5 h-5 text-blue-500 dark:text-blue-400" />
                                <p>
                                    <b className="font-bold">Email:</b> {authStore.user.email}
                                </p>
                            </div>
                            <div className="flex gap-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                                <Hash className="text-blue-500 dark:text-blue-400" />
                                <p>
                                    <b className="font-bold">Ваш ID:</b> {authStore.user.id}
                                </p>
                            </div>
                            <Button
                                onClick={handleLogout}
                                className="w-full transition duration-300 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg transform hover:scale-105 dark:bg-red-700 dark:hover:bg-red-800 flex items-center justify-center gap-2"
                            >
                                <LogOut className="w-5 h-5" /> Выйти
                            </Button>
                        </div>
                    ) : (
                        <p className="text-center text-red-500 dark:text-red-400 font-medium">
                            Не удалось получить данные пользователя.
                        </p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
});

export default ProfilePage;
