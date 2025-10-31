import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import Home from './pages/Dashbaord/Home'
import Income from './pages/Dashbaord/Income'
import Expense from './pages/Dashbaord/Expense'
import UserProvider from './context/UserContext'
import { Toaster } from 'react-hot-toast'

const App = () => {
  return (
    <UserProvider>
      <div>
        <Router>
          <Routes>
            <Route path='/' element={<Root />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUP' element={<SignUp />} />
            <Route path='/dashboard' element={<Home />} />
            <Route path='/income' element={<Income />} />
            <Route path='/expense' element={<Expense />} />
          </Routes>
        </Router>
      </div>

      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: '13px'
          },
        }}
      />
    </UserProvider>
  )
}

export default App

const Root = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="/login" />
  )
}