import { useEffect } from 'react';
import { Outlet } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../../store/authStore';
import { useUIStore } from '../../store/uiStore';
import Header from './Header';
import Footer from './Footer';
import LoadingSpinner from '../ui/LoadingSpinner';

export default function Layout() {
  const { initialize, loading } = useAuthStore();
  const { setTheme, theme } = useUIStore();

  useEffect(() => {
    // Initialize auth
    initialize();

    // Initialize theme
    setTheme(theme);

    // Handle system theme changes (only on client)
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = () => {
        if (theme === 'system') {
          setTheme('system');
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [initialize, setTheme, theme]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Header />
      <main className="pt-16">
        <Outlet />
      </main>
      <Footer />

      {/* Toast Notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
            border: '1px solid var(--toast-border)',
          },
          success: {
            iconTheme: {
              primary: '#10b981',
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444',
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  );
}
