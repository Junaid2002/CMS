import React, { useState, useEffect } from 'react';
import './Prescription.css'; 

const PrescriptionForm = ({ onSave, editingPrescription }) => {
    const [prescription, setPrescription] = useState({
        PrescriptionID: '',
        PatientID: '',
        DoctorID: '',
        Date: '',
        MedicationDetails: '',
        Dosage: '',
    });

    useEffect(() => {
        if (editingPrescription) {
            setPrescription(editingPrescription);
        }
    }, [editingPrescription]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPrescription({
            ...prescription,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(prescription);
        setPrescription({
            PrescriptionID: '',
            PatientID: '',
            DoctorID: '',
            Date: '',
            MedicationDetails: '',
            Dosage: '',
        });
    };

    return (
        <form className="prescription-form" onSubmit={handleSubmit}>
            <h2>{editingPrescription ? 'Edit Prescription' : 'Add Prescription'}</h2>
            <div className="form-group">
                <label htmlFor="PrescriptionID">Prescription ID:</label>
                <input
                    type="text"
                    id="PrescriptionID"
                    name="PrescriptionID"
                    value={prescription.PrescriptionID}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="PatientID">Patient ID:</label>
                <input
                    type="text"
                    id="PatientID"
                    name="PatientID"
                    value={prescription.PatientID}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="DoctorID">Doctor ID:</label>
                <input
                    type="text"
                    id="DoctorID"
                    name="DoctorID"
                    value={prescription.DoctorID}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input
                    type="date"
                    id="Date"
                    name="Date"
                    value={prescription.Date}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="MedicationDetails">Medication Details:</label>
                <input
                    type="text"
                    id="MedicationDetails"
                    name="MedicationDetails"
                    value={prescription.MedicationDetails}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label htmlFor="Dosage">Dosage:</label>
                <input
                    type="text"
                    id="Dosage"
                    name="Dosage"
                    value={prescription.Dosage}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="submit-button">
                {editingPrescription ? 'Update' : 'Add'}
            </button>
        </form>
    );
};

const PrescriptionList = ({ prescriptions, onEdit, onDelete }) => {
    return (
        <div className="prescription-list">
            <h2>Prescription List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Prescription ID</th>
                        <th>Patient ID</th>
                        <th>Doctor ID</th>
                        <th>Date</th>
                        <th>Medication Details</th>
                        <th>Dosage</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((prescription) => (
                        <tr key={prescription.PrescriptionID}>
                            <td>{prescription.PrescriptionID}</td>
                            <td>{prescription.PatientID}</td>
                            <td>{prescription.DoctorID}</td>
                            <td>{prescription.Date}</td>
                            <td>{prescription.MedicationDetails}</td>
                            <td>{prescription.Dosage}</td>
                            <td>
                                <button onClick={() => onEdit(prescription)}>Edit</button>
                                <button onClick={() => onDelete(prescription.PrescriptionID)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const App = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [editingPrescription, setEditingPrescription] = useState(null);

    const handleSavePrescription = (prescription) => {
        if (editingPrescription) {
            setPrescriptions(
                prescriptions.map((p) =>
                    p.PrescriptionID === prescription.PrescriptionID ? prescription : p
                )
            );
            setEditingPrescription(null);
        } else {
            setPrescriptions([...prescriptions, prescription]);
        }
    };

    const handleEditPrescription = (prescription) => {
        setEditingPrescription(prescription);
    };

    const handleDeletePrescription = (id) => {
        setPrescriptions(prescriptions.filter((p) => p.PrescriptionID !== id));
    };

    return (
        <div className="app-container">
            <PrescriptionForm
                onSave={handleSavePrescription}
                editingPrescription={editingPrescription}
            />
            <PrescriptionList
                prescriptions={prescriptions}
                onEdit={handleEditPrescription}
                onDelete={handleDeletePrescription}
            />
        </div>
    );
};

export default App;
