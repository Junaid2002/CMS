import React, { useState } from 'react';
import './Transaction.css';

function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isSaved, setIsSaved] = useState(false); 

  const patients = [
    { patientID: 'PA001', patientName: 'John', gender: 'Male', contactNo: '044236578', diseaseName: 'Dengue', dateDiagnosed: '01-08-2024', dosage: '500-1000 mg', medicationDetails: 'Acetaminophen', billAmount: 1200, paymentStatus: 'Paid', nextVisitDate: '02-08-2024' },
    { patientID: 'PA002', patientName: 'Jane', gender: 'Female', contactNo: '044236579', diseaseName: 'Flu', dateDiagnosed: '05-08-2024', dosage: '250 mg', medicationDetails: 'Ibuprofen', billAmount: 800, paymentStatus: 'Pending', nextVisitDate: '10-08-2024' },
  ];

  const doctors = [
    { doctorID: 'DR001', doctorName: 'Rishi', specialization: 'General Practitioner' },
    { doctorID: 'DR002', doctorName: 'Sonia', specialization: 'Pediatrician' },
  ];

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
    setIsSaved(false); 
  };

  const handleSave = () => {
    if (selectedPatient && selectedDoctor) {
      setTransactions([...transactions, { ...selectedPatient, doctorName: selectedDoctor.doctorName }]);
      setIsSaved(true); 
    } else {
      alert('Please select a patient and a doctor.');
    }
  };

  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="transaction-details">
      <h2>Clinic Transaction Details Page:</h2>
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

      <button className="save" onClick={handleSave}>Save</button>
      <button className="clear" onClick={handleClear}>Clear</button>
      
      {isSaved && <div className="success-message">Details Saved successfully</div>}
    </div>
  );
}

export default Transaction;
