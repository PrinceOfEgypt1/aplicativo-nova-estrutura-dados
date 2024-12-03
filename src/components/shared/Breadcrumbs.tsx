import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../ui/Button';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';

export function Breadcrumbs() {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AppContext);

  const paths = location.pathname.split('/').filter(Boolean);
  const ehPaginaInicial = location.pathname === '/';

  const handleSair = () => {
    if (window.confirm('Deseja realmente sair da aplicação?')) {
      logout();
    }
  };
  
  return (
    <div className="border-b border-slate-800 bg-slate-900">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-4">
            {!ehPaginaInicial && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                aria-label="Voltar para a página anterior"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
            )}
            <Link 
              to="/" 
              className="text-xl font-bold text-white hover:text-purple-400 transition-colors"
              role="heading"
              aria-level={1}
            >
              Estruturas de Dados Interativas
            </Link>
          </div>
          
          <Button
            variant="destructive"
            size="sm"
            onClick={handleSair}
            aria-label="Sair da aplicação"
          >
            Sair
          </Button>
        </div>

        <nav aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link 
                to="/" 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Home
              </Link>
            </li>
            
            {paths.map((path, index) => {
              const isLast = index === paths.length - 1;
              const to = `/${paths.slice(0, index + 1).join('/')}`;
              const formattedPath = path.replace(/-/g, ' ');

              return (
                <li key={path} className="flex items-center">
                  <ChevronRight className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                  {isLast ? (
                    <span className="ml-2 text-gray-900 dark:text-white capitalize">
                      {formattedPath}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="ml-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 capitalize"
                    >
                      {formattedPath}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </div>
    </div>
  );
}
