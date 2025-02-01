import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../../../../app/store';
import { observer } from 'mobx-react-lite';

interface IProps {
    children: ReactNode;
}

export const AuthWrapper: FC<IProps> = observer((props) => {
    const { children } = props;
    const { authStore } = useStore();

    if (!authStore.isAuth) {
        return <Navigate to="/" replace />;
    }

    return children;
});
