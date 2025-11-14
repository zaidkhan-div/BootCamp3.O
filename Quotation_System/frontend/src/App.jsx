import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashbaord from './Pages/Dashbaord';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashbaord />} />
      </Routes>
    </Router>
  );
};

export default App;
