import React from 'react';
import Patient from './Patient';
import Doctor from './Doctor';
import Prescription from './Prescription';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/patient" element={<Patient />} />
      <Route path="/doctor" element={<Doctor />} />
      <Route path="/prescription" element={<Prescription />} />
    </Routes>
  );
}

export default AllRoutes;
