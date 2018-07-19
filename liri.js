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
          return console.log("Invalid input. Try again.") ;
        }
}

// individual functions

// "my-tweets"
var twitterFunction = function () {
    console.log('test +++')
}

// "spotify-this"
var spotifyFunction = function () {

}

// "movie-this"
var movieFunction = function () {

}

// "do-what-it-says"
var randomFunction = function () {

}


// call input function
chooseFunction();