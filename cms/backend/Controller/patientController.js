const Patient = require('../models/patientModel');
exports.getPatients = async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.createPatient = async (req, res) => {
  const { name, age, address, contact } = req.body;

  try {
    const newPatient = new Patient({ name, age, address, contact });
    await newPatient.save();
    res.status(201).json(newPatient);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndDelete(req.params.id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
