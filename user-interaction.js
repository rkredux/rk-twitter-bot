var Twit = require("twit"); //calls on main twit library. This is the entry point to the Twit.js library
var bot = new Twit({   //initializing the bot
	consumer_key:process.env.TEACHINGBOT_CONSUMER_KEY, 
	consumer_secret:process.env.TEACHINGBOT_CONSUMER_SECRET,
	access_token:process.env.TEACHINGBOT_ACCESS_TOKEN, 
	access_token_secret:process.env.TEACHINGBOT_ACCESS_TOKEN_SECRET, 
	timeout_ms: 60*1000
}); 


export const botScreenName = bot.get("followers/list", {screen_name:"bots_with_han"}, function(err, data, response){
	if (err){
		console.log(err); 
	} else{
		data.users.forEach(user => console.log(user.screen_name)); 
	}
}); 

