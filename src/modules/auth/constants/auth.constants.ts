export const AUTH_REGEX = {
  NAME_REGEX: /.*\S+.*/,
  PASSWORD_REGEX: /^(?=.*[A-Za-z])[A-Za-z\d]{6,}$/,
};

export const AUTH_MESSAGES = {
  NAME_MESSAGE: 'Name must not be empty',
  PASSWORD_MESSAGE: 'Password must be at least 6 characters long',
};
