var express = require("express");
var google = require("googleapis");


var app = express();

app.use(express.static('static'));

var server = app.listen(3000, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});


var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2("414604176302-bntlem4er0t2dll3iflf76f61lbs0g0r.apps.googleusercontent.com", "0Ap2FVhqYIKuv7NFYhFGn8j5", "http://localhost:3000/oauthcallback");

var scopes = [
  'https://www.googleapis.com/auth/calendar'
];

var url = oauth2Client.generateAuthUrl({
  access_type: 'offline', 
  scope: scopes 
});

app.get("/url", function(req, res) {
  res.send(url);
});


app.get("/tokens", function(req, res) {

    var code = req.query.code;

    console.log(code);

    oauth2Client.getToken(code, function(err, tokens) {
        if (err) {
            console.log(err);
            res.send(err);
            return;
        }

        console.log("works!");

        console.log(err);
        console.log(tokens);
        oauth2Client.setCredentials(tokens);

        res.send(tokens);
    });
});