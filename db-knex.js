'use strict';

const createKnex = require('knex');

const { MONGODB_URI } = require('./config');

let knex = null;

function dbConnect(url = MONGODB_URI) {
  knex = createKnex({
    client: 'pg',
    connection: url
  });
}

function dbDisconnect() {
  return knex.destroy();
}

function dbGet() {
  return knex;
}

module.exports = {
  dbConnect,
  dbDisconnect,
  dbGet
};
