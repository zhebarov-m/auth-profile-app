import { Label } from '../../components/ui/label.tsx';
import { Input } from '../../components/ui/input.tsx';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '../../components/ui/button.tsx';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useStore } from '../../app/store';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { IFormData } from './types.ts';

const RegisterFormFeature = observer(() => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<IFormData>();

    const { authStore } = useStore();
    const { register: authStoreRegister, isLoggingIn } = authStore;

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prev) => !prev);
    };

    const navigate = useNavigate();

    const onSubmit = (data: IFormData) => {
        authStoreRegister(data.email, data.password)
            .then(() => {
                navigate('/', { replace: true });
            })
            .catch((err) => {
                toast.error(err.message || 'Ошибка регистрации. Попробуйте позже.');
            });
    };

    const replaceToLoginForm = () => {
        navigate('/', { replace: true });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
            <div>
                <Label htmlFor="email">Email</Label>
                <Input
                    id="email"
                    type="email"
                    {...register('email', {
                        required: 'Введите email',
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Некорректный email',
                        },
                    })}
                    className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                />
                {errors.email && (
                    <p className="text-red-700 font-semibold text-sm mt-1">
                        {errors.email.message}
                    </p>
                )}
            </div>
            <div className="relative">
                <Label htmlFor="password">Пароль</Label>
                <div className="relative">
                    <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: 'Введите пароль',
                            minLength: {
                                value: 6,
                                message: 'Длина пароля не может быть меньше 6 символов',
                            },
                        })}
                        className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center hover:text-gray-400"
                        onClick={togglePasswordVisibility}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.password && (
                    <p className="text-red-700 font-semibold text-sm mt-1">
                        {errors.password.message}
                    </p>
                )}
            </div>
            <div className="relative">
                <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                <div className="relative">
                    <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                            required: 'Подтвердите пароль',
                            validate: (value) =>
                                value === watch('password') || 'Пароли не совпадают',
                        })}
                        className="mt-1 p-3 border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    />
                    <button
                        type="button"
                        className="absolute inset-y-0 right-3 flex items-center hover:text-gray-400"
                        onClick={toggleConfirmPasswordVisibility}
                    >
                        {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                {errors.confirmPassword && (
                    <p className="text-red-700 font-semibold text-sm mt-1">
                        {errors.confirmPassword.message}
                    </p>
                )}
            </div>
            <div className="relative flex justify-end pb-4">
                <small className="flex gap-1">
                    Уже есть аккаунт?
                    <button
                        type="button"
                        onClick={replaceToLoginForm}
                        className="underline hover:text-gray-700"
                    >
                        Войти
                    </button>
                </small>
            </div>
            <Button
                type="submit"
                disabled={isLoggingIn}
                className="w-full py-3 rounded-lg font-medium transition duration-300"
            >
                {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : 'Создать аккаунт'}
            </Button>
        </form>
    );
});

export default RegisterFormFeature;
