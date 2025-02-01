import { Label } from '../../components/ui/label.tsx';
import { Loader2, Lock, Mail } from 'lucide-react';
import { Input } from '../../components/ui/input.tsx';
import { Button } from '../../components/ui/button.tsx';
import { useStore } from '../../app/store';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IFormData } from './types.ts';
import { observer } from 'mobx-react-lite';

const LoginFeature = observer(() => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IFormData>();
    const { authStore } = useStore();
    const { login, isLoggingIn } = authStore;
    const navigate = useNavigate();

    const handleLogin = (data: IFormData) => {
        console.log('YES');
        login(data.email, data.password)
            .then(() => {
                toast.success('Авторизация прошла успешно!');
                navigate('/profile', { replace: true });
            })
            .catch((err) => {
                toast.error(err.message || 'Ошибка авторизации. Попробуйте позже.');
            });
    };

    const replaceToRegisterForm = () => {
        navigate('/register', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
            <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                    <Mail
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                    />
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        {...register('email', { required: 'Email is required' })}
                        className="pl-10"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </div>
            </div>
            <div>
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                    <Lock
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                        size={20}
                    />
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        {...register('password', { required: 'Password is required' })}
                        className="pl-10"
                    />
                    {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                    )}
                </div>
            </div>
            <div className="relative flex justify-end">
                <small className="flex gap-1">
                    Нет аккаунта?
                    <button
                        type="button"
                        onClick={replaceToRegisterForm}
                        className="underline hover:text-gray-700"
                    >
                        Создать аккаунт
                    </button>
                </small>
            </div>
            <Button type="submit" className="w-full" disabled={isLoggingIn}>
                {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : 'Войти'}
            </Button>
        </form>
    );
});

export default LoginFeature;
