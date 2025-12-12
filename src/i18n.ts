import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import ar from './locales/ar.json';
import nl from './locales/nl.json';

export const SUPPORTED_LANGUAGES = ['en', 'ar', 'nl'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

const resources = {
  en: { translation: en },
  ar: { translation: ar },
  nl: { translation: nl }
} as const;

const RTL_LANGUAGES = new Set<SupportedLanguage>(['ar']);

export const getDirection = (language: SupportedLanguage): 'ltr' | 'rtl' =>
  RTL_LANGUAGES.has(language) ? 'rtl' : 'ltr';

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  supportedLngs: SUPPORTED_LANGUAGES,
  load: 'languageOnly',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
