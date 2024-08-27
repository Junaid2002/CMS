const express = require('express');
const router = express.Router();
const Disease = require('../Models/Disease');

router.post('/', async (req, res) => {
  try {
    const newDisease = new Disease(req.body);
    const savedDisease = await newDisease.save();
    res.status(201).json(savedDisease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.status(200).json(diseases);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const disease = await Disease.findOne({ DiseaseID: req.params.id });
    if (!disease) return res.status(404).json({ error: 'Disease not found' });
    res.status(200).json(disease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const updatedDisease = await Disease.findOneAndUpdate({ DiseaseID: req.params.id }, req.body, { new: true });
    if (!updatedDisease) return res.status(404).json({ error: 'Disease not found' });
    res.status(200).json(updatedDisease);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deletedDisease = await Disease.findOneAndDelete({ DiseaseID: req.params.id });
    if (!deletedDisease) return res.status(404).json({ error: 'Disease not found' });
    res.status(200).json({ message: 'Disease deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
