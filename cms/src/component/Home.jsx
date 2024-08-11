import React from 'react';
import Video from './Video';
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const nav= useNavigate();

function onhandleDoctor()
{
  log.console("run")
  nav("/patient")
}

const Home = () => {
  return (
    <div>
      <h1>Clinic</h1>
      <Video/>
      <div className="buttons">
        <Button onClick={onhandleDoctor}>Patient</Button>
        <Button>Doctor</Button>
        <Button>Admin</Button>
      </div>
    </div>
  );
};

export default Home;
