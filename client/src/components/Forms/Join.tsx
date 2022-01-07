import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Forms.css';

interface Props {
  getUser(data: User): void;
}

const Join: React.FC<Props> = ({ getUser }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUsername(e.currentTarget.value);
  };

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
      username,
      email,
      password
    }
    try {
      const createdUser = await axios.post('http://localhost:8000/join', user);
      if (createdUser.data ==="Sorry, a user with that email address already exists") {
        // Error message to user!
        console.log('User exists already');
        return;
      }
      getUser({
        username: createdUser.data.username,
        email: createdUser.data.email,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  const handleRedirect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="join-page">
      <h2 className="join-page__title">Sign-up</h2>
      <form className="join-page__form" onSubmit={handleSubmit}>
        <input className="form__input" type="text" placeholder="Username" required onChange={handleUsername} />
        <input className="form__input" type="email" placeholder="Email" required onChange={handleEmail} />
        <input className="form__input" type="password" placeholder="Password" required onChange={handlePassword} />
        <button className="form__button" type="submit">Sign-up</button>
      </form>
      <p className="join-page__login">Already a member? <button className="join__redirect" onClick={handleRedirect}>Join</button></p>
    </div>
  );
};

export default Join;
