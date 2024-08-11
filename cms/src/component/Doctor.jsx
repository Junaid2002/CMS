import React from 'react'
import { useState } from 'react';
const Doctor = () => {
    const[doctors, setDoctors] = useState([]);
    const[currentDoctor, setcurrentDoctor] = useState({
        doctorID: '',
        doctorName:'',
        specialization:'',
        contactInformation:'',
        schedule:'',
        surgeries:'',
    });
    const handleChange =(e)=>{
        const {name, value} =e.target;                                      
        setcurrentDoctor((prev)=>
        ({...prev,[name]:value}));
    };
    const handleSubmit =(e) =>{
        e.preventDefault();
        if(currentDoctor.doctorID){
            setDoctors((prev)=>
                prev.map((doc) =>
                    doc.doctorID===currentDoctor.doctorID?currentDoctor:doc
        )
        );
        }else{
           setDoctors((prev) =>[
            ...prev, {...currentDoctor, doctorID:Date.now().toString()},
           ]);
        }
        setcurrentDoctor({
            doctorID: '',
            doctorName:'',
            specialization:'',
            contactInformation:'',
            schedule:'',
            surgeries:'',
        });
    };
    const editDoctor =(doctors) =>{
        setcurrentDoctor(doctors);    
    };
    const deleteDoctor =(doctorID) =>{
        setDoctors((prev)=>
            prev.filter((doctors)=>
                doctors.doctorID!==doctorID));
    };
    const cancelEdit =() =>{
        setcurrentDoctor({
            doctorID: '',
        doctorName:'',
        specialization:'',
        contactInformation:'',
        schedule:'',
        surgeries:'',
        });
    };
  return (
    <div>
        <h1>Doctors Panel</h1>
        <form onSubmit={handleSubmit}>
            <input type="text"
            name="doctorName"
            placeholder="Doctor Name"
            value={currentDoctor.doctorName} onChange={handleChange}
            required />
            <input type="text"
            name="specialization"
            placeholder="Specialization"
            value={currentDoctor.specialization} onChange={handleChange}
            required />
            <input type="text"
            name="contactInformation"
            placeholder="Contact Information"
            value={currentDoctor.contactInformation} onChange={handleChange}
            required />
            <input type="text"
            name="schedule"
            placeholder="Schedule"
            value={currentDoctor.schedule} onChange={handleChange}
            required />
            <input type="text"
            name="surgeries"
            placeholder="Surgeries"
            value={currentDoctor.surgeries} onChange={handleChange}
            required />
            <button type="submit">Save Doctor Information</button>
             <button type="button" onClick={cancelEdit}>Cancel</button>
        </form>
        <h2>Dcotors List</h2>
        <table>
            <thead>
                <tr>
                    <th>Doctor ID</th>
                    <th>Doctor Nname</th>
                    <th>Specialization</th>
                    <th>Contact Information</th>
                    <th>Schedule</th>
                    <th>Surgeries</th>
                </tr>
            </thead>
            <tbody>
                {doctors.map((doctors) =>(
                    <tr key={doctors.doctorID}>
                        <td>{doctors.surgeries}</td>
                        <td>
                            <button onClick={()=>
                                editDoctor(doctors)}>Edit</button>
                                <button onClick={()=>
                                    deleteDoctor(doctors.doctorID)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
};

export default Doctor;
