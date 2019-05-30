const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://rodridlc:Mauricio10@cluster0-gitot.azure.mongodb.net/spotify?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    const collection = client.db("spotify").collection("users");
    // perform actions on the collection object
    client.close();
});
app.use(express.static('views'))
const port = 8080;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/code', (req, res) => {
    console.log(req.body.code);
    res.send("okay")
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + './views/index.html'));
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
