import { createTheme, CSSVariablesResolver, rem, em } from '@mantine/core';

// https://mantine.dev/theming/theme-object

const theme = createTheme({
  cursorType: 'pointer',
  other: {
    viteBrandColor: '#646cffaa',
    reactBrandColor: '#61dafbaa',
    pageHeaderHeight: rem(100),
    pageHeaderOffset: rem(100),
  },
  /*
    Define variables for breakpoints, values must be the same as in _mantine.scss.

    About breakpoints: https://mantine.dev/styles/responsive/#configure-breakpoints
    Why 'em' units: https://mantine.dev/styles/rem/#em-units
  */
  breakpoints: {
    xs: em('576px'), // Extra small devices (portrait phones, less than 576px
    sm: em('768px'), // Small devices (landscape phones, less than 768px)
    md: em('992px'), // Medium devices (tablets, less than 992px)
    lg: em('1200px'), // Large devices (desktops, less than 1200px)
    xl: em('1408px'), // Extra large devices (large desktops) (less than 1408px)
  },
});

const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {
    '--page-header-height': theme.other.pageHeaderHeight,
    '--page-header-offset': theme.other.pageHeaderOffset,
  },
  light: {
    '--vite-brand-color': theme.other.viteBrandColor,
    '--react-brand-color': theme.other.reactBrandColor,
  },
  dark: {
    '--vite-brand-color': theme.other.viteBrandColor,
    '--react-brand-color': theme.other.reactBrandColor,
  },
});

export { theme, cssVariablesResolver };
