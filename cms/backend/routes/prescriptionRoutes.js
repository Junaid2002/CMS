const express = require('express');
const router = express.Router();
const Prescription = require('../Models/Prescription');

router.get('/', async (req, res) => {
    try {
        const prescriptions = await Prescription.find().populate('PatientID').populate('DoctorID');
        res.status(200).json(prescriptions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.post('/', async (req, res) => {
    try {
        const newPrescription = new Prescription(req.body);
        const savedPrescription = await newPrescription.save();
        res.status(201).json(savedPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const prescription = await Prescription.findById(req.params.id).populate('PatientID').populate('DoctorID');
        if (!prescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json(prescription);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.put('/:id', async (req, res) => {
    try {
        const updatedPrescription = await Prescription.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('PatientID').populate('DoctorID');
        if (!updatedPrescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json(updatedPrescription);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});
router.delete('/:id', async (req, res) => {
    try {
        const deletedPrescription = await Prescription.findByIdAndDelete(req.params.id);
        if (!deletedPrescription) return res.status(404).json({ message: 'Prescription not found' });
        res.status(200).json({ message: 'Prescription deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
