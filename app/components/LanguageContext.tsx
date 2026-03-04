"use client"
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>('en'); // Default language is English

  // Expose current language for the chat assistant (getSiteLanguage() and LLM context)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as unknown as { __PORTFOLIO_SITE_LANGUAGE__?: string }).__PORTFOLIO_SITE_LANGUAGE__ = language;
    }
  }, [language]);

  // Listen for AutoUI-triggered language changes from the chat
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ target?: string; cycle?: boolean }>).detail;
      const supported = ['en', 'ua', 'pl'] as const;
      if (detail?.target && supported.includes(detail.target as any)) {
        setLanguage(detail.target);
        return;
      }
      // cycle through languages if no explicit target provided
      setLanguage((prev) => {
        const idx = supported.indexOf(prev as any);
        const nextIndex = idx === -1 ? 0 : (idx + 1) % supported.length;
        return supported[nextIndex];
      });
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('autoui-toggle-language', handler as EventListener);
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('autoui-toggle-language', handler as EventListener);
      }
    };
  }, []);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};




