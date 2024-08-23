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
    const billings = await Billing.find();
    res.json(billings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', async (req, res) => {
  const billing = new Billing({
    BillID: req.body.BillID,
    PatientID: req.body.PatientID,
    Date: req.body.Date,
    BillAmount: req.body.BillAmount,
    PaymentStatus: req.body.PaymentStatus,
    AreaOfService: req.body.AreaOfService
  });

  try {
    const newBilling = await billing.save();
    res.status(201).json(newBilling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});
router.put('/:id', async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Billing not found' });

    billing.BillID = req.body.BillID;
    billing.PatientID = req.body.PatientID;
    billing.Date = req.body.Date;
    billing.BillAmount = req.body.BillAmount;
    billing.PaymentStatus = req.body.PaymentStatus;
    billing.AreaOfService = req.body.AreaOfService;

    const updatedBilling = await billing.save();
    res.json(updatedBilling);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const billing = await Billing.findById(req.params.id);
    if (!billing) return res.status(404).json({ message: 'Billing not found' });

    await billing.remove();
    res.json({ message: 'Billing deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
