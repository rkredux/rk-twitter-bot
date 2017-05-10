var Twit = require("twit"); //calls on main twit library. This is the entry point to the Twit.js library
var bot = new Twit({   //initializing the bot
	consumer_key:process.env.TEACHINGBOT_CONSUMER_KEY, 
	consumer_secret:process.env.TEACHINGBOT_CONSUMER_SECRET,
	access_token:process.env.TEACHINGBOT_ACCESS_TOKEN, 
	access_token_secret:process.env.TEACHINGBOT_ACCESS_TOKEN_SECRET, 
	timeout_ms: 60*1000
}); 

//tweet status
bot.post('statuses/update', { status: `#100daysofcode #8 Building My First Twitter Bot Using TwitJS library & Node.js`}, function(err, data, response) {
  if (err){console.log(err);
  }else{console.log(`${data.text} was tweeted`);}
}); 







