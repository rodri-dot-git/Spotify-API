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
    var authorizationCode = req.query.code;

    spotifyApi.authorizationCodeGrant('AQDOi253QEyExGIG4MP8axrePWsK8aJWf7rIbhaI3wP69ewCtXqz31DXgr5eiF-TltBnujKzMvsU2Mg_pKuWw3ooVA6sEe0a3NSNATG6xEckR76vVZuNuAIapcnwDKlilcOq-AA_MLkFUJ38cvndwizKmqeyXC9igBnRpPGXHRRXATISI9AWzpoiUHOOE2O8YrU6AQdxLMvhOXQdzYfYBfGj4_2ukvpi8s-2jrvcXlB_U2h4j31wdupYCDvbaf4x1P3-YWeSNRfJalMjrAvx1LHLOlUz7MNQid_79-uElPjgGXQ-v1bGZ9e4d9Q9XLDqKsuxeWn0QLx_o0ZBVdyVBzrGT7Xa1crdGzmwdtRw1L3jBcZaWEBg').then(
        function (data) {
            console.log('The token expires in ' + data.body['expires_in']);
            console.log('The access token is ' + data.body['access_token']);
            console.log('The refresh token is ' + data.body['refresh_token']);
            set(data.body['access_token']);
            res.sendFile(path.join(__dirname + 'views\login.html'));
        },
        function (err) {
            console.log('Something went wrong!', err);
        }
    );
})

function set(sAuth) {
    auth = sAuth;
}

app.get('/auth', (req, res) => {
    console.log(auth);
    res.send(auth);
})