const path = require('path');
const fs = require ('fs');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const multer = require('multer');
const cors = require('cors');
const db = require('../db');
const { getSome, add } = require('./controllers/palette');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/public')));

module.exports.uploadedFile = path.join(__dirname, './uploaded.jpg');


var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'client/public/images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({
  storage
})

app.use(cors());


app.get('/colorpalettes', (req, res) => {
  getSome(req,res);
});

app.post('/colorpalettes', (req, res) => {
  add(req.body, res);
});


app.post('/uploadedimage', upload.single('image'), (req, res) => {
  if (req.file)
    res.json({
      imageUrl: `images/${req.file.filename}`
    });
  else
    res.status("409").json("No Files to Upload.");
});

const PORT = process.env.PORT || 3010;

app.listen(PORT, () => {
  console.log(`Web server running on: http://localhost:${PORT}`);
});
