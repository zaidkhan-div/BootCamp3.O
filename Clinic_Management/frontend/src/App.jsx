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
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './Context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster />
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
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
        <Route element={<ProtectedRoute allowedRoles={['admin', 'patient']} />}>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route index element={<OverviewPage />} />
            <Route path="appointments" element={<AppointmentList />} />
            <Route path="doctors" element={<DoctorList />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="rooms" element={<RoomList />} />
          </Route>
        </Route>

      </Routes>
      {showNavbarFooter && <Footer />}
    </>
  )
}

export default App
