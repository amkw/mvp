const mongoose = require('mongoose');

const colorPaletteSchema = new mongoose.Schema({
  name: String,
  color1: String,
  color2: String,
  color3: String,
  color4: String,
  color5: String
});

const Palette = mongoose.model('Palette', colorPaletteSchema);

module.exports = Palette;