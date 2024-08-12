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
  const handleBilling = () => {
    console.log("Navigating to Billing page");
    navigate("/Billing");
  };
  const handleDisease = () => {
    console.log("Navigating to Disease page");
    navigate("/Disease");
  };

  return (
    <div>
      <h1>Clinic</h1>
      <Video />
      <div className="buttons">
        <Button onClick={handlePatient}>Patient</Button>
        <Button onClick={handleDoctor}>Doctor</Button>
        <Button onClick={handlePrescription}>Prescription</Button>
        <Button onClick={handleBilling}>Billing</Button>
        <Button onClick={handleDisease}>Disease</Button>
        <Button>Admin</Button>
      </div>
    </div>
  );
};

export default Home;

