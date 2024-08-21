const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  symptoms: [{ type: String }],
  treatment: { type: String },
});

module.exports = mongoose.model('Disease', DiseaseSchema);
