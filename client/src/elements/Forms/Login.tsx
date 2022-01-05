import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';

interface Props {
  getUser(data: User): void;
}

const Login: React.FC<Props> = ({ getUser }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setEmail(e.currentTarget.value);
  };

  const handlePassword = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setPassword(e.currentTarget.value);
  };

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user: object = {
      email,
      password
    }
    try {
      const loggedUser = await axios.post('http://localhost:8000/login', user);
      if (loggedUser.data ==="Sorry, something is wrong with your credentials") {
        // Error message to user!
        console.log('Wrong credentials');
        return;
      }
      if (loggedUser.data ==="Sorry, a user with that email address does not seem to exist") {
        // Error message to user!
        console.log('User does not exist');
        return;
      }
      getUser({
        username: loggedUser.data.username,
        email: loggedUser.data.email,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/join');
  };

  return (
    <div className="login-page">
      <h2 className="login-page__title">Login</h2>
      <form className="login-page__form" onSubmit={handleSubmit}>
        <input className="form__input" type="email" placeholder="Email" required onChange={handleEmail} />
        <input className="form__input" type="password" placeholder="Password" required onChange={handlePassword} />
        <button className="form__button" type="submit">Login</button>
      </form>
      <p className="login-page__sign-up">Not a member? <button className="sign-up__redirect" onClick={handleRedirect}>Sign-up</button></p>
    </div>
  );
};

export default Login;
