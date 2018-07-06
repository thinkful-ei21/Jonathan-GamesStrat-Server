'use strict';

const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const { jwtPassport } = require('../passports/passports');

const Strat = require('../models/strat');

const router = express.Router();

// GET all
router.get('/', (req, res, next) => {
  const { searchTerm, gameId, userId } = req.query;

  const filter = {};

  if (gameId) {
    filter.gameId = gameId;
  }

  if (userId) {
    filter.user = userId;
  }

  if (searchTerm) {
    const re = new RegExp(searchTerm, 'i');
    filter.$or = [{ title: re }, { content: re }];
  }

  Strat.find(filter)
    .sort({ updatedAt: 'desc' })
    .then(results => res.json(results))
    .catch(err => next(err));
});

//GET by ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Strat.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

//Post a new strategy
router.post('/', jwtPassport, (req, res, next) => {
  let { title, content, gameId } = req.body;
  const userId = req.user.id;
  const strategy = { title, content, userId, gameId };
  Strat.create(strategy)
    .then(result => res.status(201).json(result))
    .catch(err => {
      console.log(err);
      // Forward validation errors on to the client, otherwise give a 500
      // error because something unexpected has happened
      if (err.reason === 'ValidationError') {
        return res.status(err.code).json(err);
      }
      res.status(500).json({ code: 500, message: 'Internal server error' });
    });
});

//Update
router.put('/:id', jwtPassport, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, content, gameId = 1 } = req.body;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  if (title === '') {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  const updateNote = { title, content, gameId, userId };
  const filter = { _id: id, userId };

  Strat.findOneAndUpdate(filter, updateNote, { new: true })
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => next(err));
});

//Delete
router.delete('/:id', jwtPassport, (req, res, next) => {
  const { id } = req.params;
  const userId = req.user.id;

  /***** Never trust users - validate input *****/
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error('The `id` is not valid');
    err.status = 400;
    return next(err);
  }

  Strat.findOneAndRemove({ _id: id, userId })
    .then(() => {
      res.sendStatus(204);
    })
    .catch(err => next(err));
});

module.exports = router;
