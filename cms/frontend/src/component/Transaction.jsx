import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transaction.css';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDisease, setSelectedDisease] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const patientsResponse = await axios.get('http://localhost:5000/api/patients');
        setPatients(patientsResponse.data);

        const doctorsResponse = await axios.get('http://localhost:5000/api/doctors');
        setDoctors(doctorsResponse.data);

        const diseasesResponse = await axios.get('http://localhost:5000/api/diseases');
        setDiseases(diseasesResponse.data);

        const transactionsResponse = await axios.get('http://localhost:5000/api/transactions');
        setTransactions(transactionsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = async () => {
    if (selectedPatient && selectedDoctor && selectedDisease) {
      const transactionData = {
        patientID: selectedPatient,
        doctorID: selectedDoctor,
        diseaseID: selectedDisease,
        dosage: "Some Dosage",
        medicationDetails: "Some Details",
        billAmount: 500,
        paymentStatus: "Paid",
        nextVisitDate: new Date()
      };

      try {
        if (editTransactionId) {
          await axios.put(`http://localhost:5000/api/transactions/${editTransactionId}`, transactionData);
          setTransactions(transactions.map(tx => tx._id === editTransactionId ? { ...tx, ...transactionData } : tx));
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
      alert('Please select a patient, doctor, and disease.');
    }
  };

  return (
    <div className="transaction-container">
      <h2>Clinic Transaction Details</h2>
      
      {/* Patient Dropdown */}
      <div className="selection">
        <label htmlFor="patient-select">Select Patient ID: </label>
        <select id="patient-select" value={selectedPatient} onChange={(e) => setSelectedPatient(e.target.value)}>
          <option value="">Select a Patient</option>
          {patients.map((patient) => (
            <option key={patient._id} value={patient._id}>{patient.patientID}</option>
          ))}
        </select>
      </div>

      {/* Doctor Dropdown */}
      <div className="selection">
        <label htmlFor="doctor-select">Select Doctor ID: </label>
        <select id="doctor-select" value={selectedDoctor} onChange={(e) => setSelectedDoctor(e.target.value)}>
          <option value="">Select a Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor._id} value={doctor._id}>{doctor.doctorID}</option>
          ))}
        </select>
      </div>

      {/* Disease Dropdown */}
      <div className="selection">
        <label htmlFor="disease-select">Select Disease ID: </label>
        <select id="disease-select" value={selectedDisease} onChange={(e) => setSelectedDisease(e.target.value)}>
          <option value="">Select a Disease</option>
          {diseases.map((disease) => (
            <option key={disease._id} value={disease._id}>{disease.diseaseID}</option>
          ))}
        </select>
      </div>

      <button className="save" onClick={handleSave}>
        {editTransactionId ? 'Update Transaction' : 'Save Transaction'}
      </button>
      <button className="clear" onClick={() => { setSelectedPatient(''); setSelectedDoctor(''); setSelectedDisease(''); setEditTransactionId(null); setIsSaved(false); }}>Clear</button>

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
                <th>Disease ID</th>
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
                  <td>{transaction.patientID.patientID}</td>
                  <td>{transaction.doctorID.doctorID}</td>
                  <td>{transaction.diseaseID.diseaseID}</td>
                  <td>{transaction.dosage}</td>
                  <td>{transaction.medicationDetails}</td>
                  <td>{transaction.billAmount}</td>
                  <td>{transaction.paymentStatus}</td>
                  <td>{new Date(transaction.nextVisitDate).toLocaleDateString()}</td>
                  <td>
                    <button onClick={() => handleEdit(transaction._id)}>Edit</button>
                    <button onClick={() => handleDelete(transaction._id)}>Delete</button>
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
