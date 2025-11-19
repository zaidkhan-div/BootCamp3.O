import React from 'react'
import Login from './pages/Forms/Login'
import Signup from './pages/Forms/Signup'
import { Routes, Route } from "react-router-dom";
import ClientDashboard from './pages/admin/ClientList';
import UserManagement from './pages/admin/UserManagement';
import NewInvoice from './pages/admin/NewInvoice';
import Template from './pages/admin/Templeate';
import Setting from './pages/admin/profile/Setting';
import Profile from './pages/admin/profile/Profile';
import About from './pages/admin/profile/About';
import Notification from './pages/admin/profile/Notification';
import FAQs from './pages/admin/profile/FAQ';
import Layout from './pages/Layout';
import Dashboard from './pages/admin/Dashboard';
import QuotationHistory from './pages/admin/QuotationHistory';

const App = () => {
  return (
    <div>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected/Admin Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/client-list" element={<ClientDashboard />} />
          <Route path="/user-management" element={<UserManagement />} />
          <Route path="/new-invoice" element={<NewInvoice />} />
          <Route path="/template" element={<Template />} />
          <Route path="/quotation-history" element={<QuotationHistory />} />
        </Route>
        <Route path="/notifications" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQs />} />
      </Routes>
    </div>
  );
}

export default App
