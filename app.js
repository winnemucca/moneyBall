var express = require('express');
var bodyParser = require('body-parser');
var indexController = require('./controllers/index.js');

var playerController = require('./controllers/player.js');
// var fs = require('fs');

var request = require('request');



var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/player-stats');

var app = express();
app.set('view engine', 'jade');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', indexController.index);
app.get('/player/playerStats',playerController.playerList);
app.get('/player/userProfile', playerController.userData);
app.get('/player/playerStats',playerController.playerStatAverage);
app.post('/player/playerStats',playerController.playerStatTotals);


var server = app.listen(7185, function() {
	console.log('Express server listening on port ' + server.address().port);
});
