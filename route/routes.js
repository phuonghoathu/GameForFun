// require express
var express = require('express');

// create router object
var router = express.Router();

var mongoose = require('mongoose');
var slidersModel = mongoose.model('sliderbars');
var gamesModel = mongoose.model('games');
var listGames;
var listSliders;
var message;

// route for homepage
router.get('/', function (req, res) {
	// Get sliders
	slidersModel.find(function(err, sliderbars) {
		if (err) {
			console.log(err);
			res.send('Page not found!');
		} else {
			listSliders = sliderbars;

			// Get list games
			gamesModel.find(function(err, games) {
				if (err) {
					console.log(err);
					res.send('Page not found!');
				} else {
					listGames = games;
					res.render('pages/home', {silderbars : listSliders, games : listGames });
				}
			});
		}
	});
});

router.get('/view_all', function(req, res) {
	res.render('pages/view_all', {silderbars : listSliders, games : listGames});
});

router.get('/play', function(req, res) {
	var id = req.query.id;

	gamesModel.findOne({'_id':id}, function(err, result) {
		console.log(result);
		res.render('pages/play', {ids : result});
	});
});

// router for add data page/Admin page
router.get('/admin_cnm', function(req, res) {
	res.render('pages/admin', { message : message });
});

// Add new slider to DB
router.post('/addSlider', function(req, res) {
	new slidersModel({image: req.body.image,
				title: req.body.title,
				content: req.body.content})
		.save(function(err, sliderbars) {
			message = "Add slider success";
			res.redirect('/admin_cnm');
		});
});

// Add new game to DB
router.post('/addGame', function(req, res) {
	new gamesModel({thumbnail: req.body.thumbnail,
				name: req.body.name,
				url: req.body.url})
		.save(function(err, games) {
			message = "Add game success";
			res.redirect('/admin_cnm');
		});
});

// export router
module.exports = router;