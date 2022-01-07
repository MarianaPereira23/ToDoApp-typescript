import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface Props {
  user: User;
  getUser(data: User): void;
}

const Header: React.FC<Props> = ({ user, getUser }) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  const handleLogout = () => {
    getUser({username: '', email: ''});
    navigate('/login');
  }

  return (
    <header className="header">
      <button className="header__title" onClick={handleRedirect}>Task Tracker</button>
      {user.username !== '' &&
      <button className="header__my-lists" onClick={handleLogout}>Logout</button>
      }
    </header>
  );
};

export default Header;
