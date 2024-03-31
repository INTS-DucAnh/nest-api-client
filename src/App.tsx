import './App.css';
import AppRouter from './components/app-router';
import { Toaster } from './components/ui/toaster';
import useTheme from './hooks/useTheme.hook';

function App() {
  const { theme } = useTheme();

  return (
    <div className={`App ${theme} h-[100dvh] w-[100dvw] bg-card`}>
      <AppRouter />
      <Toaster />
    </div>
  );
}

export default App;
