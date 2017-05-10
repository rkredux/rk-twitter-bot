var Twit = require("twit"); //calls on main twit library. This is the entry point to the Twit.js library
var bot = new Twit({   //initializing the bot
	consumer_key:process.env.TEACHINGBOT_CONSUMER_KEY, 
	consumer_secret:process.env.TEACHINGBOT_CONSUMER_SECRET,
	access_token:process.env.TEACHINGBOT_ACCESS_TOKEN, 
	access_token_secret:process.env.TEACHINGBOT_ACCESS_TOKEN_SECRET, 
	timeout_ms: 60*1000
}); 

//get tweets from people I follow from my own timeline. 

function getBotTimeline(){
	bot.get("statuses/home_timeline", {count: 5}, function(err, data, response){
		if (err){
			console.log(err); 
		} else {
			data.forEach(data => {console.log(data.text); 
				console.log(data.user.screen_name); 
				console.log(data.id_str); 
				console.log("\n");}); 
		}
   }); 
} 



