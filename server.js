const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rodridlc:Mauricio10@cluster0-gitot.azure.mongodb.net/spotify?retryWrites=true&w=majority";
// const client = new MongoClient(uri, {
//     useNewUrlParser: true
// });
// client.connect(err => {
//     const collection = client.db("spotify").collection("users");
//     // perform actions on the collection object
//     client.close();
// });
app.use(express.static('views'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/code', (req, res) => {
    console.log(req.body.code);
    res.send("okay")
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + 'views\index.html'));
});

app.listen(process.env.PORT || 4000, () => {
    console.log('We are live on ' + process.env.PORT);
});

var my_client_id = '010fde68a6df41048c87cc0855a2f5ce';
var redirect_uri = 'h';

app.get('/login', function (req, res) {
    var scopes = 'user-read-private user-read-email';
    res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + my_client_id +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
});