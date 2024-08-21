// TODO: Set your routes

export const MAIN_ROUTES = {
  // Identity
  LOGIN: '/login',
  REGISTER: '/signup',
  RESET_PASSWORD: '/reset-password',
  SETUP_PASSWORD: '/password-setup',

  // User
  HOME: '/',
  SETTINGS: '/account-settings',
  DEBUG: '/debug',

  // Other
  ACTION_REDIRECT: '/action/*',
};

export const SETTINGS_ROUTES = {
  CHANGE_EMAIL: `${MAIN_ROUTES.SETTINGS}/email`,
  CHANGE_PASSWORD: `${MAIN_ROUTES.SETTINGS}/password`,
};
