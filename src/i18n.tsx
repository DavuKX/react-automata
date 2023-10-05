import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next';

import translationEn from '../public/locales/en/translation.json'
import translationEs from '../public/locales/es/translation.json'
import translationsPt from '../public/locales/pt/translation.json'

const resources = {
    en: {
        translation: translationEn,
    },
    es: {
        translation: translationEs,
    },
    pt: {
        translation: translationsPt,
    },
}

i18n
.use(Backend)
.use(LanguageDetector)
.use(initReactI18next)
.init({
    fallbackLng: 'en',
    debug: true,
    detection: {
        order: ['queryString', 'cookie'],
    },
    interpolation: {
        escapeValue: false,
    }
});

export default i18n;
