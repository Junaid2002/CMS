import React from 'react'
import Patient from './pateint'
import Doctor from './Doctor'
import { Route,Routes } from 'react-router-dom'

const Allroutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/patient" element={<Patient />}></Route>
        <Route path="/doctor" element={<Doctor />}></Route>
    </Routes>
  )
}

export default Allroutes