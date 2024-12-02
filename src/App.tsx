// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { Breadcrumbs } from './components/shared/Breadcrumbs';
import { HomePage } from './pages/HomePage';
import { StructurePage } from './pages/StructurePage';

export function App() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Removemos a div extra que estava causando duplicação */}
      <Breadcrumbs />
      
      <div className="max-w-7xl mx-auto p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/estrutura/:tipo" element={<StructurePage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;