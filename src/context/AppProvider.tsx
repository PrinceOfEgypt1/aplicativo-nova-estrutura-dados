import React, { useState, useEffect } from 'react';
import { AppContext, AppContextType } from './AppContext';

interface AppProviderProps {
  children: React.ReactNode;
  navigate?: (to: string, options?: { replace?: boolean }) => void;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children, navigate }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme === 'light' || savedTheme === 'dark') ? savedTheme : 'dark';
  });
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('auth-token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : undefined;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const logout = () => {
    if (navigate) {
      localStorage.removeItem('auth-token');
      localStorage.removeItem('user');
      setIsAuthenticated(false);
      setUser(undefined);
      navigate('/', { replace: true });
    }
  };

  const contextValue: AppContextType = {
    theme,
    toggleTheme,
    isAuthenticated,
    logout,
    user,
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};