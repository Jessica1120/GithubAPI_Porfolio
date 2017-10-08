var express = require('express');
var path = require('path');
require('dotenv').config();
var app = express();
var port = process.env.PORT || 5000;

app.use(express.static('server/public')); //pulls in node express module for server

// Using request module to make HTTP requests from the server
// https://www.npmjs.com/package/request
var request = require('request'); //from node modules

// API Key & username are environment variables in Heroku
var username = process.env.USER_NAME; //pulls user info from .env file 
var oauthToken = process.env.GIT_TOKEN; //pulls token from .env file 

app.use(express.static('public')); //serves static files

var user_options = { 
  url: 'https://api.github.com/users/' + username, 
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + oauthToken
  } //object that holds information on what url to go to to grab Github user information, header required by Git to use API - says who is requesting and what token is being used
};

// Moved API call into server to protect oAuthToken
app.get('/github/user', function (req, res) {//funtion requesting info on user from API
  request(user_options, function (error, response, body) { // passes error, API response and contents
    if (response && response.statusCode == 200) {  //if the response is all good -->
      res.send(body); //send information to client
    } else {
      res.sendStatus(500); //if error occurs, send error status
    } // if/else statement closed
  }); //request closed
}); //get function closed

var repo_options = {      
  url: 'https://api.github.com/users/' + username + '/repos',
  headers: {
    'User-Agent': 'request',
    'Authorization': 'token ' + oauthToken
  } //object holding information for request to get a Github user's repos, headers required by Github to use API - says who is requesting and what token is being used 
};

// Moved API call into server to protect oAuthToken
app.get('/github/repos', function (req, res) {
  request(repo_options, function (error, response, body) {
    if (response && response.statusCode == 200) {
      res.send(body);
    } else {
      res.sendStatus(500);
    } // end if/else statement
  }); //end request
}); //end get - same function as above get except to get information on repos

app.listen(port, function () {
  console.log('localhost running on port', port);
}); //server spin up
