import { Outlet } from 'react-router-dom';
import { PageHeader } from './components/shared/PageHeader';
import { Breadcrumb } from './components/shared/Breadcrumb';
import { DataStructureProvider } from './context/DataStructureContext';

function App() {
  return (
    <DataStructureProvider>
      <div className="h-screen overflow-hidden bg-slate-950 flex flex-col">
        <PageHeader />
        <Breadcrumb />
        <div className="flex-1 min-h-0 overflow-auto">
          <Outlet />
        </div>
      </div>
    </DataStructureProvider>
  );
}

export { App };
