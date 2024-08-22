import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Patient.css';

const Patient = () => {
  const [patients, setPatients] = useState([]);
  const [formState, setFormState] = useState({
    patientID: '',
    patientName: '',
    dob: '',
    gender: '',
    contactInfo: '',
    address: '',
    emergencyContact: '',
    medicalHistory: '',
    surgeries: '',
  });
  const [editingPatientID, setEditingPatientID] = useState(null);
  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/patients');
      setPatients(response.data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingPatientID) {
        await axios.put(`http://localhost:5000/api/patients/${editingPatientID}`, formState);
        setEditingPatientID(null);
      } else {
        const response = await axios.post('http://localhost:5000/api/patients', formState);
        setPatients([...patients, response.data]);
      }
      setFormState({
        patientID: '',
        patientName: '',
        dob: '',
        gender: '',
        contactInfo: '',
        address: '',
        emergencyContact: '',
        medicalHistory: '',
        surgeries: '',
      });

      fetchPatients(); 
    } catch (error) {
      console.error('Error saving patient:', error);
    }
  };
  const handleEdit = (patientID) => {
    const patientToEdit = patients.find((patient) => patient.patientID === patientID);
    setFormState(patientToEdit);
    setEditingPatientID(patientToEdit._id);
  };
  const handleDelete = async (patientID) => {
    try {
      await axios.delete(`http://localhost:5000/api/patients/${patientID}`);
      fetchPatients(); 
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  const cancelEdit = () => {
    setFormState({
      patientID: '',
      patientName: '',
      dob: '',
      gender: '',
      contactInfo: '',
      address: '',
      emergencyContact: '',
      medicalHistory: '',
      surgeries: '',
    });
    setEditingPatientID(null);
  };

  return (
    <div className="container">
      <h1>Clinic Management System - Patient Master</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientID">Patient ID:</label>
          <input
            id="patientID"
            type="text"
            name="patientID"
            placeholder="Patient ID"
            value={formState.patientID}
            onChange={handleChange}
            required
            disabled={editingPatientID !== null}
          />
        </div>
        <div className="form-group">
          <label htmlFor="patientName">Patient Name:</label>
          <input
            id="patientName"
            type="text"
            name="patientName"
            placeholder="Patient Name"
            value={formState.patientName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dob">Date of Birth:</label>
          <input
            id="dob"
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formState.dob}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formState.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Information:</label>
          <input
            id="contactInfo"
            type="text"
            name="contactInfo"
            placeholder="Contact Information"
            value={formState.contactInfo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Address"
            value={formState.address}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emergencyContact">Emergency Contact:</label>
          <input
            id="emergencyContact"
            type="text"
            name="emergencyContact"
            placeholder="Emergency Contact"
            value={formState.emergencyContact}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalHistory">Medical History:</label>
          <textarea
            id="medicalHistory"
            name="medicalHistory"
            placeholder="Medical History"
            value={formState.medicalHistory}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="surgeries">Surgeries:</label>
          <textarea
            id="surgeries"
            name="surgeries"
            placeholder="Surgeries"
            value={formState.surgeries}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {editingPatientID ? 'Update Patient' : 'Add Patient'}
        </button>
        {editingPatientID && (
          <button type="button" className="cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h2>Patient List</h2>
      {patients.length === 0 ? (
        <p>No patients available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="prc">Patient ID</th>
              <th className="prc">Patient Name</th>
              <th className="prc">Date of Birth</th>
              <th className="prc">Gender</th>
              <th className="prc">Contact Info</th>
              <th className="prc">Address</th>
              <th className="prc">Emergency Contact</th>
              <th className="prc">Medical History</th>
              <th className="prc">Surgeries</th>
              <th className="prc">Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.patientID}</td>
                <td>{patient.patientName}</td>
                <td>{patient.dob}</td>
                <td>{patient.gender}</td>
                <td>{patient.contactInfo}</td>
                <td>{patient.address}</td>
                <td>{patient.emergencyContact}</td>
                <td>{patient.medicalHistory}</td>
                <td>{patient.surgeries}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(patient.patientID)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(patient._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Patient;
