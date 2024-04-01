import './App.css';
import AppRouter from './components/app-router';
import { Toaster } from './components/ui/toaster';
import UserContextProvider from './contexts/user.context';
import useTheme from './hooks/useTheme.hook';

function App() {
  const { theme } = useTheme();

  return (
    <div
      className={`App ${theme} text-foreground h-[100dvh] w-[100dvw] bg-background`}>
      <UserContextProvider>
        <AppRouter />
        <Toaster />
      </UserContextProvider>
    </div>
  );
}

export default App;
