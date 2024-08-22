const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');

router.post('/', async (req, res) => {
  try {
    const { patientID, doctorID, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    const patient = await Patient.findOne({ patientID });
    const doctor = await Doctor.findOne({ doctorID });

    if (!patient || !doctor) {
      return res.status(404).json({ error: 'Patient or Doctor not found' });
    }

    const newTransaction = new Transaction({
      patientID,
      doctorID,
      dosage,
      medicationDetails,
      billAmount,
      paymentStatus,
      nextVisitDate
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('patientID', 'patientName gender contactNo diseaseName dateDiagnosed') 
      .populate('doctorID', 'doctorName specialization'); 

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('patientID', 'patientName gender contactNo diseaseName dateDiagnosed') 
      .populate('doctorID', 'doctorName specialization'); 

    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { patientID, doctorID, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    const patient = await Patient.findOne({ patientID });
    const doctor = await Doctor.findOne({ doctorID });

    if (!patient || !doctor) {
      return res.status(404).json({ error: 'Patient or Doctor not found' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        patientID,
        doctorID,
        dosage,
        medicationDetails,
        billAmount,
        paymentStatus,
        nextVisitDate
      },
      { new: true }
    )
      .populate('patientID', 'patientName gender contactNo diseaseName dateDiagnosed') 
      .populate('doctorID', 'doctorName specialization'); 

    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
