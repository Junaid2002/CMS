import React from 'react';
import Video from './Video';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handlePatient = () => {
    console.log("Navigating to Patient page");
    navigate("/patient");
  };

  const handleDoctor = () => {
    console.log("Navigating to Doctor page");
    navigate("/doctor");
  };

  return (
    <div>
      <h1>Clinic</h1>
      <Video />
      <div className="buttons">
        <Button onClick={handlePatient}>Patient</Button>
        <Button onClick={handleDoctor}>Doctor</Button>
        <Button>Admin</Button>
      </div>
    </div>
  );
};

export default Home;
