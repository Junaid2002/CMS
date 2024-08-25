const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  patientID: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient' },
  doctorID: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  diseaseID: { type: mongoose.Schema.Types.ObjectId, ref: 'Disease' },
  dosage: { type: String },
  medicationDetails: { type: String },
  billAmount: { type: Number },
  paymentStatus: { type: String },
  nextVisitDate: { type: Date }
});

module.exports = mongoose.model('Transaction', transactionSchema);
