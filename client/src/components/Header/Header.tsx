import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface Props {
  user: User | string;
  setUser(user: User | string): void;
}

const Header: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/');

  const handleLogout = () => {
    setUser('');
    navigate('/login');
  }

  return (
    <header className="header">
      <nav>
        <button className="header__title" onClick={handleRedirect}>Task Tracker</button>
        {typeof user !== 'string' &&
        <button className="header__my-lists" onClick={handleLogout}>Logout</button>
        }
      </nav>
    </header>
  );
};

export default Header;
