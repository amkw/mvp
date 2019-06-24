const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const db = require('../db');
const { getSome, add } = require('./controllers/palette');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));


app.get('/colorpalettes', (req, res) => {
  getSome(req,res);
});

app.post('/colorpalettes', (req, res) => {
  add(req.body, res);
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
