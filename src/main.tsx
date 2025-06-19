import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext'; // Adjust path if needed
import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
    <Toaster position="top-right" reverseOrder={false} />
  </AuthProvider>
);
