import { makeAutoObservable, runInAction } from 'mobx';
import { AuthService } from '../../../shared/services/auth';
import { toast } from 'react-toastify';

export class AuthUserModel {
    user: any | null = null;
    isLoggingIn: boolean = false;
    sessionToken = '';

    constructor() {
        makeAutoObservable(this);
    }

    private saveTokenToStorage = (token: string) => {
        localStorage.setItem('token', token);

        this.sessionToken = token;
    };

    private saveUserToStorage = (value: any | null) => {
        localStorage.setItem('user', JSON.stringify(value || ''));
    };

    private setSessionToken = (token: string) => {
        this.saveTokenToStorage(token);
        this.sessionToken = token;
    };

    getUserProfile = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const userData = await AuthService.getUserProfile();
                runInAction(() => {
                    this.user = userData;
                    this.saveUserToStorage(userData);
                });
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    register = async (email: string, password: string) => {
        runInAction(() => {
            this.isLoggingIn = true;
        });

        try {
            const data = await AuthService.register(email, password);

            if (!data || !data.token) {
                throw new Error('Ошибка регистрации: возможно, пользователь уже существует.');
            }

            runInAction(() => {
                this.setSessionToken(data.token);
                toast.success('Регистрация успешно выполнена!');
            });
        } catch (error) {
            toast.error(
                'Ошибка регистрации: возможно, такой пользователь уже существует или Попробуйте позже.'
            );
            throw error;
        } finally {
            runInAction(() => {
                this.isLoggingIn = false;
            });
        }
    };

    login = async (email: string, password: string) => {
        runInAction(() => {
            this.isLoggingIn = true;
        });

        try {
            const data = await AuthService.login(email, password);

            if (!data || !data.token) {
                throw new Error('Ошибка авторизации: неправильный email или пароль');
            }

            runInAction(() => {
                this.setSessionToken(data.token);
            });
        } catch (error) {
            toast.error('Ошибка авторизации: неправильный email или пароль');
            throw error;
        } finally {
            runInAction(() => {
                this.isLoggingIn = false;
            });
        }
    };

    get isAuth() {
        return !!localStorage.getItem('token');
    }

    logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        runInAction(() => {
            this.user = null;
            this.sessionToken = '';
        });
    };
}
