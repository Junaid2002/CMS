const Disease = require('../Models/diseaseModel');
exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) return res.status(404).json({ message: 'Disease not found' });
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.createDisease = async (req, res) => {
  const { DiseaseID, DiseaseName, Description, Symptoms, DateDiagnosed, NextVisitDate } = req.body;
  const disease = new Disease({
    DiseaseID,
    DiseaseName,
    Description,
    Symptoms,
    DateDiagnosed,
    NextVisitDate,
  });

  try {
    const newDisease = await disease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!disease) return res.status(404).json({ message: 'Disease not found' });
    res.json(disease);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) return res.status(404).json({ message: 'Disease not found' });
    res.json({ message: 'Disease deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDiseases = async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.createDisease = async (req, res) => {
  const { name, symptoms, treatment } = req.body;

  try {
    const newDisease = new Disease({ name, symptoms, treatment });
    await newDisease.save();
    res.status(201).json(newDisease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getDiseaseById = async (req, res) => {
  try {
    const disease = await Disease.findById(req.params.id);
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updateDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json(disease);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

exports.deleteDisease = async (req, res) => {
  try {
    const disease = await Disease.findByIdAndDelete(req.params.id);
    if (!disease) {
      return res.status(404).json({ message: 'Disease not found' });
    }
    res.json({ message: 'Disease deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
