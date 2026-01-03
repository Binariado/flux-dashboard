import { BrowserRouter } from 'react-router';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { LoadingProvider } from '@/providers/LoadingProvider';
import { AppRoutes } from '@/routers';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LoadingProvider>
          <AppRoutes />
        </LoadingProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
