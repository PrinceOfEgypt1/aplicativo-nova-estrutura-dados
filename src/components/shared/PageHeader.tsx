import { Link } from 'react-router-dom';
import { Moon, Sun, LogOut } from 'lucide-react';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Button } from '../ui/Button';

export function PageHeader() {
  const { theme, toggleTheme, logout } = useContext(AppContext);

  const handleLogout = () => {
    if (window.confirm('Deseja realmente sair da aplicação?')) {
      logout();
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/75">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
            aria-label="Voltar para a página inicial"
          >
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-white tracking-tight">
                  DATALAB
                </h1>
                <span className="text-xs text-slate-400 hidden sm:block">
                  Visualize. Experimente. Aprenda.
                </span>
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              title={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-slate-400" />
              ) : (
                <Moon className="h-5 w-5 text-slate-400" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              aria-label="Sair da aplicação"
              className="text-slate-400 hover:text-red-400"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Sair</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
