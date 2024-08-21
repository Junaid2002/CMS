const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String },
  phone: { type: String, required: true },
  email: { type: String, unique: true },
  medicalHistory: [{ type: String }],
});

module.exports = mongoose.model('Patient', PatientSchema);
