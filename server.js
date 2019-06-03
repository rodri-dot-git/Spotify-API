const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');

var auth = '';

app.use(express.static('views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'views\index.html'));
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
    var scopes = ['user-read-private', 'user-read-email', 'user-read-birthdate', 'user-read-recently-played', 'user-top-read', 'streaming'],
        state = 'a-state';
    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state, true);
    console.log(authorizeURL)
    res.send(authorizeURL);
});

app.get('/callback', (req, res) => {
    var authorizationCode = request.query.code;

    spotifyApi.authorizationCodeGrant(authorizationCode)
        .then(function (data) {
            //set(data.body['access_token']);
            console.log(data);
        }, function (err) {
            console.log('Something went wrong when retrieving the access token!', err.message);
        });
    res.sendFile(path.join(__dirname + 'views\login.html'));
})

function set (sAuth){
    auth = sAuth;
}

app.get('/auth', (req, res) => {
    console.log(auth);
    res.send(auth);
})
