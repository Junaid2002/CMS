import React, { useState } from 'react';
import './Disease.css';

const Disease = () => {
  const [diseases, setDiseases] = useState([]);
  const [formState, setFormState] = useState({
    DiseaseID: '',
    DiseaseName: '',
    Description: '',
    Symptoms: '',
    DateDiagnosed: '',
    NextVisitDate: ''
  });
  const [editingDiseaseID, setEditingDiseaseID] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { DiseaseID } = formState;

    if (editingDiseaseID) {
      setDiseases(
        diseases.map((disease) =>
          disease.DiseaseID === editingDiseaseID ? { ...formState, DiseaseID: editingDiseaseID } : disease
        )
      );
      setEditingDiseaseID(null);
    } else {
      if (diseases.some((disease) => disease.DiseaseID === DiseaseID)) {
        alert('DiseaseID already exists. Please use a unique DiseaseID.');
        return;
      }
      setDiseases([...diseases, { ...formState, DiseaseID: Date.now() }]);
    }
    setFormState({
      DiseaseID: '',
      DiseaseName: '',
      Description: '',
      Symptoms: '',
      DateDiagnosed: '',
      NextVisitDate: ''
    });
  };

  const handleEdit = (DiseaseID) => {
    const diseaseToEdit = diseases.find((disease) => disease.DiseaseID === DiseaseID);
    setFormState(diseaseToEdit);
    setEditingDiseaseID(DiseaseID);
  };

  const handleDelete = (DiseaseID) => {
    setDiseases(diseases.filter((disease) => disease.DiseaseID !== DiseaseID));
  };

  const cancelEdit = () => {
    setFormState({
      DiseaseID: '',
      DiseaseName: '',
      Description: '',
      Symptoms: '',
      DateDiagnosed: '',
      NextVisitDate: ''
    });
    setEditingDiseaseID(null);
  };

  return (
    <div id="root">
    <div className="container">
      <h1>Disease Master</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="DiseaseID">Disease ID:</label>
          <input
            id="DiseaseID"
            type="text"
            name="DiseaseID"
            placeholder="Disease ID"
            value={formState.DiseaseID}
            onChange={handleChange}
            required
            disabled={editingDiseaseID !== null}
          />
        </div>
        <div className="form-group">
          <label htmlFor="DiseaseName">Disease Name:</label>
          <input
            id="DiseaseName"
            type="text"
            name="DiseaseName"
            placeholder="Disease Name"
            value={formState.DiseaseName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Description">Description:</label>
          <textarea
            id="Description"
            name="Description"
            placeholder="Description"
            value={formState.Description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Symptoms">Symptoms:</label>
          <textarea
            id="Symptoms"
            name="Symptoms"
            placeholder="Symptoms"
            value={formState.Symptoms}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="DateDiagnosed">Date Diagnosed:</label>
          <input
            id="DateDiagnosed"
            type="date"
            name="DateDiagnosed"
            value={formState.DateDiagnosed}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="NextVisitDate">Next Visit Date:</label>
          <input
            id="NextVisitDate"
            type="date"
            name="NextVisitDate"
            value={formState.NextVisitDate}
            onChange={handleChange}
          />
        </div>
        <button type="submit">
          {editingDiseaseID ? 'Update Disease' : 'Add Disease'}
        </button>
        {editingDiseaseID && (
          <button type="button" className="cancel" onClick={cancelEdit}>
            Cancel
          </button>
        )}
      </form>

      <h2>Disease List</h2>
      {diseases.length === 0 ? (
        <p>No diseases available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Disease ID</th>
              <th>Disease Name</th>
              <th>Description</th>
              <th>Symptoms</th>
              <th>Date Diagnosed</th>
              <th>Next Visit Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {diseases.map((disease) => (
              <tr key={disease.DiseaseID}>
                <td>{disease.DiseaseID}</td>
                <td>{disease.DiseaseName}</td>
                <td>{disease.Description}</td>
                <td>{disease.Symptoms}</td>
                <td>{disease.DateDiagnosed}</td>
                <td>{disease.NextVisitDate || 'N/A'}</td>
                <td>
                  <button className="edit" onClick={() => handleEdit(disease.DiseaseID)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(disease.DiseaseID)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
    </div>
  );
};

export default Disease;
