'use strict';

const mongoose = require('mongoose');

const stratSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  gameId: { type: Number, required: true }
});

// Add `createdAt` and `updatedAt` fields
stratSchema.set('timestamps', true);

// Customize output for `res.json(data)`, `console.log(data)` etc.
stratSchema.set('toObject', {
  virtuals: true, // include built-in virtual `id`
  versionKey: false, // remove `__v` version key
  transform: (doc, ret) => {
    delete ret._id; // delete `_id`
  }
});

module.exports = mongoose.model('Strat', stratSchema, 'strats');
