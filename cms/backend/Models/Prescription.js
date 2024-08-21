const mongoose = require('mongoose');

const PrescriptionSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  medication: [{ name: String, dosage: String, frequency: String }],
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
