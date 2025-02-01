import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Routing from '../pages';

function App() {
    return (
        <>
            <Routing />
            <ToastContainer />
        </>
    );
}

export default App;
