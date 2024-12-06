// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App';
import './index.css';
import { ErrorBoundary } from './errors/ErrorBoundary';
import { AppProvider } from './context/AppProvider';
import { HomePage } from './pages/HomePage'; // Importe HomePage
import { StructurePage } from './pages/StructurePage'; // Importe StructurePage


const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppProvider>
        <App />
      </AppProvider>
    ),
    errorElement: <ErrorBoundary><div>Algo deu errado</div></ErrorBoundary>,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'estrutura/:tipo',
        element: <StructurePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);