import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const Join = () => {
  const navigate = useNavigate();

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="join-page">
      <h2 className="join-page__title">Sign-up</h2>
      <form className="join-page__form">
        <input className="form__input" type="text" placeholder="Username" required />
        <input className="form__input" type="email" placeholder="Email" required />
        <input className="form__input" type="password" placeholder="Password" required />
        <button className="form__button" type="submit">Sign-up</button>
      </form>
      <p className="join-page__login">Already a member? <button className="join__redirect" onClick={handleRedirect}>Join</button></p>
    </div>
  );
};

export default Join;
