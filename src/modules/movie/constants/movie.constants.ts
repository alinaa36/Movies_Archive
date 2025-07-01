export const MOVIE_REGEX = {
  TITLE_REGEX: /\S/,
  STARS_REGEX: /^[\p{L}\-\. ]+$/u,
};

export const MOVIE_MESSAGES = {
  TITLE_MESSAGE: 'Title must not contain only whitespace',
  STARS_MESSAGE: 'Name can only contain letters, spaces, dash and dot.',
};