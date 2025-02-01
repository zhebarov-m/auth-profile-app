import LoginWidget from '../../widgets/login';
import { useStore } from '../../app/store';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

const LoginPage = observer(() => {
    const { authStore } = useStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (authStore.isAuth) {
            navigate('/profile');
        }
    }, []);

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            <img
                src="/bg-auth-form2.jpg"
                alt="Авторизация"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center w-full max-w-lg p-8 bg-opacity-50 rounded-lg shadow-2xl">
                <LoginWidget />
            </div>
        </div>
    );
});

export default LoginPage;
