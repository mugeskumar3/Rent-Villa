import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Seller from './components/Seller';
import Buyer from './components/Buyer';
import Login from './components/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/seller" element={<Seller />} />
        <Route path="/buyer" element={<Buyer />} />
        <Route path="/" element={<Login/>} />
      </Routes>
    </Router>
  );
};

export default App;
