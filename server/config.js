'use strict';

module.exports = {
  DEFAULT_PORT: process.env.PORT || 3000,
  DATABASE_URL: process.env.DATABASE_URL ||
    'postgres://postgres:postgres@localhost/epam_interviewer',
  DEFAULT_LOGGING_LEVEL: process.env.DEFAULT_LOGGING_LEVEL || 'debug',
  DEFAULT_FRONTEND_LOGGING_LEVEL: process.env.DEFAULT_FRONTEND_LOGGING_LEVEL || 'info',
  LOGGING_LEVELS: ['debug', 'info', 'warn', 'error'],
  EXPRESS_SESSION_CONFIG: {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
  },
  PASSPORT_CONFIG: {
    usernameField: 'email',
    passwordField: 'password',
  },
  ENCRYPT_SALT: process.env.ENCRYPT_SALT,
  PUBLIC_FOLDER_NAME: 'client',
};
