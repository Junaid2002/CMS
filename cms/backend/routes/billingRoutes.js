const express = require('express');
const router = express.Router();
const Billing = require('../Models/Billing');
router.post('/', async (req, res) => {
  try {
    const newBilling = new Billing(req.body);
    const savedBilling = await newBilling.save();
    res.status(201).json(savedBilling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const billings = await Billing.find().populate('patientId');
    res.status(200).json(billings);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.get('/:id', async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id).populate('patientId');
    if (!billing) return res.status(404).json({ error: 'Billing record not found' });
    res.status(200).json(billing);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const updatedBilling = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBilling) return res.status(404).json({ error: 'Billing record not found' });
    res.status(200).json(updatedBilling);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
router.delete('/:id', async (req, res) => {
  try {
    const deletedBilling = await Billing.findByIdAndDelete(req.params.id);
    if (!deletedBilling) return res.status(404).json({ error: 'Billing record not found' });
    res.status(200).json({ message: 'Billing record deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
