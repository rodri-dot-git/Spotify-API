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

const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/code', (req, res) => {
    console.log(req.body.code);
    res.send("okay")
});

app.listen(port, () => {
    console.log('We are live on ' + port);
});
