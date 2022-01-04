import React from 'react';
import './Forms.css';

const Login = () => {
  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form">
        <input className="form__input" type="email" placeholder="Email" required />
        <input className="form__input" type="password" placeholder="Password" required />
        <button className="form__button" type="submit">Login</button>
      </form>
      <p className="login-page__sign-up">Not a member? <span className="sign-up__redirect">Sign-up</span></p>
    </div>
  );
};

export default Login;
