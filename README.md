# LIRI_Bot
Language Interpretation and Recognition Interface: Command line Node.js app that searches for songs, performances, and films using the Spotify, BandsInTown, and OMDB APIs.

 LIRI is a command line node app that takes in parameters and returns data based on one of four commands:

- concert-this

- spotify-this-song

- movie-this

- do-what-it-says

### Getting Started

Clone down repo.
Run command 'npm install' in Terminal or GitBash
Run command 'node liri.js' or one of the commands below.
What Each Command Does:

**node liri.js spotify-this-song songName**
Shows the following information about the song in terminal/bash window:

Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from
Or if no song is passed through, it will default to *"Man's Not Hot" by Big Shaq

**node liri.js concert-this bandName**
Shows the following information about the band/artist's upcoming live performances in terminal/bash window: 

- Venue:
- Location: City, State, Country
- Date: MM/DD/YYY
- Time: HH:MM am/pm

**node liri.js movie-this movieName**
Shows the following information in terminal/bash:

- Title of the movie.
- Year the movie came out.
- IMDB Rating of the movie.
- Country where the movie was produced.
- Language of the movie.
- Plot of the movie.
- Actors in the movie.
 -Rotten Tomatoes Rating.
- Rotten Tomatoes URL.
- Or if no movie is passed through, it will default to "Stargate"

**node liri.js do-what-it-says**
Takes the text from random.txt and runs the song through spotify-this-song command

#### Tech used:
- Node.js
- Spotify NPM Package - https://www.npmjs.com/package/spotify
- Request NPM Package - https://www.npmjs.com/package/request

###### Prerequisites
- Node.js - Download the latest version of Node https://nodejs.org/en/
Built With:
- VS Code
Author:
- Marvin Tryon Jr - Node JS 

**Video Demonstration**
https://drive.google.com/open?id=1kJ3w-dd7DTEgKs1s7dWME02ktpX3lOdb

![alt text](https://github.com/marvtron/LIRI_Bot/blob/master/Screen%20Shot%202019-03-02%20at%2014.14.11.png)

**My Website**
https://marvtron.github.io/My-Portfolio/
