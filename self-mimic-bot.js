
//This module analyzes your past tweet history and creates tweet that just sounds like you. 
//packages that have been used include Twit, csv-parse, rita. 
const Twit  = require("twit"); 
const fs = require("fs"); 
const csvparse = require("csv-parse"); 
const rita = require("rita"); 
const inputText = "This is just a sample text. I will come backa and edit this later. But for now let use this" 

const bot = new Twit({   //initializing the bot
	consumer_key:process.env.TEACHINGBOT_CONSUMER_KEY, 
	consumer_secret:process.env.TEACHINGBOT_CONSUMER_SECRET,
	access_token:process.env.TEACHINGBOT_ACCESS_TOKEN, 
	access_token_secret:process.env.TEACHINGBOT_ACCESS_TOKEN_SECRET, 
	timeout_ms: 60*1000
}); 

// const markov = new rita.RiMarkov(3); 
// markov.loadText(inputText); 
// const sentences = markov.generateSentences(1); 
// //console.log(sentences);


const filePath = ""; //enter the path to the csv file of your tweets

const tweetData = fs.createReadStream(filePath).pipe(csvparse({delimiter:","})).on("data", function(row){
	console.log(row[5]); 
	inputText = `inputText ${cleanText(row[5])}` 
})
  .on ("end", function(){
  	const markov = new rita.RiMarkov(3); 
  	markvo.loadText(inputText); 
  	const sentence = markov.generateSentences(1); 
  	bot.post("statuses/update", {status: sentence}, function(err, data, response){
  		if (err){
  			console.log(err); 
  		} else {
  			console.log("You just got tweeted"); 
  		}
  	})
  }) 

function hasNoStopWords(token){ //checking for symbols 
	const stopwords = ["@", "http", "RT"]; 
	return stopwords.every(sw => !token.includes(sw);)
}

function cleanText(text){  //cleaning the tweet 
	return rita.RiTa.tokenize(text, " ")
	                .filter(hasNoStopWords)
	                .join(" ")
	                .trim(); 	                
}



