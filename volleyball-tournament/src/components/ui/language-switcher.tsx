'use client';

import { memo, useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/providers/language-provider';
import { Globe, Check, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'en' as const, label: 'English', flag: '🇬🇧', nativeLabel: 'English' },
  { code: 'ne' as const, label: 'Nepali', flag: '🇳🇵', nativeLabel: 'नेपाली' },
];

const LanguageSwitcher = memo(function LanguageSwitcher() {
  const { locale, setLocale, isPending } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find(l => l.code === locale) || languages[0];

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSwitch = useCallback((langCode: 'en' | 'ne') => {
    if (langCode !== locale && !isPending) {
      setLocale(langCode);
      setIsOpen(false);
    }
  }, [locale, setLocale, isPending]);

  return (
    <div ref={dropdownRef} className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 transition-colors text-sm"
        aria-label="Switch language"
      >
        <Globe className="w-4 h-4 text-gray-400" />
        <span className="hidden sm:inline text-gray-300 font-medium">
          {currentLang.flag} {currentLang.label}
        </span>
        <span className="sm:hidden text-gray-300">
          {currentLang.flag}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </motion.span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-44 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl overflow-hidden z-50"
          >
            {languages.map((lang) => (
              <motion.button
                key={lang.code}
                onClick={() => handleSwitch(lang.code)}
                whileHover={{ backgroundColor: 'rgba(249,115,22,0.1)' }}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                  locale === lang.code
                    ? 'bg-orange-500/10 text-orange-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                disabled={isPending}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="flex-1 text-left font-medium">
                  {lang.nativeLabel}
                </span>
                {locale === lang.code && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  >
                    <Check className="w-4 h-4 text-orange-400" />
                  </motion.span>
                )}
              </motion.button>
            ))}
            
            {isPending && (
              <div className="px-4 py-3 text-xs text-gray-500 text-center border-t border-gray-800">
                Switching language...
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default LanguageSwitcher;