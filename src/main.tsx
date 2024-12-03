// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { AppProvider } from './context/AppProvider';

const router = createBrowserRouter([
    {
        path: "/*",
        element: (
            <AppProvider> {/* Adicione o AppProvider aqui */}
                <App />
            </AppProvider>
        ),
        errorElement: <ErrorBoundary><div>Algo deu errado</div></ErrorBoundary>, // Children adicionado
        
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
