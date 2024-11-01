import React, { useEffect, useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Buyer from './components/Buyer';
import Login from './components/Login';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Register from './components/Register';
import Seller from './components/Seller';

const App: React.FC = () => {
  const [auth, setAuth] = useState<any>({
    isAuthenticated: false,
    id:null,
    userType: '',
  });

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    const sellerId = localStorage.getItem('sellerId');
    
    if (userType && sellerId) {
      setAuth({
        isAuthenticated: true,
        id:sellerId || null,
        userType,
      });
    }
  }, []);

  const handleLogin = (user:any) => {
    localStorage.setItem('userType', user?.userType);
    localStorage.setItem('sellerId', user?.sellerId);
    setAuth({
      isAuthenticated: true,
      id:user?.sellerId,
      userType:user?.userType,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('userType');
    localStorage.removeItem('sellerId');
    setAuth({
      isAuthenticated: false,
      id:null,
      userType: '',
    });
  };

  return (
    <Router>
      <Navbar isAuthenticated={auth.isAuthenticated} onLogout={handleLogout}  />
      <Routes>
        <Route path="/login" element={<Login onLogin={handleLogin} auth={auth} />} />
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
