const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

router.post('/', async (req, res) => {
  try {
    const newPrescription = new Prescription(req.body);
    const savedPrescription = await newPrescription.save();
    res.status(201).json(savedPrescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const prescriptions = await Prescription.find().populate('patientId doctorId');
    res.status(200).json(prescriptions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id).populate('patientId doctorId');
    if (!prescription) return res.status(404).json({ error: 'Prescription not found' });
    res.status(200).json(prescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPrescription) return res.status(404).json({ error: 'Prescription not found' });
    res.status(200).json(updatedPrescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
    if (!deletedPrescription) return res.status(404).json({ error: 'Prescription not found' });
    res.status(200).json({ message: 'Prescription deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
