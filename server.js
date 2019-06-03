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

    spotifyApi.authorizationCodeGrant(authorizationCode).then(
            function (data) {
                console.log('The token expires in ' + data.body['expires_in']);
                console.log('The access token is ' + data.body['access_token']);
                console.log('The refresh token is ' + data.body['refresh_token']);

                // Set the access token on the API object to use it in later calls
                spotifyApi.setAccessToken(data.body['access_token']);
                spotifyApi.setRefreshToken(data.body['refresh_token']);
            },
            function (err) {
                console.log('Something went wrong!', err);
            };
    res.sendFile(path.join(__dirname + 'views\login.html'));
})

function set (sAuth){
    auth = sAuth;
}

app.get('/auth', (req, res) => {
    console.log(auth);
    res.send(auth);
})
