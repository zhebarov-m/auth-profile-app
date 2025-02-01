import { lazy } from 'react';

const LoginPage = lazy(() => import('./login'));
const UserProfilePage = lazy(() => import('./profile'));
const RegisterPage = lazy(() => import('./register'));

export const publicRoutes = [
    {
        Component: LoginPage,
        path: '/',
    },
    {
        Component: RegisterPage,
        path: '/register',
    },
];

export const privateRoutes = [
    {
        Component: UserProfilePage,
        path: '/profile',
    },
];
