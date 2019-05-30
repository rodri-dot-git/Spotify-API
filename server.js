const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = 80;

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log('We are live on ' + port);
});

app.post('/code', (req, res) => {
    console.log(req.body.code);
    res.send("okay")
});