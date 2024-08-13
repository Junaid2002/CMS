import React from 'react';
import Video from './Video';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import './Home.css'
const Home = () => {
  const navigate = useNavigate();

  const handlePatient = () => {
    console.log("run");
    navigate("/patient");
  };
  const handleDoctor = () => {
    console.log("Navigating to Doctor page");
    navigate("/doctor");
  };
  const handlePrescription = () => {
    console.log("Navigating to Prescription page");
    navigate("/Prescription");
  };

  return (
    <>
      <h1 className='cli'>Clinic</h1>
      <div className="vid">
      <Video />
      </div>
      <div className="buttons">
        <Button onClick={handlePatient}>Patient</Button>
        <Button onClick={handleDoctor}>Doctor</Button>
        <Button onClick={handlePrescription}>Prescription</Button>
        <Button>Admin</Button>
      </div>
    </>
    
  );
};

export default Home;

