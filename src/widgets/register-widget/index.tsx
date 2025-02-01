import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card.tsx';
import RegisterFormFeature from '../../features/register';

export const RegisterWidget = () => {
    return (
        <Card className="lg:w-full max-w-2xl shadow-xl bg-gray-400 bg-opacity-60 lg:p-6 rounded-xl">
            <CardHeader>
                <div className="flex items-center justify-center bg-gradient-to-rp-4 gap-2">
                    <span className="border-2 border-gray-800 rounded w-full"></span>
                    <img src="/logo.png" alt="" width={50} />
                    <span className="border-2 border-gray-800 rounded w-full"></span>
                </div>
                <CardTitle className="text-center text-2xl font-bold">Регистрация</CardTitle>
            </CardHeader>
            <CardContent>
                <RegisterFormFeature />
            </CardContent>
        </Card>
    );
};
