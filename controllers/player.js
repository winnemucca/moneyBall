var Player = require('../models/playerInfo.js');
var request = require('request');
var _ = require('underscore');

var api_key='Api-Key 7799D516-6596-4B80-9C38-270885E543C7';
var statistics = {
				Assists:0,
				Blocks: 0,
				DefensiveRebounds: 0,
				Differential: 0,
				FieldGoalsAttempted: 0,
				FieldGoalsMade: 0,
				FreeThrowsAttempted: 0,
				FreeThrowsMade: 0,
				Minutes: 0,
				OffensiveRebounds: 0,
				PersonalFouls: 0,
				Steals: 0,
				ThreePointsAttempted: 0,
				ThreePointsMade: 0,
				TotalRebounds: 0,
				Turnovers: 0
			};

var playerController = {
	playerList: function(req, res) {
	var options = {
		url: 'http://fantasy.host/api/nba/players',
		headers: {
			'Content-Type':'application/json',
			'Authorization': api_key
		}
	
	};
	function callback(error,response,body){
		if(!error && response.statusCode == 200) {
			var info = JSON.parse(body);
		}
			res.render('playerStats',{
				data:info
			});

	}
	request(options,callback);
		
	},

	playerStatTotals: function(req, res) {
		console.log('id',req.body.id);
	var options = {
		url: 'http://fantasy.host/api/nba/gamestats?playerid='+req.body.id,
		headers: {
			'Content-Type':'application/json',
			'Authorization': api_key
		}
	};

	function callback(error,response,body){
		if(!error && response.statusCode == 200) {
			var info = JSON.parse(body);
			// console.log('length',info);
			var gamesPlayed = info.length;
			console.log(gamesPlayed);

			
			var playerAvg = _.each(info,function(object){
				statistics.Assists +=object.Assists/gamesPlayed;
				statistics.Blocks += object.Blocks/gamesPlayed;
				statistics.DefensiveRebounds +=object.DefensiveRebounds/gamesPlayed;
				statistics.FieldGoalsAttempted += object.FieldGoalsAttempted/gamesPlayed;
				statistics.FieldGoalsMade +=object.FieldGoalsMade/gamesPlayed;
				statistics.FreeThrowsAttempted +=object.FreeThrowsAttempted/gamesPlayed;
				statistics.FreeThrowsMade += object.FreeThrowsMade/gamesPlayed;
				statistics.Minutes += object.Minutes/gamesPlayed;
				statistics.OffensiveRebounds += object.OffensiveRebounds/gamesPlayed;
				statistics.PersonalFouls += object.PersonalFouls/gamesPlayed;
				statistics.Steals += object.Steals/gamesPlayed;
				statistics.ThreePointsAttempted += object.ThreePointsAttempted/gamesPlayed;
				statistics.ThreePointsMade += object.ThreePointsMade/gamesPlayed;
				statistics.TotalRebounds += object.TotalRebounds/gamesPlayed;
				statistics.Turnovers += object.Turnovers/gamesPlayed;

			});
				var newStat = Math.round((statistics.TotalRebounds/gamesPlayed)*100)/100;
				console.log('newStat',newStat);
				console.log('statistics',statistics);
				

		}
			res.send(statistics);

	}
	request(options,callback);
		
	},

	playerStatAverage: function(req,res) {
		console.log('playerStatAverage',info);
		console.log('from playerStatAverage',statistics);
		res.send(statistics);
	},

	userData: function(req,res) {
		res.render('userProfile');
	}
	
};

module.exports = playerController;