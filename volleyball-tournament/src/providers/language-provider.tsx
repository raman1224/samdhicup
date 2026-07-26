'use client';

import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

type Locale = 'en' | 'ne';

type LanguageContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  isPending: boolean;
};

const LanguageContext = createContext<LanguageContextType>({
  locale: 'en',
  setLocale: () => {},
  isPending: false,
});

export function LanguageProvider({ children, initialLocale }: { children: ReactNode; initialLocale?: string }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [isPending, setIsPending] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('preferred-locale');
    if (saved === 'en' || saved === 'ne') {
      setLocaleState(saved);
    } else if (initialLocale === 'en' || initialLocale === 'ne') {
      setLocaleState(initialLocale as Locale);
    }
    setMounted(true);
  }, [initialLocale]);

  const setLocale = useCallback((newLocale: Locale) => {
    if (newLocale === locale) return;
    
    setIsPending(true);
    
    // Save to both localStorage and cookie
    localStorage.setItem('preferred-locale', newLocale);
    document.cookie = `preferred-locale=${newLocale};path=/;max-age=31536000;SameSite=Lax`;
    
    setLocaleState(newLocale);
    
    // Reload to apply new translations from server
    window.location.reload();
  }, [locale]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, isPending }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);