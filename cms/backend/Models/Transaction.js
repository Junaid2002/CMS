const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  billingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Billing', required: true },
  date: { type: Date, default: Date.now },
  paymentMethod: { type: String, required: true },
  amount: { type: Number, required: true },
});

module.exports = mongoose.model('Transaction', TransactionSchema);
