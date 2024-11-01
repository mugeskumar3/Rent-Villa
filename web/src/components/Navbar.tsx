import React, { useState, useCallback, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../logo.png';
import userProfile from '../user.png';

interface NavbarProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = React.memo(({ isAuthenticated, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleLoginClick = () => {
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleRegisterClick = () => {
    setIsMenuOpen(false);
    navigate('/register');
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
    navigate('/login');
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Rent Vila logo" />
        <span>Rent Vila</span>
      </div>
      <div className="navbar__user-profile" onClick={toggleMenu} aria-haspopup="true" aria-expanded={isMenuOpen} ref={menuRef}>
        <img src={userProfile} alt="User Profile" />
        {isMenuOpen && (
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
});

export default Navbar;
