const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  doctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  diseaseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease', required: true },
  dosage: { type: String, required: true },
  medicationDetails: { type: String, required: true },
  billAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  nextVisitDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);
