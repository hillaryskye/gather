var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/publications');
var Publications = db.get('publications');
require('dotenv').load()

router.get('/', function(req, res) {
  Publications.find({}, function(err, publications) {
    if (err) {
      res.send(err);
    }
    res.status(200).json(publications);
  })
});

router.post('/', function(req, res) {
  Publications.insert(req.body, function(err, publication) {
    console.log('adding')
    if (err) {
      res.send(err)
    }
    res.status(201).json(publication)
    console.log('adding to json')
  })
});

router.get('/:id', function(req, res) {
  Publications.findOne({_id: req.params.id}, function(err, publication) {
    if(err) {
      res.send(err)
    }
    res.status(200).json(publication)
  })
})

router.put('/:id', function(req, res) {
  Publications.findAndModify({_id: req.params.id}, req.body, function(err, publication) {
    if(err) {
      throw err
    }
    res.json(req.body)
  })
})

router.delete('/:id', function(req, res) {
  Publications.remove({_id: req.params.id}, function(err, publication){
    if (err) {
      throw err;
    }
    res.status(204).json(publication);
  });
});

module.exports = router
