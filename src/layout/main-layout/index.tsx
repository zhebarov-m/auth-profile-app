import { Outlet } from 'react-router-dom';
import HeaderWidget from '../../widgets/header';

const MainLayout = () => {
    return (
        <div>
            <HeaderWidget />
            <div>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
