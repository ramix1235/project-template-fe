import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';

beforeEach(() => {
  // Mantine
  const { getComputedStyle } = window;
  window.getComputedStyle = (elt) => getComputedStyle(elt);
  window.HTMLElement.prototype.scrollIntoView = () => {};

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }

  window.ResizeObserver = ResizeObserver;

  // i18next
  vi.mock('react-i18next', () => ({
    useTranslation: () => {
      return {
        t: (i18nKey: string) => i18nKey,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    initReactI18next: {
      type: '3rdParty',
      init: () => {},
    },
    Trans: ({ i18nKey }: { i18nKey: string }) => i18nKey,
  }));

  vi.mock('#/services/internationalization', () => ({
    i18n: {
      t: (i18nKey: string) => i18nKey,
    },
  }));
});
