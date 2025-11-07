import React from 'react'
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom"
import Navbar from './components/Common/Navbar'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'
import Footer from './components/Common/Footer'
import Dashboard from './Pages/Dashbaord/Dashboard'
import { Toaster } from 'sonner'
import OverviewPage from './Pages/Dashbaord/OverviewPage'
import AppointmentList from './Pages/Dashbaord/AppointmentList'
import DoctorList from './Pages/Dashbaord/DoctorList'
import PatientList from './Pages/Dashbaord/PatientList'
import RoomList from './Pages/Dashbaord/RoomList'

const App = () => {
  return (
    <BrowserRouter>
      <Toaster />
      <AppRoutes />
    </BrowserRouter>
  )
}

const AppRoutes = () => {
  const location = useLocation();

  const showNavbarFooter = !location.pathname.includes("/dashboard");

  return (
    <>
      {showNavbarFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<Signup />} />

        {/* Dashboard with nested routes */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<OverviewPage />} />
          <Route path="appointments" element={<AppointmentList />} />
          <Route path="doctors" element={<DoctorList />} />
          <Route path="patients" element={<PatientList />} />
          <Route path="rooms" element={<RoomList />} />
        </Route>

      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  )
}

export default App
