require("dotenv").config(); 
//variables to require fs, request, bandsintown, and spotify
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');


//variable for switch call
var command = process.argv[2];

//grab spotify key from keys.js
var mySpotifyKeys = require("./keys.js");

//set variable for spotify key from keys.js
var spotifyKeyList = mySpotifyKeys;
//console.log(spotifyKeyList);
var spotify = new Spotify(spotifyKeyList);

switch (command) {

    case "concert-this":
    var concert = '';
    concert = process.argv[3];
    if (process.argv[3] === undefined) {
        var concert = 'ABBA';
    }
    concertThis();
    break;

    case "spotify-this-song":
    var song = '';
    song = process.argv[3];
    if (process.argv[3] === undefined) {
        var song = "Man's Not Hot";
    }
    spotifyLog(song);
    break;

    case "movie-this":
    var restOfArgs = process.argv.splice(3, process.argv.length);
    var movieName = restOfArgs.join(" ");
    console.log(restOfArgs);
    if (movieName === " ") {
        movieName = "Stargate";
   }

       movieLog();
    break;

    case "do-what-it-says":
    addLog();
    break;

    case "commands":
    console.log("\nspotify-this-song\nmovie-this\ndo-what-it-says");
    break;
}

//create function for spotify command 
function spotifyLog(song) {
    spotify.search({ type: 'track', query: song }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        } else {
            var songInfo = data.tracks.items[0]
            var songResult = console.log("\nArtist(s): " + songInfo.artists[0].name)
            console.log("Song Name: " + songInfo.name)
            console.log("Preview Url: " + songInfo.preview_url)
            console.log("Album Name: " + songInfo.album.name + "\n")

            //append data to log.txt file
            fs.appendFileSync('log.txt', `\nArtist(s): ${songInfo.artists[0].name}\n Song Name: ${songInfo.name}\n Preview Url: ${songInfo.preview_url}\n Album Name: ${songInfo.album.name}\n\n`)
        }

    });
}


//create function for bandsintown command 
function concertThis(concert) {

}

//create function for omdb command
function movieLog() {
    //use request package to grab data from omdb api
    request("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&tomatoes=true&apikey=trilogy", function(error, response, body) {

    //if the request was successful
    if (!error && response.statusCode === 200) {

        //log body from the omdb
            console.log("\nTitle of the movie: " + JSON.parse(body).Title);
            console.log("Year the movie came out: " + JSON.parse(body).Year);
            console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
            console.log("Country where the movie was produced: " + JSON.parse(body).Country);
            console.log("Language of the movie: " + JSON.parse(body).Language);
            console.log("Plot of the movie: " + JSON.parse(body).Plot);
            console.log("Actors in the movie: " + JSON.parse(body).Actors);
            console.log("Rotten Tomatoes URL: " + JSON.parse(body).URL);

    }
});
}