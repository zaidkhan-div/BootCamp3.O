import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Common/Navbar'
import Home from './Pages/Home'
import Signup from './Pages/Auth/Signup'
import Login from './Pages/Auth/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/contact" element={<div>Contact Page</div>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App