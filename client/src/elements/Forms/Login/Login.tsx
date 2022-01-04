import React from 'react';
import './Login.css';

const Login = () => {
  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form>
        <input type="email" required />
        <input type="password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
