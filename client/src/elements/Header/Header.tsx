import React from 'react';
import './Header.css';

interface Props {
  user: User;
}

const Header: React.FC<Props> = ({ user }) => {
  return (
    <header className="header">
      <h1 className="header__title">Task Tracker</h1>
      {user.username !== '' &&
      <button className="header__my-lists">My lists</button>
      }
    </header>
  );
};

export default Header;
