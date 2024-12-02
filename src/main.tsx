// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Import the App component with its named export
import { App } from './App';
import { HomePage } from './pages/HomePage';
import { StructurePage } from './pages/StructurePage';
import './index.css';

function ErrorBoundaryComponent() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <div className="bg-red-500/10 border border-red-500 rounded-lg p-6 max-w-lg text-center">
        <h2 className="text-red-500 text-xl font-semibold mb-4">
          Ops! Algo deu errado
        </h2>
        <p className="text-slate-300 mb-4">
          Desculpe, encontramos um problema ao carregar esta página.
        </p>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Voltar para a página inicial
        </button>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: '/*',
    element: <App />,
    errorElement: <ErrorBoundaryComponent />,
    children: [
      {
        path: '',
        element: <HomePage />
      },
      {
        path: 'estrutura/:tipo',
        element: <StructurePage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);