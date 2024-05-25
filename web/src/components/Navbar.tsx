import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import userProfile from '../user.png';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  const handleLogoutClick = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>
        <img src={logo} alt="logo" />
        <span>Rent Vila</span>
      </div>
      <div
        className="navbar__user-profile"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <img src={userProfile} alt="User Profile" />
        {isHovered && (
          <div className="navbar__hover-text">
            {isAuthenticated ? (
              <div className="navbar__hover-option" onClick={handleLogoutClick}>
                Logout
              </div>
            ) : (
              <>
                <div className="navbar__hover-option" onClick={handleLoginClick}>
                  Login
                </div>
                <div className="navbar__hover-option" onClick={handleRegisterClick}>
                  Register
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
