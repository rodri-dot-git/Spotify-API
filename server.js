const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
var path = require('path');
var auth = '';

app.use(express.static('views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './views/index.html'));
});

app.listen(process.env.PORT || 4000, () => {
    console.log('We are live on ' + process.env.PORT);
});

var redirectUri = 'http://warm-lowlands-59615.herokuapp.com/callback',
    clientId = '010fde68a6df41048c87cc0855a2f5ce';
var spotifyApi = new SpotifyWebApi({
    redirectUri: redirectUri,
    clientId: clientId
});

app.get('/login', function (req, res) {
    var scopes = ['user-read-private', 'user-read-email', 'user-read-birthdate', 'user-read-recently-played', 'user-top-read', 'playlist-read-private'],
        state = 'a-state';
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true);
    console.log(authorizeURL)
    res.redirect(authorizeURL);
});

app.get('/loginC', (req, res) => {
    res.sendFile(path.join(__dirname + './views/login.html'));
}); 
app.get('/callback', (req, res) => {
    console.log(req.query.code);
    set(req.query.code);
    res.redirect('/loginC');
})

function set(sAuth) {
    auth = sAuth;
}

app.get('/auth', (req, res) => {
    console.log('auth');
    console.log(auth);
    res.send(auth);
})