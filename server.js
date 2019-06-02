const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rodridlc:Mauricio10@cluster0-gitot.azure.mongodb.net/spotify?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true
});

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

var my_client_id = '010fde68a6df41048c87cc0855a2f5ce';
var redirect_uri = 'http://warm-lowlands-59615.herokuapp.com/callback';

app.get('/login', async function (req, res) {
    var scopes = 'user-read-private user-read-email user-read-birthdate user-read-recently-played user-top-read streaming';
    await res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
    res.send(auth !== '');
});
var auth = '';
app.get('/callback', (req, res) => {
    auth = req.query.code;
})

app.get('/auth', (req, res) => {
    res.send(auth);
})