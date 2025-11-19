import { Outlet } from 'react-router-dom';
import { PageHeader } from './components/shared/PageHeader';
import { Breadcrumb } from './components/shared/Breadcrumb';
import { DataStructureProvider } from './context/DataStructureContext';

function App() {
  return (
    <DataStructureProvider>
      <div className="min-h-screen bg-slate-950">
        <PageHeader />
        <Breadcrumb />
        <Outlet />
      </div>
    </DataStructureProvider>
  );
}

export { App };
