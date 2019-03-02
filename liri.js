require("dotenv").config(); 
//variables to require fs, request, bandsintown, and spotify
var fs = require("fs");
var request = require('request');
var Spotify = require('node-spotify-api');
var moment = require('moment');
var colors = require('colors');

//command line arg variables
var arg = process.argv.slice(3).join("+");
var textFile = "log.txt";


//variable for switch call
var cmd = process.argv[2];

//grab spotify key from keys.js
var mySpotifyKeys = require("./keys.js");

//set variable for spotify key from keys.js
var spotifyKeyList = mySpotifyKeys;
var spotify = new Spotify(spotifyKeyList);

switch (cmd) {

    case 'concert-this':
      concertThis(arg);
      break;

      case 'spotify-this-song':
      spotifyThis(arg);
      break;

      case 'movie-this':
      movieThis(arg);
      break;

    case 'do-what-it-says':
      doWhatItSays();
      break;

    case "commands":
    console.log("\nspotify-this-song\nmovie-this\ndo-what-it-says");
    break;
}

//spotify-this function

function spotifyThis(arg) {
    var song = arg;
    if (!song) {
      song = "Mans+not+hot";
    }
    spotify.search({
      type: 'track',
      query: song
    }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      data = data.tracks.items[0];
      // console.log(data);
     display("Artist(s) Name: ".green, data.artists[0].name);
     display("Track Name: ".blue, data.name);
     display("Preview URL: ".blue, data.preview_url);
     display("Album: ".blue, data.album.name);

     contentAdded();
    });
  }

//create function for bandsintown command 

function concertThis(arg) {
    var artist = arg;
    if (!artist){
        artist = "Drake";
    }
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp&tracker_count=5";
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
      for (var event in body) {
          display("Venue: ".blue, body[event].venue.name);
          display("Location: ".blue, body[event].venue.city + ", " + body[event].venue.region + ", " + body[event].venue.country);
      var m = moment(body[event].datetime).format('MM/DD/YYYY, h:mm a').split(", ");
          display("Date: ".red, m[0]);
          display("Time: ".red, m[1]);

          contentAdded();
        }
      }
    });
  }

//create function for omdb command

function movieThis(arg) {
    var movieName = arg;
    if (!movieName) {
      movieName = "Stargate";
    }
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body = JSON.parse(body);
        display("Title: ".green, body.Title);
        display("Year: ".blue, body.Year);
        display("IMDB Rating: ".blue, body.imdbRating);
      if (body.Ratings[2]) {
        display("Rotten Tomatoes Score: ".blue, body.Ratings[2].Value);
        }
        display("Country: ".blue, body.Country);
        display("Language: ".blue, body.Language);
        display("Plot: ".blue, body.Plot);
        display("Actors: ".blue, body.Actors);

        contentAdded();
     }
  });
}
  

// do-what-it-says function

function doWhatItSays() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.replace(/(\r\n|\n|\r)/gm, "").split(",");
      
    for (var i = 0; i < dataArr.length; i += 2) {
        var cmd = dataArr[i];
        var arg = dataArr[i + 1].replace(/['"]+/g, '').split(' ').join("+");

      commandSwitch(cmd, arg);
    }
  });
}

// console.log / appendFile function

function display(description, data) {
    console.log(description + data);
    appendFile(description + data + "\n");
  }

function contentAdded() {
  console.log("");
  console.log("Content Added to Log!".bold);
  console.log("-----------------------------------\n");
  appendFile("-----------------------------------\n");
}

//appendFile function

function appendFile(arg) {
  fs.appendFile(textFile, arg, function(err) {
      if (err) {
      console.log(err);
    } else {}
  });
}
