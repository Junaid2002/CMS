const express = require('express');
const router = express.Router();
const Doctor = require('../Models/Doctor');

router.post('/', async (req, res) => {
  try {
    const newDoctor = new Doctor(req.body);
    const savedDoctor = await newDoctor.save();
    res.status(201).json(savedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.status(200).json(doctors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findOne({ doctorID: req.params.id });
    if (!doctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDoctor = await Doctor.findOneAndUpdate(
      { doctorID: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedDoctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json(updatedDoctor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedDoctor = await Doctor.findOneAndDelete({ doctorID: req.params.id });
    if (!deletedDoctor) return res.status(404).json({ error: 'Doctor not found' });
    res.status(200).json({ message: 'Doctor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
