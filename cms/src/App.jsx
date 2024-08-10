import React, { useState } from 'react';
import './App.css';

const App = () => {
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
      setPatients([...patients, { ...formState, patientID: Date.now() }]);
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

  return (
    <div className="App">
      <h1>Clinic Management System - Patient Master</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formState.patientName}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formState.dob}
          onChange={handleChange}
          required
        />
        <select
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
        <input
          type="text"
          name="contactInfo"
          placeholder="Contact Information"
          value={formState.contactInfo}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formState.address}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="emergencyContact"
          placeholder="Emergency Contact"
          value={formState.emergencyContact}
          onChange={handleChange}
          required
        />
        <textarea
          name="medicalHistory"
          placeholder="Medical History"
          value={formState.medicalHistory}
          onChange={handleChange}
        />
        <textarea
          name="surgeries"
          placeholder="Surgeries"
          value={formState.surgeries}
          onChange={handleChange}
        />
        <button type="submit">
          {editingPatientID ? 'Update Patient' : 'Add Patient'}
        </button>
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
              <button onClick={() => handleEdit(patient.patientID)}>Edit</button>
              <button onClick={() => handleDelete(patient.patientID)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;
