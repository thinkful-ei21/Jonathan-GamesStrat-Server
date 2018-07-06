'use strict';

const express = require('express');
const { IGDB_API_KEY } = require('../config');
const igdb = require('igdb-api-node').default;
const client = igdb(IGDB_API_KEY);

const router = express.Router();

router.get('/', (req, res, next) => {
  client
    .games(
      {
        fields: '*',
        limit: 50,
        order: 'popularity:desc',
        search: req.query.search
      },
      ['id', 'name', 'cover', 'popularity', 'total_rating']
    )
    .then(apiRes => res.json(apiRes.body))
    .catch(err => next(err));
});

module.exports = router;
