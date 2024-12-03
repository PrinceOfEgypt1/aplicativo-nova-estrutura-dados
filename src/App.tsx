// src/App.tsx
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './components/shared/Breadcrumbs';

export function App() {
    return (
        <div className="min-h-screen bg-slate-950">
            <Breadcrumbs />
            <div className="max-w-7xl mx-auto p-6">
                <Outlet /> {/* Renderiza as rotas filhas */}
            </div>
        </div>
    );
}

export default App;