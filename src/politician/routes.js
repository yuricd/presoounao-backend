const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Politician = require('./model');

router.get('/', (req, res, next) => {
  const getIds = req.query.getIds;

  if (getIds === undefined) {
    Politician
    .find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    })
  } else {
    Politician
    .find()
    .select('_id')
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(error => {
      res.status(500).json({
        error
      })
    })
  }
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;

  Politician.findById(id)
    .exec()
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: 'No document for given ID'
        })
      }
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

router.post('/', (req, res, next) => {
  const { active, arrestment, name, position, details, picture, references } = req.body;

  const politician = new Politician({
    _id: new mongoose.Types.ObjectId(),
    arrestment,
    name,
    position,
    picture,
    details,
    references,
    active
  })

  politician
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Create Politico',
        createdPolitician: politician
      });
    })
    .catch(error => {
      res.status(500).json(error)
    })
});

module.exports = router;