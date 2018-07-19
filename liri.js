// requirements and authentication
require("dotenv").config();
var keys = require("./keys")

var fs = require("fs")
var request = require("request")

// ---Spotify--------
var Spotify = require('node-spotify-api');

var spotify = new Spotify(keys.spotify);

// ---Twitter--------
var Twitter = require('twitter');

var client = new Twitter(keys.twitter);

// get arguments
// function input
var liriFunction = process.argv[2];
// string input
var liriString = process.argv[3];

// create a function
var chooseFunction = function () {
  // create a switch
  switch (liriFunction) {

    case "my-tweets":
      return twitterFunction();

    case "spotify-this-song":
      return spotifyFunction();

    case "movie-this":
      return movieFunction();

    case "do-what-it-says":
      return randomFunction();

    default:
      return console.log("Invalid input. Try again.");
  }
}

// individual functions

// "my-tweets"
var twitterFunction = function () {
  // console.log('test +++')
  // display 5 previous tweets and when they were created
  // parameters
  var params = { q: process.env.SPOTIFY_ID, count: 5 };
  // api get
  client.get('search/tweets', params, function (error, tweets, response) {
    if (error) {
      return console.log('Error occurred: ' + error);
    }
    else {
      // display tweets
      return console.log(tweets.statuses);
    }
  });
}


// "spotify-this"
var spotifyFunction = function () {
  // display song information: artist(s), song name, preview link, album
  spotify.search({ type: 'track', query: liriString }, function (err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    else {
      // return song data
      return console.log(data.tracks.items[0].artists[0]["name"]);
    }
  })
}
// "movie-this"
var movieFunction = function () {
  // display:
  // * Title of the movie.
  // * Year the movie came out.
  // * IMDB Rating of the movie.
  // * Rotten Tomatoes Rating of the movie.
  // * Country where the movie was produced.
  // * Language of the movie.
  // * Plot of the movie.
  // * Actors in the movie.

  // create queryUrl
  var queryUrl = "http://www.omdbapi.com/?t=" + liriString + "&y=&plot=short&tomatoes=true&r=json&apikey=trilogy";
    // use request to request from OMDB
    request(queryUrl, function(error, response, body) {
      // error/status check
      if (!error && response.statusCode === 200) {
        // store parsed object for recall
        var movie = JSON.parse(body)
        // display results
        console.log("Movie Title: " + movie.Title);
        console.log("Release Year: " + movie.Year);
        console.log("IMDB Rating: " + movie.Ratings[0]["Value"]);
        console.log("Rotten Tomatoes: " + movie.Ratings[1]["Value"])
        console.log("Country Produced In: " + movie.Country);
        console.log("Language: " + movie.Language);
        console.log("Plot: " + movie.Plot);
        console.log("Actors: " + movie.Actors);
      }
      else {
        console.log("Error: " + error)
      }
    })
}

// "do-what-it-says"
var randomFunction = function () {
  // use FS to read file
	fs.readFile("random.txt", "utf8", function(err, data) {
		if (err) {
			logOutput.error(err);
		} else {

			// creates array with data.
			var randomArray = data.split(",");

			// assign first item to "liriFunction"
			liriFunction = randomArray[0];
			// assign second item to "liriString"
			liriString = randomArray[1];

			// call input function
			chooseFunction()
		}
	});
}


// call input function
chooseFunction();