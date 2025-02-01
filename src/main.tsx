import { createRoot } from 'react-dom/client';
import './app/styles/index.css';
import App from './app/App.tsx';
import { BrowserRouter } from 'react-router-dom';
import { TooltipProvider } from './components/ui/tooltip.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <TooltipProvider>
            <App />
        </TooltipProvider>
    </BrowserRouter>
);
