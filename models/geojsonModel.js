const mongoose = require("mongoose");

const geojsonSchema = new mongoose.Schema({
  data: mongoose.Schema.Types.Mixed,
});

module.exports = mongoose.model("GeojsonData", geojsonSchema);
