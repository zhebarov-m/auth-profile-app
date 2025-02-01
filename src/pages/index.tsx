import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layout/main-layout';
import { privateRoutes, publicRoutes } from './routes.ts';
import { Suspense } from 'react';
import { AuthWrapper } from '../shared/lib/router/auth-wrapper';

const Routing = () => {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                {privateRoutes.map(({ path, Component }) => (
                    <Route
                        key={path}
                        path={path}
                        element={
                            <AuthWrapper>
                                <Suspense fallback={<>Loading...</>}>
                                    <Component />
                                </Suspense>
                            </AuthWrapper>
                        }
                    />
                ))}
            </Route>

            {publicRoutes.map(({ path, Component }) => (
                <Route key={path} path={path} element={<Component />} />
            ))}
        </Routes>
    );
};

export default Routing;
