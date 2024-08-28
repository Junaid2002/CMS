const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const Patient = require('../Models/patient');
const Doctor = require('../Models/doctor');
const Disease = require('../Models/Disease');

router.post('/', async (req, res) => {
  try {
    const { p_id, d_id, di_id, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    if (!p_id || !d_id || !di_id) {
      return res.status(400).json({ error: 'Patient ID, Doctor ID, and Disease ID are required' });
    }

    const transactionData = new Transaction({
      p_id,
      d_id,
      di_id,
      dosage,
      medicationDetails,
      billAmount,
      paymentStatus,
      nextVisitDate
    });

    await transactionData.save();
    res.status(201).json(transactionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('p_id', 'patientName gender contactInfo diseaseName dateDiagnosed')
      .populate('d_id', 'doctorName specialization')
      .populate('di_id', 'DiseaseName'); 

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('p_id', 'patientName gender contactInfo diseaseName dateDiagnosed')
      .populate('d_id', 'doctorName specialization')
      .populate('di_id', 'DiseaseName'); 

    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { p_id, d_id, di_id, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { p_id, d_id, di_id, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate },
      { new: true, runValidators: true }
    );

    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });

    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });

    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
