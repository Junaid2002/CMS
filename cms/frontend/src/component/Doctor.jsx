import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Doctor.css';

const Doctor = () => {
  const [doctors, setDoctors] = useState([]);
  const [currentDoctor, setCurrentDoctor] = useState({
    doctorID: '',
    doctorName: '',
    specialization: '',
    contactInformation: '',
    schedule: '',
    surgeries: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/doctors');
      setDoctors(response.data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!currentDoctor.doctorID) {
      alert('Doctor ID is required.');
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`http://localhost:5000/api/doctors/${currentDoctor.doctorID}`, currentDoctor);
        setIsEditing(false);
      } else {
        await axios.post('http://localhost:5000/api/doctors', currentDoctor);
      }
      fetchDoctors();
      setCurrentDoctor({
        doctorID: '',
        doctorName: '',
        specialization: '',
        contactInformation: '',
        schedule: '',
        surgeries: '',
      });
    } catch (error) {
      console.error('Error saving doctor:', error);
    }
  };

  const editDoctor = (doctor) => {
    setCurrentDoctor(doctor);
    setIsEditing(true);
  };

  const deleteDoctor = async (doctorID) => {
    try {
      await axios.delete(`http://localhost:5000/api/doctors/${doctorID}`);
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  const cancelEdit = () => {
    setCurrentDoctor({
      doctorID: '',
      doctorName: '',
      specialization: '',
      contactInformation: '',
      schedule: '',
      surgeries: '',
    });
    setIsEditing(false);
  };

  const handleBackClick = () => {
    navigate('/dashboard');
  };

  return (
    <>
      <button
  onClick={handleBackClick}
  className="back-button"
>
  Back
</button>

      <div className="doctor-container">
        <form className="doctor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="doctorID"
            placeholder="Doctor ID"
            value={currentDoctor.doctorID}
            onChange={handleChange}
            required
            disabled={isEditing}
          />
          <input
            type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={currentDoctor.doctorName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={currentDoctor.specialization}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="contactInformation"
            placeholder="Contact Information"
            value={currentDoctor.contactInformation}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="schedule"
            placeholder="Schedule"
            value={currentDoctor.schedule}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="surgeries"
            placeholder="Surgeries"
            value={currentDoctor.surgeries}
            onChange={handleChange}
            required
          />
          <button type="submit">
            {isEditing ? 'Update Doctor' : 'Add Doctor'}
          </button>
          {isEditing && (
            <button type="button" className="cancel" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </form>

        <h2>Doctors List</h2>
        {doctors.length === 0 ? (
          <p>No doctors available.</p>
        ) : (
          <table className="doctor-table">
            <thead>
              <tr>
                <th>Doctor ID</th>
                <th>Doctor Name</th>
                <th>Specialization</th>
                <th>Contact Information</th>
                <th>Schedule</th>
                <th>Surgeries</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((doctor) => (
                <tr key={doctor.doctorID}>
                  <td>{doctor.doctorID}</td>
                  <td>{doctor.doctorName}</td>
                  <td>{doctor.specialization}</td>
                  <td>{doctor.contactInformation}</td>
                  <td>{doctor.schedule}</td>
                  <td>{doctor.surgeries}</td>
                  <td>
                    <button className="edit" onClick={() => editDoctor(doctor)}>Edit</button>
                    <button className="delete" onClick={() => deleteDoctor(doctor.doctorID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default Doctor;
