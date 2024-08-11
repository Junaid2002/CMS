import React from 'react'
import Patient from './pateint'
import { Route,Routes } from 'react-router-dom'

const Allroutes = () => {
  return (
    <Routes>
        {/* <Route path="/" element={<Home/>}></Route> */}
        <Route path="/patient" element={<Patient />}></Route>
    </Routes>
  )
}

export default Allroutes