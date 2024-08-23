const express = require('express');
const router = express.Router();
const Transaction = require('../Models/Transaction');
const Patient = require('../Models/Patient');
const Doctor = require('../Models/Doctor');
const Disease = require('../Models/Disease');

router.post('/', async (req, res) => {
  try {
    const { patientID, doctorID, diseaseID, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    const patient = await Patient.findById(patientID);
    const doctor = await Doctor.findById(doctorID);
    const disease = await Disease.findById(diseaseID);

    if (!patient || !doctor || !disease) {
      return res.status(404).json({ error: 'Patient, Doctor, or Disease not found' });
    }

    const newTransaction = new Transaction({
      patientID,
      doctorID,
      diseaseID,
      dosage,
      medicationDetails,
      billAmount,
      paymentStatus,
      nextVisitDate
    });

    const savedTransaction = await newTransaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('patientID', 'patientName gender contactInfo diseaseName dateDiagnosed')
      .populate('doctorID', 'doctorName specialization')
      .populate('diseaseID', 'DiseaseName'); 

    res.status(200).json(transactions);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('patientID', 'patientName gender contactInfo diseaseName dateDiagnosed')
      .populate('doctorID', 'doctorName specialization')
      .populate('diseaseID', 'DiseaseName'); 

    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const { patientID, doctorID, diseaseID, dosage, medicationDetails, billAmount, paymentStatus, nextVisitDate } = req.body;

    const patient = await Patient.findById(patientID);
    const doctor = await Doctor.findById(doctorID);
    const disease = await Disease.findById(diseaseID);

    if (!patient || !doctor || !disease) {
      return res.status(404).json({ error: 'Patient, Doctor, or Disease not found' });
    }

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        patientID,
        doctorID,
        diseaseID,
        dosage,
        medicationDetails,
        billAmount,
        paymentStatus,
        nextVisitDate
      },
      { new: true }
    )
      .populate('patientID', 'patientName gender contactInfo diseaseName dateDiagnosed')
      .populate('doctorID', 'doctorName specialization')
      .populate('diseaseID', 'DiseaseName'); 

    if (!updatedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!deletedTransaction) return res.status(404).json({ error: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
