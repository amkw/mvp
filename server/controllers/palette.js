const Palette = require('../../db/models/palette');

exports.getSome = (req, res) => {
  Palette.find({}).limit(10).exec((err,data) => {
    res.send(data)});
}

exports.add = (req, res) => {
  const record = {};
  req.map((color, index) => {
    record[`color${index+1}`] = color;
  });
  Palette.create(record);
  res.end('created');
}
