import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSaved, setIsSaved] = useState(false); 
  const [editTransactionId, setEditTransactionId] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get('http://localhost:5000/api/patients');
        setPatients(patientsResponse.data);

        const doctorsResponse = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(doctorsResponse.data);

        const transactionsResponse = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handlePatientSelect = (e) => {
    const patient = patients.find(p => p.patientID === e.target.value);
    setSelectedPatient(patient);
    setIsSaved(false); 
  };

  const handleDoctorSelect = (e) => {
    const doctor = doctors.find(d => d.doctorID === e.target.value);
    setSelectedDoctor(doctor);
    setIsSaved(false); 
  };

  const handleClear = () => {
    setSelectedPatient(null);
    setSelectedDoctor(null);
    setEditTransactionId(null);
    setIsSaved(false); 
  };

  const handleSave = async () => {
    if (selectedPatient && selectedDoctor) {
      try {
        const transactionData = {
          patientID: selectedPatient.patientID,
          doctorID: selectedDoctor.doctorID,
          dosage: selectedPatient.dosage,
          medicationDetails: selectedPatient.medicationDetails,
          billAmount: selectedPatient.billAmount,
          paymentStatus: selectedPatient.paymentStatus,
          nextVisitDate: selectedPatient.nextVisitDate
        };

        if (editTransactionId) {
          await axios.put(`http://localhost:5000/api/transactions/${editTransactionId}`, transactionData);
          setTransactions(transactions.map(tx =>
            tx._id === editTransactionId ? { ...tx, ...transactionData } : tx
          ));
          setEditTransactionId(null);
        } else {
          const response = await axios.post('http://localhost:5000/api/transactions', transactionData);
          setTransactions([...transactions, response.data]);
        }

        setIsSaved(true);
      } catch (error) {
        console.error('Error saving transaction:', error);
      }
    } else {
      alert('Please select a patient and a doctor.');
    }
  };

  const handleEdit = (id) => {
    const transactionToEdit = transactions.find((tx) => tx._id === id);
    setSelectedPatient(patients.find(p => p.patientID === transactionToEdit.patientID));
    setSelectedDoctor(doctors.find(d => d.doctorID === transactionToEdit.doctorID));
    setEditTransactionId(id);
    setIsSaved(false);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/transactions/${id}`);
      setTransactions(transactions.filter((tx) => tx._id !== id));
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="transaction-container">
      <h2>Clinic Transaction Details</h2>
      <div className="current-date">Current Date: {currentDate}</div>

      <div className="selection">
        <label htmlFor="patient-select">Select Patient ID: </label>
        <select id="patient-select" onChange={handlePatientSelect}>
          <option value="">Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient.patientID} value={patient.patientID}>
              {patient.patientID}
            </option>
          ))}
        </select>
      </div>

      <div className="selection">
        <label htmlFor="doctor-select">Select Doctor ID: </label>
        <select id="doctor-select" onChange={handleDoctorSelect}>
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.doctorID} value={doctor.doctorID}>
              {doctor.doctorID}
            </option>
          ))}
        </select>
      </div>

      {selectedDoctor && (
        <div>
          <h3>Doctor Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedDoctor.doctorID}</td>
                <td>{selectedDoctor.doctorName}</td>
                <td>{selectedDoctor.specialization}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedPatient && (
        <div>
          <h3>Patient Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Patient Name</th>
                <th>Gender</th>
                <th>Contact No</th>
                <th>Disease Name</th>
                <th>Date Diagnosed</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedPatient.patientID}</td>
                <td>{selectedPatient.patientName}</td>
                <td>{selectedPatient.gender}</td>
                <td>{selectedPatient.contactNo}</td>
                <td>{selectedPatient.diseaseName}</td>
                <td>{selectedPatient.dateDiagnosed}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {selectedPatient && (
        <div>
          <h3>Medication & Billing Details:</h3>
          <table>
            <thead>
              <tr>
                <th>Dosage</th>
                <th>Medication Details</th>
                <th>Bill Amount</th>
                <th>Payment Status</th>
                <th>Next Visit Date</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedPatient.dosage}</td>
                <td>{selectedPatient.medicationDetails}</td>
                <td>{selectedPatient.billAmount}</td>
                <td>{selectedPatient.paymentStatus}</td>
                <td>{selectedPatient.nextVisitDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <button className="save" onClick={handleSave}>
        {editTransactionId ? 'Update Transaction' : 'Save Transaction'}
      </button>
      <button className="clear" onClick={handleClear}>Clear</button>

      {isSaved && <div className="success-message">Details Saved successfully</div>}

      <div className="transaction-list">
        <h3>Transaction List</h3>
        {transactions.length === 0 ? (
          <p>No transactions available.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Patient ID</th>
                <th>Doctor ID</th>
                <th>Dosage</th>
                <th>Medication Details</th>
                <th>Bill Amount</th>
                <th>Payment Status</th>
                <th>Next Visit Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td>{transaction.patientID}</td>
                  <td>{transaction.doctorID}</td>
                  <td>{transaction.dosage}</td>
                  <td>{transaction.medicationDetails}</td>
                  <td>{transaction.billAmount}</td>
                  <td>{transaction.paymentStatus}</td>
                  <td>{transaction.nextVisitDate || 'N/A'}</td>
                  <td>
                    <button className="edit" onClick={() => handleEdit(transaction._id)}>Edit</button>
                    <button className="delete" onClick={() => handleDelete(transaction._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Transaction;
