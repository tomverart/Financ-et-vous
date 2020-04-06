const express = require('express');
const uuidV4 = require('uuid').v4;
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser(bodyParser.json()));

app.get('/', (req, res) => {
});

app.post('/', (req, res) => {
});

app.put('/', (req, res) => {
});

app.delete('/', (req, res) => {
});

app.listen(3000);
