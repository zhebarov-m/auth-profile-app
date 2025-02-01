import { RegisterWidget } from '../../widgets/register-widget';

const RegisterPage = () => {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center">
            <img
                src="/bg-auth-form1.jpg"
                alt="Регистрация"
                className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center w-full max-w-lg rounded-lg shadow-2xl">
                <RegisterWidget />
            </div>
        </div>
    );
};

export default RegisterPage;
