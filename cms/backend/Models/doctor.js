const mongoose = require('mongoose');

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, unique: true },
  availableHours: { type: String },
});

module.exports = mongoose.model('Doctor', DoctorSchema);
