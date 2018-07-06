'use strict';

require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8080,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRY: process.env.JWT_EXPIRY || '7d',

  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000',
  IGDB_API_KEY: process.env.IGDB_API_KEY,

  MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost/gameStrat',
  TEST_MONGODB_URI:
    process.env.TEST_MONGODB_URI || 'mongodb://localhost/gameStrat-test'
  // DATABASE_URL:
  //   process.env.DATABASE_URL || 'mongodb://localhost/thinkful-backend',
  // TEST_DATABASE_URL:
  //   process.env.TEST_DATABASE_URL || 'mongodb://localhost/thinkful-backend-test',
};
