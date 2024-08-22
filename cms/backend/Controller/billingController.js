const Billing = require('../models/billingModel');
exports.getBills = async (req, res) => {
  try {
    const bills = await Billing.find();
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.createBill = async (req, res) => {
  const { patientId, amount, date } = req.body;

  try {
    const newBill = new Billing({ patientId, amount, date });
    await newBill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getBillById = async (req, res) => {
  try {
    const bill = await Billing.findById(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updateBill = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json(bill);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteBill = async (req, res) => {
  try {
    const bill = await Billing.findByIdAndDelete(req.params.id);
    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }
    res.json({ message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
