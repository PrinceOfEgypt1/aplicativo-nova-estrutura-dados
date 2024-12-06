// src/App.tsx
import { Outlet } from 'react-router-dom';
import { Breadcrumbs } from './components/shared/Breadcrumbs';
import { DataStructureProvider } from './context/DataStructureContext';

function App() {
  return (
    <DataStructureProvider>
      <div className="min-h-screen bg-slate-950">
        <Breadcrumbs />
        <Outlet />
      </div>
    </DataStructureProvider>
  );
}

export { App };