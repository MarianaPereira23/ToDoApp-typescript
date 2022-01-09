/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState,  useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../socket';
import './Forms.css';

interface Props {
  user: User | string;
  setUser(user: User | string): void;
}

const Login: React.FC<Props> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.currentTarget.value);

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.currentTarget.value);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const loginUser: LoginUser = {
      email,
      password
    };
    login(loginUser.email, loginUser.password, setUser);
  };

  const handleRedirect = () => navigate('/join');

  useEffect(() => {
    if (typeof user === 'string') return;
    navigate('/');
  }, [user]);

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <input className="form__input" type="email" placeholder="Email" required onChange={handleEmail} />
        <input className="form__input" type="password" placeholder="Password" required onChange={handlePassword} />
        {typeof user === "string" && 
          <p>{user}</p>
        }
        <button className="form__button" type="submit">Login</button>
      </form>
      <p className="login-page__sign-up">
        Not a member? 
        <button className="sign-up__redirect" onClick={handleRedirect}>Sign-up</button>
      </p>
    </div>
  );
};

export default Login;
