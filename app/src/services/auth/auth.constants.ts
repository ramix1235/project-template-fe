export const REQUIRED_LENGTH = 1;
export const MAX_FIELD_LENGTH = 100;
export const MAX_EMAIL_LENGTH = 254;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 60;

// https://ihateregex.io/expr/password
const uppercase = 'A-Z';
const lowercase = 'a-z';
const digit = '0-9';
const special = '#?!@$ %^&*-';
const minmax = `${MIN_PASSWORD_LENGTH},${MAX_PASSWORD_LENGTH}`;

export const PASSWORD_IS_STRONG_REGEX = new RegExp(
  `^(?=.*?[${uppercase}])(?=.*?[${lowercase}])(?=.*?[${digit}])(?=.*?[${special}]).{${minmax}}$`,
);
