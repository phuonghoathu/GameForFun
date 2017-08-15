var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Create schema of table sliderbars
var sliderbars = new Schema({
	image: String,
	title: String,
	content: String
});

// Create schema of table games
var games = new Schema({
	thumbnail: String,
	name: String,
	url: String
});

mongoose.model('sliderbars', sliderbars);
mongoose.model('games', games);

mongoose.Promise = global.Promise;

// Connect DB
mongoose.connect('mongodb://localhost:27017/GameFF');
