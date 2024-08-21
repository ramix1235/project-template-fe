import i18next, { use, changeLanguage } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { getItem, setItem } from '#/services/webStorage';

import { INTL_MESSAGES, Locale, WEB_STORAGE_LOCALE } from './internationalization.constants';

export const setLocale = async (value: Locale) => {
  await changeLanguage(value);

  setItem(WEB_STORAGE_LOCALE, value);
};

const getLocale = () => {
  const rawLocale = getItem(WEB_STORAGE_LOCALE);

  const locale = rawLocale ? (rawLocale as Locale) : Locale.EN;

  return locale;
};

use(initReactI18next).init({
  fallbackLng: Locale.EN,
  lng: getLocale(),
  interpolation: {
    escapeValue: false, // Not needed for react as it escapes by default
  },
  resources: INTL_MESSAGES,
});

export default i18next;
