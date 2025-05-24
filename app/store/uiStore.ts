import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  theme: 'light' | 'dark' | 'system';
  sidebarOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  readingProgress: number;

  // Actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  toggleTheme: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;
  setSearchOpen: (open: boolean) => void;
  toggleSearch: () => void;
  setMobileMenuOpen: (open: boolean) => void;
  toggleMobileMenu: () => void;
  setReadingProgress: (progress: number) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set, get) => ({
      theme: 'system',
      sidebarOpen: false,
      searchOpen: false,
      mobileMenuOpen: false,
      readingProgress: 0,

      setTheme: (theme) => {
        set({ theme });

        // Apply theme to document (only on client)
        if (typeof window !== 'undefined' && typeof document !== 'undefined') {
          const root = document.documentElement;
          if (theme === 'dark') {
            root.classList.add('dark');
          } else if (theme === 'light') {
            root.classList.remove('dark');
          } else {
            // System theme
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
              root.classList.add('dark');
            } else {
              root.classList.remove('dark');
            }
          }
        }
      },

      toggleTheme: () => {
        const { theme } = get();
        const newTheme = theme === 'light' ? 'dark' : theme === 'dark' ? 'system' : 'light';
        get().setTheme(newTheme);
      },

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleSidebar: () => {
        const { sidebarOpen } = get();
        set({ sidebarOpen: !sidebarOpen });
      },

      setSearchOpen: (open) => set({ searchOpen: open }),

      toggleSearch: () => {
        const { searchOpen } = get();
        set({ searchOpen: !searchOpen });
      },

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      toggleMobileMenu: () => {
        const { mobileMenuOpen } = get();
        set({ mobileMenuOpen: !mobileMenuOpen });
      },

      setReadingProgress: (progress) => set({ readingProgress: progress }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);
