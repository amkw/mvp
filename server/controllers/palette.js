const Palette = require('../../db/models/palette');

exports.getSome = (req, res) => {
  Palette.find({}).limit(10).exec((err,data) => {
    res.send(data)});
}

exports.add = (req, res) => {
  Palette.create(req);
  res.end();
}
