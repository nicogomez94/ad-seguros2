import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme === 'light' || savedTheme === 'dark') {
      return savedTheme;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.style.colorScheme = 'dark';
    } else {
      root.classList.remove('dark');
      root.style.colorScheme = 'light';
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Avoid accidental triggers when typing in text fields or textareas
      const active = document.activeElement;
      if (active) {
        const tagName = active.tagName.toLowerCase();
        const isEditable = active.getAttribute('contenteditable') === 'true';
        if (tagName === 'input' || tagName === 'textarea' || isEditable) {
          return;
        }
      }

      // Shortcuts: Alt + T, Alt + D, or Ctrl + Shift + T (or Cmd on macOS)
      const isAltT = e.altKey && e.key.toLowerCase() === 't';
      const isAltD = e.altKey && e.key.toLowerCase() === 'd';
      const isCtrlShiftT = (e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 't';

      if (isAltT || isAltD || isCtrlShiftT) {
        e.preventDefault();
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
