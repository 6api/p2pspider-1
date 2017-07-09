/**
 * Web Server
 */

var site_title = 'Tordex v1.2';

/**
 * Mongoose / MongoDB
 */
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/magnetdb';
mongoose.connect(mongoDB);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { console.log('MongoDB has connected.'); });

var magnetSchema = mongoose.Schema({
  name: String,
  infohash: {type: String, index: true},
  magnet: String,
  fetchedAt: Number
});

var Magnet = mongoose.model('Magnet', magnetSchema, "magnetdb");

/**
 *  Just in case.
 *  db.dropDatabase();
 **/
// db.dropDatabase();

/**
 * Express / Web App
 */
var express = require('express');
var path = require('path');
var app = express();

app.set('view engine', 'pug');
app.use('/public', express.static(path.join(__dirname + '/public')));

app.use(function (req, res, next) {
  res.locals.ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log('FROM: ' + res.locals.ip + ' ON: ' + req.originalUrl);
  next();
});

if (app.get('env') === 'development') {
  app.locals.pretty = true;
};

/**
 * Routing / Pages
 */
app.get('/', function (req, res) {
  Magnet.count({}, function( err, count ) {
    // render home page
    res.render(
      'index',
      { title: site_title, count: count }
    );
  });
});

app.get('/latest', function (req, res) {
  Magnet.find({}, function(err,results){
    res.render(
      // displays latest with search style
      'search',
      { title: site_title, results: results }
    );
  }).limit(25).sort({ 'fetchedAt': -1 });
});

app.get('/infohash', function(req,res){
  if(!req.query.hash) {
    // display search page
    res.render(
      'searchform',
      { title: site_title }
    );
  } else {
    var infohash = new RegExp(req.query.hash, 'i');
    if(req.query.hash.length < 39) {
      // display error
      res.render(
        'error',
        { title: site_title, error: "Type a longer infohash query." }
      );
    } else {
      // find search query
      Magnet.find({infohash: infohash}, function(err,result){
        res.render(
          'single',
          { title: site_title, result: result }
        );
      });
    };
  }
});

app.get('/search', function(req,res){
  if(!req.query.q) {
    // display search page
    res.render(
      'searchform',
      { title: site_title }
    );
  } else {
    var searchqueryregex = new RegExp(req.query.q, 'i');
    if(req.query.q.length < 3) {
      // display error
      res.render(
        'error',
        { title: site_title, error: "Type a longer search query." }
      );
    } else {
      // find search query
      Magnet.find({name: searchqueryregex}, function(err,results){
        res.render(
          'search',
          { title: site_title, results: results }
        );
      });
    };
  }
});

/**
 * Start Express
 */
app.listen(8080, function () {
  console.log('Webserver is listening on port 8080!');
});
