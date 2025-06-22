import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux'; // ✅ import Provider
import { store } from './redux/store';  // ✅ import store

createRoot(document.getElementById('root')!).render(
  <Provider store={store}> {/* ✅ Wrap Redux Provider */}
    <AuthProvider>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </AuthProvider>
  </Provider>
);
