import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface Props {
  user: User;
}

const Header: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <header className="header">
      <h1 className="header__title">Task Tracker</h1>
      {user.username !== '' &&
      <button className="header__my-lists" onClick={handleClick}>My lists</button>
      }
    </header>
  );
};

export default Header;
