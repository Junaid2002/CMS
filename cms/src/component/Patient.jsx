import React, { useState } from 'react';
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingPatientID) {
      setPatients(
        patients.map((patient) =>
          patient.patientID === editingPatientID ? formState : patient
        )
      );
      setEditingPatientID(null);
    } else {
      if (patients.some((patient) => patient.patientID === formState.patientID)) {
        alert('PatientID already exists. Please use a unique PatientID.');
        return;
      }
      setPatients([...patients, formState]);
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
  };

  const handleEdit = (patientID) => {
    const patientToEdit = patients.find((patient) => patient.patientID === patientID);
    setFormState(patientToEdit);
    setEditingPatientID(patientID);
  };

  const handleDelete = (patientID) => {
    setPatients(patients.filter((patient) => patient.patientID !== patientID));
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
    <div className="App">
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
        <ul>
          {patients.map((patient) => (
            <li key={patient.patientID}>
              <strong>{patient.patientName}</strong> - {patient.dob} - {patient.gender} -{' '}
              {patient.contactInfo} - {patient.address} - {patient.emergencyContact}
              <br />
              <em>Medical History:</em> {patient.medicalHistory} <br />
              <em>Surgeries:</em> {patient.surgeries}
              <br />
              <button className="edit" onClick={() => handleEdit(patient.patientID)}>Edit</button>
              <button className="delete" onClick={() => handleDelete(patient.patientID)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Patient;
