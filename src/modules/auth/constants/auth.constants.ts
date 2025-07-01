export const AUTH_REGEX = {
  NAME_REGEX: /^([A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+)\s([A-ZА-ЯІЇЄҐ][a-zа-яіїєґ']+)$/,
  PASSWORD_REGEX: /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/,
};

export const AUTH_MESSAGES = {
  NAME_MESSAGE: 'Name must consist of two words, each starting with a capital letter',
  PASSWORD_MESSAGE: 'Password must be at least 6 characters long',
};
