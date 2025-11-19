import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export function Breadcrumb() {
  const location = useLocation();
  const paths = location.pathname.split('/').filter(Boolean);

  if (location.pathname === '/') {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className="border-b border-slate-800 bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <ol className="flex items-center gap-2 py-3 text-sm">
          <li>
            <Link
              to="/"
              className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors"
              aria-label="Voltar para página inicial"
            >
              <Home className="h-4 w-4" aria-hidden="true" />
              <span className="hidden sm:inline">Início</span>
            </Link>
          </li>

          {paths.map((path, index) => {
            const isLast = index === paths.length - 1;
            const to = `/${paths.slice(0, index + 1).join('/')}`;
            const formattedPath = path.replace(/-/g, ' ');

            return (
              <li key={path} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4 text-slate-600" aria-hidden="true" />
                {isLast ? (
                  <span className="text-white capitalize font-medium" aria-current="page">
                    {formattedPath}
                  </span>
                ) : (
                  <Link
                    to={to}
                    className="text-slate-400 hover:text-white transition-colors capitalize"
                  >
                    {formattedPath}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
