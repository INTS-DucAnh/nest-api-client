import { useEffect } from 'react';
import './App.css';
import AppRouter from './components/app-router';
import { Toaster } from './components/ui/toaster';
import UserContextProvider from './contexts/user.context';
import useTheme from './hooks/useTheme.hook';

export default function App() {
  const { theme } = useTheme();

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div
      className={`App text-foreground h-[100dvh] w-[100dvw] bg-background`}>
      <UserContextProvider>
        <AppRouter />
        <Toaster />    
      </UserContextProvider>      
    </div>
  );
}


