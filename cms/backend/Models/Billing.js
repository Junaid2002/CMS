const mongoose = require('mongoose');

const BillingSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Patient', required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  service: { type: String, required: true },
});

module.exports = mongoose.model('Billing', BillingSchema);
