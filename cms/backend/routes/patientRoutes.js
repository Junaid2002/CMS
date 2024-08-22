const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
router.post('/', async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    const savedPatient = await newPatient.save();
    res.status(201).json(savedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const patients = await Patient.find();
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json(updatedPatient);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) return res.status(404).json({ error: 'Patient not found' });
    res.status(200).json({ message: 'Patient deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
