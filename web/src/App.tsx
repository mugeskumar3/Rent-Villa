import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Buyer from './components/Buyer';
import Seller from './components/Seller';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  const [auth, setAuth] = useState({
    isAuthenticated: false,
    userType: '',
  });

  useEffect(() => {
    // Check if user is logged in (e.g., from localStorage)
    const userType = localStorage.getItem('userType');
    if (userType) {
      setAuth({
        isAuthenticated: true,
        userType,
      });
    }
  }, []);

  const handleLogin = (userType: string) => {
    localStorage.setItem('userType', userType);
    setAuth({
      isAuthenticated: true,
      userType,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    setAuth({
      isAuthenticated: false,
      userType: '',
    });
  };

  return (
    <Router>
      <Navbar isAuthenticated={auth.isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/buyer"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isAuthenticated && auth.userType === 'buyer'}
              element={<Buyer />}
              redirectTo="/login"
            />
          }
        />
        <Route
          path="/seller"
          element={
            <ProtectedRoute
              isAuthenticated={auth.isAuthenticated && auth.userType === 'seller'}
              element={<Seller />}
              redirectTo="/login"
            />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
