const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  patientID: { type: String, required: true },
  doctorID: { type: String, required: true },
  dosage: { type: String },
  medicationDetails: { type: String },
  billAmount: { type: Number, required: true },
  paymentStatus: { type: String, required: true },
  nextVisitDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);
