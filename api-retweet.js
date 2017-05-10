var Twit = require("twit"); //calls on main twit library. This is the entry point to the Twit.js library
var request = require("request"); 
var fs = require("fs"); 


var bot = new Twit({   //initializing the bot
	consumer_key:process.env.TEACHINGBOT_CONSUMER_KEY, 
	consumer_secret:process.env.TEACHINGBOT_CONSUMER_SECRET,
	access_token:process.env.TEACHINGBOT_ACCESS_TOKEN, 
	access_token_secret:process.env.TEACHINGBOT_ACCESS_TOKEN_SECRET, 
	timeout_ms: 60*1000
}); 

function getPhoto(){
	var parameters = { //preparing the parameter object 
		url: "https://api.nasa.gov/planetary/apod", 
		qs: {
			api_key: process.env.NASA_KEY
		}, 
		encoding: "binary"
	}; 
    request.get(parameters, function(err, response, body){
    	body = JSON.parse(body); 
    	saveFile(body, "nasa.jpg"); //passed the two arguments; content + name of the file we want to save it as
    }); 
}


function saveFile (body, fileName){
	var file = fs.createWriteStream(fileName); 
	request(body).pipe(file).on("close", function(err){
	      if(err){
	      	console.log(err); 
	      } else {
	      	console.log("Media Saved"); 
	      	console.log(body); 
	      	var descriptionText = body.title; 
	      	uploadMedia(descriptionText, fileName); 
	      }
	}); 
}

function uploadMedia(descriptionText, fileName){
	var filePath = _dirname + '/' + fileName; 
	bot.postMediaChunked({file_path:filePath}, function(err, data, response){
		if (err){
			console.log(err); 
		} else {
			console.log(data); 
			var params = {
				status: descriptionText, 
				media_ids: data.media_id_string
			}; 
			postStatus(params); 
		}
	}); 
}

function postStatus(params){
	bot.post("status/update", params, function(err, data, response){
		if (err){
			console.log(err); 
		} else{
			console.log("Nasa Media Uploaded Successfully"); 
		}
	}); 
}


getPhoto(); 




