var express = require('express');
var bodyParser = require('body-parser');
// var gather = require('./routes/gather');
require('dotenv').load()

var app = express();

var cors = require('cors');
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.render('index', { user: req.user });
});

// app.use('/api/gather', gather);

app.listen(process.env.PORT || 3000);
console.log('Server started on localhost://3000');

module.exports = app
