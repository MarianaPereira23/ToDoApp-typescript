import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Forms.css';

const Login = () => {
  const navigate = useNavigate();

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/join');
  };

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form">
        <input className="form__input" type="email" placeholder="Email" required />
        <input className="form__input" type="password" placeholder="Password" required />
        <button className="form__button" type="submit">Login</button>
      </form>
      <p className="login-page__sign-up">Not a member? <button className="sign-up__redirect" onClick={handleRedirect}>Sign-up</button></p>
    </div>
  );
};

export default Login;
