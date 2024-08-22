const Admin = require('../models/adminModel');

exports.getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.createAdmin = async (req, res) => {
  const { name, email, role } = req.body;

  try {
    const newAdmin = new Admin({ name, email, role });
    await newAdmin.save();
    res.status(201).json(newAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.getAdminById = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.updateAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json(admin);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: 'Admin not found' });
    }
    res.json({ message: 'Admin deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
