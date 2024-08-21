import messages_en from './translations/en.json';
import messages_fr from './translations/fr.json';

export const WEB_STORAGE_LOCALE = 'locale';

// TODO: Set your locales

export const INTL_MESSAGES = {
  en: messages_en,
  fr: messages_fr,
};

export enum Locale {
  EN = 'en',
  FR = 'fr',
}
