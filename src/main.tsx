import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { PopupProvider } from './providers/PopProvider.tsx';
import { LoginProvider } from './providers/LoginProvider.tsx';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoginProvider>
        <PopupProvider>
          <App />
        </PopupProvider>
      </LoginProvider>
    </QueryClientProvider>
  </StrictMode>
);
