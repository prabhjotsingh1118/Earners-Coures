import React from 'react'
import Navbar from './component/Navbar'
import { AuthDashboard } from "./component/Dashboard";
import { Route, Routes } from 'react-router'
import { AuthProfile } from './component/Profile'

function App() {
  let user = {
    name: "prabhjot",
    role: "billionaire"
  }
  return (
    <div>
      {/* <Dashboard/> */}
      <Navbar />
      {/* <AuthDashboard /> */}

      <Routes>
        <Route path='/' element={<p>Home</p>} />
        <Route path='/dashboard' element={<AuthDashboard />} />
        <Route path='/profile' element={<AuthProfile {...user} />} />
      </Routes>
    </div>
  )
}

export default App
