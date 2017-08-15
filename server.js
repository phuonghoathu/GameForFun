require('./models/database');

// require my dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var swig 		   = require('swig');

var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(methodOverride('_method'))

// use body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

// route my app
var router = require('./route/routes');
app.use('/', router);

// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});

// export my app
module.exports = app;

