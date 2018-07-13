'use strict';

const express = require('express');

const { IGDB_API_KEY } = require('../config');
const igdb = require('igdb-api-node').default;
const client = igdb(IGDB_API_KEY);

const router = express.Router();

router.get('/games', (req, res, next) => {
  const searchTerm = req.query.search;
  client
    .games(
      {
        fields: '*',
        limit: 50,
        order: 'popularity:desc',
        search: searchTerm
      },
      ['id', 'name', 'popularity', 'cover', 'total_rating']
    )
    .then(apiRes => res.json(apiRes.body))
    .catch(err => next(err));
});

router.get('/games/:id', (req, res, next) => {
  const { id } = req.params;

  client
    .games({ ids: [id] }, ['id', 'name', 'cover', 'summary', 'total_rating'])
    .then(apiRes => res.json(apiRes.body))
    .catch(err => next(err));
});

router.get('/release_dates', (req, res, next) => {
  client
    .games(
      {
        filters: {
          'release_dates.date-gt': '2010-12-31',
          'release_dates.date-lt': '2018-01-01'
        },
        limit: 50,
        offset: 0,
        order: 'release_dates.date:desc',
        search: 'mario'
      }[('id', 'release_dates.date', 'name', 'cover', 'total_rating')]
    )
    .then(apiRes => res.json(apiRes.body))
    .catch(err => next(err));
});

module.exports = router;
