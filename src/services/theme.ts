import { createTheme, CSSVariablesResolver, rem } from '@mantine/core';

const theme = createTheme({
  cursorType: 'pointer',
  other: {
    viteBrandColor: '#646cffaa',
    reactBrandColor: '#61dafbaa',
    pageHeaderHeight: rem(100),
    pageHeaderOffset: rem(100),
  },
});

const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--page-header-height': theme.other.pageHeaderHeight,
    '--page-header-offset': theme.other.pageHeaderOffset,
  },
  light: {
    '--vite-brand-color': theme.other.viteBrandColor,
    '--react-brand-color': theme.other.reactBradColor,
  },
  dark: {
    '--vite-brand-color': theme.other.viteBrandColor,
    '--react-brand-color': theme.other.reactBrandColor,
  },
});

export { theme, cssVariablesResolver };
